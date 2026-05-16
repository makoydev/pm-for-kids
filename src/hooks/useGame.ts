import { useCallback, useEffect, useMemo, useState } from "react";

import { scenario } from "../data/scenario";
import {
  advanceTask,
  advanceWeek,
  assignTask,
  chooseEvent,
  createInitialState,
  finishProject,
  mitigateRisk,
  normalizeState,
} from "../game/rules";
import type { Difficulty, GameState, UIPrefs } from "../game/types";

const STORAGE_KEY = "pm-for-kids-state-v2";
const LEGACY_STORAGE_KEY = "pm-for-kids-state-v1";
const UI_PREFS_KEY = "pm-for-kids-ui-v2";

function loadGameState() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return createInitialState(scenario);

  try {
    const parsed = JSON.parse(saved) as { scenarioId?: string; state?: Partial<GameState> };
    if (!parsed || parsed.scenarioId !== scenario.id || !parsed.state) {
      return createInitialState(scenario);
    }
    return normalizeState(scenario, parsed.state);
  } catch {
    return createInitialState(scenario);
  }
}

function loadUIPrefs(): UIPrefs {
  try {
    const raw = window.localStorage.getItem(UI_PREFS_KEY);
    if (!raw) return { activityCollapsed: true, difficulty: "easy" };
    const parsed = JSON.parse(raw) as Partial<UIPrefs>;
    return {
      activityCollapsed: parsed.activityCollapsed !== false,
      difficulty: parsed.difficulty === "challenge" ? "challenge" : "easy",
    };
  } catch {
    return { activityCollapsed: true, difficulty: "easy" };
  }
}

export function useGame() {
  const [state, setState] = useState(loadGameState);
  const [uiPrefs, setUIPrefs] = useState(loadUIPrefs);
  const [scoreOpen, setScoreOpen] = useState(() => loadGameState().finished);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ scenarioId: scenario.id, state }));
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  }, [state]);

  useEffect(() => {
    window.localStorage.setItem(UI_PREFS_KEY, JSON.stringify(uiPrefs));
  }, [uiPrefs]);

  useEffect(() => {
    function handleKeyboardShortcuts(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (["INPUT", "SELECT", "TEXTAREA"].includes((event.target as HTMLElement).tagName)) return;

      if (state.activeEvent) {
        const choiceIndex = Number(event.key) - 1;
        const eventCard = scenario.events.find((item) => item.id === state.activeEvent);
        if (eventCard?.choices[choiceIndex]) {
          event.preventDefault();
          setState((current) => chooseEvent(scenario, current, choiceIndex));
        }
        return;
      }

      if (glossaryOpen || scoreOpen) return;

      const key = event.key.toLowerCase();
      if (key === "g") {
        event.preventDefault();
        setGlossaryOpen(true);
      } else if (key === "a") {
        event.preventDefault();
        toggleActivity();
      } else if (key === "n" && !state.finished) {
        event.preventDefault();
        setState((current) => advanceWeek(scenario, current));
      }
    }

    document.addEventListener("keydown", handleKeyboardShortcuts);
    return () => document.removeEventListener("keydown", handleKeyboardShortcuts);
  }, [glossaryOpen, scoreOpen, state.activeEvent, state.finished]);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setUIPrefs((current) => ({ ...current, difficulty }));
  }, []);

  const toggleActivity = useCallback(() => {
    setUIPrefs((current) => ({ ...current, activityCollapsed: !current.activityCollapsed }));
  }, []);

  const actions = useMemo(
    () => ({
      assignTask: (taskId: string, assignee: string) => {
        setState((current) => assignTask(current, taskId, assignee));
      },
      advanceTask: (taskId: string) => {
        setState((current) => advanceTask(scenario, current, taskId));
      },
      mitigateRisk: (riskId: string) => {
        setState((current) => mitigateRisk(scenario, current, riskId));
      },
      chooseEvent: (choiceIndex: number) => {
        setState((current) => chooseEvent(scenario, current, choiceIndex));
      },
      advanceWeek: () => {
        setState((current) => advanceWeek(scenario, current));
      },
      finishProject: () => {
        setState((current) => finishProject(current));
        setScoreOpen(true);
      },
      resetGame: () => {
        setState(createInitialState(scenario));
        setScoreOpen(false);
      },
      clearLog: () => {
        setState((current) => ({ ...current, log: [] }));
      },
    }),
    [],
  );

  useEffect(() => {
    if (state.finished) setScoreOpen(true);
  }, [state.finished]);

  return {
    scenario,
    state,
    uiPrefs,
    scoreOpen,
    glossaryOpen,
    actions,
    setScoreOpen,
    setGlossaryOpen,
    setDifficulty,
    toggleActivity,
    setActivityCollapsed: (activityCollapsed: boolean) =>
      setUIPrefs((current) => ({ ...current, activityCollapsed })),
  };
}

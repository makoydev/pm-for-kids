import { useCallback, useEffect, useMemo, useState } from "react";

import { scenarios } from "../data/scenario";
import {
  advanceTask,
  advanceWeek,
  assignTask,
  chooseEvent,
  createReplayEventPicker,
  createInitialState,
  finishProject,
  mitigateRisk,
  normalizeState,
} from "../game/rules";
import type { Difficulty, EventFrequency, EventOrder, GameState, UIPrefs } from "../game/types";

const STORAGE_KEY = "pm-for-kids-state-v2";
const LEGACY_STORAGE_KEY = "pm-for-kids-state-v1";
const UI_PREFS_KEY = "pm-for-kids-ui-v2";

const defaultScenario = scenarios[0];

function scenarioById(scenarioId: string | undefined) {
  return scenarios.find((candidate) => candidate.id === scenarioId) ?? defaultScenario;
}

function loadSavedGame() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return {
      scenario: defaultScenario,
      state: createInitialState(defaultScenario),
    };
  }

  try {
    const parsed = JSON.parse(saved) as { scenarioId?: string; state?: Partial<GameState> };
    const scenario = scenarioById(parsed.scenarioId);
    return {
      scenario,
      state: parsed.state ? normalizeState(scenario, parsed.state) : createInitialState(scenario),
    };
  } catch {
    return {
      scenario: defaultScenario,
      state: createInitialState(defaultScenario),
    };
  }
}

function loadUIPrefs(): UIPrefs {
  try {
    const raw = window.localStorage.getItem(UI_PREFS_KEY);
    if (!raw) return defaultUIPrefs();
    const parsed = JSON.parse(raw) as Partial<UIPrefs>;
    return {
      activityCollapsed: parsed.activityCollapsed !== false,
      difficulty: parsed.difficulty === "challenge" ? "challenge" : "easy",
      eventOrder: parsed.eventOrder === "story" ? "story" : "random",
      eventFrequency: parseEventFrequency(parsed.eventFrequency),
    };
  } catch {
    return defaultUIPrefs();
  }
}

function defaultUIPrefs(): UIPrefs {
  return {
    activityCollapsed: true,
    difficulty: "easy",
    eventOrder: "random",
    eventFrequency: "normal",
  };
}

function parseEventFrequency(value: unknown): EventFrequency {
  return value === "light" || value === "risk-heavy" ? value : "normal";
}

export function useGame() {
  const [activeScenarioId, setActiveScenarioId] = useState(() => loadSavedGame().scenario.id);
  const scenario = scenarioById(activeScenarioId);
  const [state, setState] = useState(() => loadSavedGame().state);
  const [uiPrefs, setUIPrefs] = useState(loadUIPrefs);
  const [scoreOpen, setScoreOpen] = useState(() => loadSavedGame().state.finished);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  const toggleActivity = useCallback(() => {
    setUIPrefs((current) => ({ ...current, activityCollapsed: !current.activityCollapsed }));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ scenarioId: scenario.id, state }));
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  }, [scenario.id, state]);

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
        setState((current) =>
          advanceWeek(scenario, current, createReplayEventPicker(scenario, uiPrefs)),
        );
      }
    }

    document.addEventListener("keydown", handleKeyboardShortcuts);
    return () => document.removeEventListener("keydown", handleKeyboardShortcuts);
  }, [glossaryOpen, scenario, scoreOpen, state.activeEvent, state.finished, toggleActivity, uiPrefs]);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setUIPrefs((current) => ({ ...current, difficulty }));
  }, []);

  const setEventOrder = useCallback((eventOrder: EventOrder) => {
    setUIPrefs((current) => ({ ...current, eventOrder }));
  }, []);

  const setEventFrequency = useCallback((eventFrequency: EventFrequency) => {
    setUIPrefs((current) => ({ ...current, eventFrequency }));
  }, []);

  const selectScenario = useCallback((scenarioId: string) => {
    const nextScenario = scenarioById(scenarioId);
    setActiveScenarioId(nextScenario.id);
    setState(createInitialState(nextScenario));
    setScoreOpen(false);
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
        setState((current) =>
          advanceWeek(scenario, current, createReplayEventPicker(scenario, uiPrefs)),
        );
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
    [scenario, uiPrefs],
  );

  useEffect(() => {
    if (state.finished) setScoreOpen(true);
  }, [state.finished]);

  return {
    scenario,
    scenarios,
    state,
    uiPrefs,
    scoreOpen,
    glossaryOpen,
    actions,
    setScoreOpen,
    setGlossaryOpen,
    setDifficulty,
    setEventOrder,
    setEventFrequency,
    selectScenario,
    toggleActivity,
    setActivityCollapsed: (activityCollapsed: boolean) =>
      setUIPrefs((current) => ({ ...current, activityCollapsed })),
  };
}

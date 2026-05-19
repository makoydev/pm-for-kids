import type { Difficulty, EventFrequency, EventOrder, Scenario } from "../game/types";
import { Icon } from "./Icon";

interface HeaderProps {
  difficulty: Difficulty;
  activityCollapsed: boolean;
  finished: boolean;
  scenarios: Scenario[];
  activeScenarioId: string;
  eventOrder: EventOrder;
  eventFrequency: EventFrequency;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onScenarioChange: (scenarioId: string) => void;
  onEventOrderChange: (eventOrder: EventOrder) => void;
  onEventFrequencyChange: (eventFrequency: EventFrequency) => void;
  onToggleActivity: () => void;
  onOpenGlossary: () => void;
  onReset: () => void;
  onFinish: () => void;
}

export function Header({
  difficulty,
  activityCollapsed,
  finished,
  scenarios,
  activeScenarioId,
  eventOrder,
  eventFrequency,
  onDifficultyChange,
  onScenarioChange,
  onEventOrderChange,
  onEventFrequencyChange,
  onToggleActivity,
  onOpenGlossary,
  onReset,
  onFinish,
}: HeaderProps) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <Icon name="briefcase" />
        </div>
        <div>
          <p className="eyebrow">
            <Icon name="sparkles" /> Project simulator
          </p>
          <h1>PM for Kids</h1>
        </div>
      </div>
      <div className="top-actions">
        <button
          className="button secondary"
          type="button"
          aria-haspopup="dialog"
          aria-keyshortcuts="G"
          title="Shortcut: G"
          onClick={onOpenGlossary}
        >
          <Icon name="bookOpen" />
          Glossary
        </button>
        <label className="scenario-picker">
          <span>Project</span>
          <select value={activeScenarioId} onChange={(event) => onScenarioChange(event.target.value)}>
            {scenarios.map((scenario) => (
              <option value={scenario.id} key={scenario.id}>
                {scenario.title}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="replay-settings">
          <legend>Replay</legend>
          <label>
            <span>Events</span>
            <select value={eventOrder} onChange={(event) => onEventOrderChange(event.target.value as EventOrder)}>
              <option value="random">Random</option>
              <option value="story">Story order</option>
            </select>
          </label>
          <label>
            <span>Frequency</span>
            <select
              value={eventFrequency}
              onChange={(event) => onEventFrequencyChange(event.target.value as EventFrequency)}
            >
              <option value="light">Light</option>
              <option value="normal">Normal</option>
              <option value="risk-heavy">Risk-heavy</option>
            </select>
          </label>
        </fieldset>
        <div className="difficulty-toggle" aria-label="Difficulty">
          {(["easy", "challenge"] as const).map((mode) => (
            <button
              key={mode}
              className={`mode-button ${difficulty === mode ? "active" : ""}`}
              type="button"
              aria-pressed={difficulty === mode}
              onClick={() => onDifficultyChange(mode)}
            >
              {mode === "easy" ? "Easy" : "Challenge"}
            </button>
          ))}
        </div>
        <button
          className="button secondary"
          type="button"
          aria-pressed={!activityCollapsed}
          aria-controls="activityPanel"
          aria-keyshortcuts="A"
          title="Shortcut: A"
          onClick={onToggleActivity}
        >
          <Icon name="scroll" />
          <span className="toggle-label">{activityCollapsed ? "Show Activity" : "Hide Activity"}</span>
        </button>
        <button className="button secondary" type="button" onClick={onReset}>
          <Icon name="refresh" />
          Reset
        </button>
        <button className="button primary" type="button" disabled={finished} onClick={onFinish}>
          <Icon name="flag" />
          Finish Project
        </button>
      </div>
    </header>
  );
}

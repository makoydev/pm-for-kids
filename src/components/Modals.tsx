import { glossaryTerms } from "../data/glossary";
import { riskByEvent, scoreProject } from "../game/rules";
import type { Difficulty, GameState, Scenario } from "../game/types";
import { EffectChips } from "./Board";
import { Icon } from "./Icon";

interface EventModalProps {
  scenario: Scenario;
  state: GameState;
  difficulty: Difficulty;
  onChoose: (choiceIndex: number) => void;
}

export function EventModal({ scenario, state, difficulty, onChoose }: EventModalProps) {
  const event = scenario.events.find((item) => item.id === state.activeEvent);
  if (!event) return null;

  const risk = riskByEvent(scenario, event.id);
  const prepared = Boolean(risk && state.mitigatedRisks.includes(risk.id));

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="event-title">
        <div className="dialog-header">
          <p className="eyebrow">
            <Icon name="lightbulb" size="sm" />
            Scenario card - Week {state.week}
          </p>
          <h2 id="event-title">{event.title}</h2>
        </div>
        <p className="dialog-copy">
          {prepared && risk ? `${event.body} Your risk register has a response ready: ${risk.response.label}.` : event.body}
        </p>
        <div className="choice-list">
          {event.choices.map((choice, index) => (
            <button
              className="choice-card"
              type="button"
              aria-keyshortcuts={`${index + 1}`}
              key={choice.label}
              onClick={() => onChoose(index)}
            >
              <span className="choice-badge">{index + 1}</span>
              <span>
                <strong>{choice.label}</strong>
                <span>{choice.outcome}</span>
                <EffectChips effects={choice.effects} difficulty={difficulty} />
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export function GlossaryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="dialog wide" role="dialog" aria-modal="true" aria-labelledby="glossary-title">
        <div className="dialog-header">
          <p className="eyebrow">
            <Icon name="bookOpen" size="sm" />
            PM words
          </p>
          <h2 id="glossary-title">Glossary</h2>
        </div>
        <div className="glossary-grid">
          {glossaryTerms.map((item) => (
            <article className="glossary-card" key={item.term}>
              <strong>{item.term}</strong>
              <p>{item.definition}</p>
              <span>{item.example}</span>
            </article>
          ))}
        </div>
        <div className="dialog-actions">
          <button className="button primary" type="button" onClick={onClose}>
            Done
          </button>
        </div>
      </section>
    </div>
  );
}

interface ScoreModalProps {
  open: boolean;
  scenario: Scenario;
  state: GameState;
  onPlayAgain: () => void;
  onClose: () => void;
}

export function ScoreModal({ open, scenario, state, onPlayAgain, onClose }: ScoreModalProps) {
  if (!open) return null;

  const score = scoreProject(scenario, state);

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="dialog wide" role="dialog" aria-modal="true" aria-labelledby="score-title">
        <div className="dialog-header">
          <p className="eyebrow">
            <Icon name="trophy" size="sm" />
            Retrospective
          </p>
          <h2 id="score-title">Project scorecard</h2>
        </div>
        <div className="score-content">
          <p className="muted">{score.outcome}</p>
          <div className="score-grid">
            {score.scoreCards.map((card) => (
              <div className={`score-card ${card.variant ?? ""}`} key={card.label}>
                <span className="score-icon">
                  <Icon name={card.icon} />
                </span>
                <div>
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                </div>
              </div>
            ))}
          </div>
          <h3>Retrospective</h3>
          <ol className="retro-list">
            {score.retrospective.map((item, index) => (
              <li key={item}>
                <Icon name={index === 0 ? "trophy" : index === 1 ? "shieldAlert" : "lightbulb"} size="sm" />
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <section className="mentor-summary" aria-labelledby="mentor-summary-title">
            <h3 id="mentor-summary-title">Parent and teacher notes</h3>
            <p>{score.mentorSummary.headline}</p>
            <ul>
              {score.mentorSummary.talkingPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <strong>{score.mentorSummary.challenge}</strong>
          </section>
        </div>
        <div className="dialog-actions">
          <button className="button primary" type="button" onClick={onPlayAgain}>
            <Icon name="refresh" />
            Play Again
          </button>
          <button className="button secondary" type="button" onClick={onClose}>
            Keep Reviewing
          </button>
        </div>
      </section>
    </div>
  );
}

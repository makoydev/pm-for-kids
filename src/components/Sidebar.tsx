import { glossaryTerms } from "../data/glossary";
import {
  completedTasks,
  getStarterChecklistItems,
  hasMitigatedRisk,
  moneyRemaining,
} from "../game/rules";
import type { GameState, Scenario } from "../game/types";
import { Icon } from "./Icon";

interface SidebarProps {
  scenario: Scenario;
  state: GameState;
  onAdvanceWeek: () => void;
  onMitigateRisk: (riskId: string) => void;
}

export function Sidebar({ scenario, state, onAdvanceWeek, onMitigateRisk }: SidebarProps) {
  return (
    <section className="sidebar" aria-label="Project controls">
      <ProjectSummary scenario={scenario} state={state} onAdvanceWeek={onAdvanceWeek} />
      <HealthPanel scenario={scenario} state={state} />
      <StarterChecklist state={state} />
      <TeamPanel scenario={scenario} state={state} />
      <RiskPanel scenario={scenario} state={state} onMitigateRisk={onMitigateRisk} />
    </section>
  );
}

function ProjectSummary({
  scenario,
  state,
  onAdvanceWeek,
}: Pick<SidebarProps, "scenario" | "state" | "onAdvanceWeek">) {
  return (
    <div className="project-summary">
      <p className="eyebrow">
        <Icon name="target" /> Current project
      </p>
      <h2>{scenario.title}</h2>
      <p className="muted">{scenario.goal}</p>
      <div className="week-panel">
        <div className="week-row">
          <div>
            <span className="label">
              <Icon name="calendar" /> Week
            </span>
            <strong>
              {state.week} of {scenario.deadlineWeeks}
            </strong>
          </div>
          <button
            className="button primary"
            type="button"
            aria-keyshortcuts="N"
            title="Shortcut: N"
            disabled={state.finished || Boolean(state.activeEvent)}
            onClick={onAdvanceWeek}
          >
            <Icon name="arrowRight" />
            Advance Week
          </button>
        </div>
        <div className="week-progress" aria-hidden="true">
          {Array.from({ length: scenario.deadlineWeeks }, (_, index) => {
            const week = index + 1;
            const className = ["week-dot", week < state.week && "done", week === state.week && "current"]
              .filter(Boolean)
              .join(" ");
            return <span key={week} className={className} title={`Week ${week}`} />;
          })}
        </div>
      </div>
    </div>
  );
}

function HealthPanel({ scenario, state }: Pick<SidebarProps, "scenario" | "state">) {
  const scope = Math.round((completedTasks(state).length / state.tasks.length) * 100);
  const budgetValue = Math.max(0, Math.round((moneyRemaining(scenario, state) / scenario.budget) * 100));
  const meters = [
    {
      label: "Scope done",
      value: scope,
      detail: `${completedTasks(state).length}/${state.tasks.length} tasks`,
      className: "scope",
      icon: "target",
    },
    {
      label: "Budget left",
      value: budgetValue,
      detail: `${moneyRemaining(scenario, state)} coins`,
      className: "budget",
      icon: "coins",
    },
    { label: "Quality", value: state.quality, detail: `${state.quality}/100`, className: "quality", icon: "sparkles" },
    { label: "Team morale", value: state.morale, detail: `${state.morale}/100`, className: "morale", icon: "smile" },
    {
      label: "Stakeholder trust",
      value: state.trust,
      detail: `${state.trust}/100`,
      className: "trust",
      icon: "handshake",
    },
  ];

  return (
    <div className="panel">
      <div className="panel-heading">
        <h2>
          <span className="heading-icon success">
            <Icon name="heartPulse" />
          </span>
          Project Health
        </h2>
        <span className="save-status">Saved</span>
      </div>
      <div className="meters">
        {meters.map((meter) => (
          <div className="meter" key={meter.label}>
            <div className="meter-row">
              <span className="meter-label">
                <span className={`meter-icon ${meter.className}`}>
                  <Icon name={meter.icon} size="sm" />
                </span>
                {meter.label}
              </span>
              <span className="meter-value">{meter.detail}</span>
            </div>
            <div className="track" aria-hidden="true">
              <div className={`fill ${meter.className}`} style={{ width: `${meter.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StarterChecklist({ state }: Pick<SidebarProps, "state">) {
  const items = getStarterChecklistItems(state);
  const doneCount = items.filter((item) => item.done).length;
  return (
    <div className="panel starter-panel">
      <div className="panel-heading">
        <h2>
          <span className="heading-icon info">
            <Icon name="target" />
          </span>
          Starter Checklist
        </h2>
        <span className="small-note">
          {doneCount}/{items.length} done
        </span>
      </div>
      <div className="starter-checklist">
        {items.map((item) => (
          <div className={`checklist-item ${item.done ? "done" : ""}`} key={item.title}>
            <span className="checklist-status">
              <Icon name={item.done ? "checkCircle" : item.icon} size="sm" />
            </span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPanel({ scenario, state }: Pick<SidebarProps, "scenario" | "state">) {
  const roleIcons = { Builder: "hammer", Designer: "palette", Researcher: "microscope" };
  return (
    <div className="panel">
      <div className="panel-heading">
        <h2>
          <span className="heading-icon info">
            <Icon name="users" />
          </span>
          Team
        </h2>
        <span className="small-note">Capacity resets each week</span>
      </div>
      <div className="team-list">
        {scenario.team.map((member) => {
          const remaining = state.teamCapacity[member.id];
          const pct = Math.max(0, Math.round((remaining / member.capacity) * 100));
          const roleClass = `role-${member.role.toLowerCase()}`;
          return (
            <article className={`team-card ${roleClass}`} key={member.id}>
              <div className={`team-avatar ${roleClass}`}>{member.name.charAt(0)}</div>
              <div className="team-body">
                <strong>{member.name}</strong>
                <span className={`team-role ${roleClass}`}>
                  <span className="role-icon">
                    <Icon name={roleIcons[member.role]} size="sm" />
                  </span>
                  {member.role}
                </span>
                <div className="capacity-meter">
                  <div className="capacity-track" aria-hidden="true">
                    <div className="capacity-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="capacity-label">
                    {remaining}/{member.capacity}
                  </span>
                </div>
                <div className="tag-row">
                  {member.skills.map((skill) => (
                    <span className="tag skill" key={`${member.id}-${skill}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function RiskPanel({
  scenario,
  state,
  onMitigateRisk,
}: Pick<SidebarProps, "scenario" | "state" | "onMitigateRisk">) {
  return (
    <div className="panel">
      <div className="panel-heading">
        <h2>
          <span className="heading-icon warning">
            <Icon name="shieldAlert" />
          </span>
          Risk Register
        </h2>
        <span className="small-note">Plan before trouble hits</span>
      </div>
      <div className="risk-list">
        {scenario.risks.map((risk) => {
          const mitigated = hasMitigatedRisk(state, risk.id);
          const canAfford = moneyRemaining(scenario, state) >= risk.cost;
          return (
            <article className={`risk-card ${mitigated ? "mitigated" : ""}`} key={risk.id}>
              <div className="risk-head">
                <span className="risk-icon">
                  <Icon name={mitigated ? "checkCircle" : "shieldAlert"} />
                </span>
                <div>
                  <strong>{risk.title}</strong>
                  <p>{risk.description}</p>
                  {!mitigated && (
                    <div className="risk-benefits">
                      {Object.entries(risk.response.effects)
                        .filter(([, value]) => value && value > 0)
                        .map(([key, value]) => (
                          <span className="tag benefit" key={`${risk.id}-${key}`}>
                            +{value} {key}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="risk-footer">
                <span className="tag coin" title="Cost to plan ahead">
                  <Icon name="coins" size="sm" />
                  {risk.cost}
                </span>
                <button
                  className="button secondary"
                  type="button"
                  disabled={mitigated || !canAfford || state.finished}
                  onClick={() => onMitigateRisk(risk.id)}
                >
                  {mitigated ? (
                    <>
                      <Icon name="checkCircle" size="sm" />
                      Planned
                    </>
                  ) : (
                    "Mitigate"
                  )}
                </button>
              </div>
              {!mitigated && !canAfford && (
                <p className="warning">
                  <Icon name="alertTriangle" size="sm" />
                  Not enough budget.
                </p>
              )}
            </article>
          );
        })}
      </div>
      <span className="sr-only">{glossaryTerms.length} glossary terms available from the top bar.</span>
    </div>
  );
}

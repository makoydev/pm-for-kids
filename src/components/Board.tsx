import {
  columns,
  completedTasks,
  dependenciesDone,
  dependencyNames,
  formatEffect,
  getCoachAdvice,
  memberById,
  moneyRemaining,
} from "../game/rules";
import type { Difficulty, Effects, GameState, ProjectTask, Scenario } from "../game/types";
import { Icon } from "./Icon";

interface BoardProps {
  scenario: Scenario;
  state: GameState;
  difficulty: Difficulty;
  onAssignTask: (taskId: string, assignee: string) => void;
  onAdvanceTask: (taskId: string) => void;
}

export function Board({ scenario, state, difficulty, onAssignTask, onAdvanceTask }: BoardProps) {
  const blockedCount = state.tasks.filter((task) => task.status === "todo" && !dependenciesDone(state, task)).length;
  const advice = getCoachAdvice(scenario, state);

  return (
    <section className="board-section" aria-label="Task board">
      <div className="board-header">
        <div>
          <p className="eyebrow">
            <Icon name="kanban" /> Science fair delivery board
          </p>
          <h2>Plan the work, react to surprises, and deliver well.</h2>
        </div>
        <div className="board-stats">
          <span className="stat-done">
            <Icon name="checkCircle" size="sm" />
            {completedTasks(state).length} done
          </span>
          <span className="stat-blocked">
            <Icon name="alertTriangle" size="sm" />
            {blockedCount} blocked
          </span>
        </div>
      </div>
      <div className={`coach-panel ${advice.tone}`} aria-live="polite">
        <div className="coach-main">
          <span className="coach-icon">
            <Icon name={advice.icon} />
          </span>
          <div>
            <p className="eyebrow">Coach</p>
            <strong>{advice.title}</strong>
            <p>{advice.body}</p>
          </div>
        </div>
        <div className="coach-signals" aria-label="Project signals">
          <span>
            {completedTasks(state).length}/{state.tasks.length} tasks done
          </span>
          <span>{moneyRemaining(scenario, state)} coins left</span>
          <span>
            Week {state.week}/{scenario.deadlineWeeks}
          </span>
        </div>
      </div>
      <div className="board">
        {columns.map((column) => {
          const tasks = state.tasks.filter((task) => task.status === column.id);
          return (
            <section className="column" data-status={column.id} aria-label={column.title} key={column.id}>
              <div className="column-header">
                <span className="column-title">
                  <span className="status-icon">
                    <Icon name={column.id === "todo" ? "circle" : column.id === "doing" ? "play" : column.id === "review" ? "eye" : "checkCircle"} size="sm" />
                  </span>
                  {column.title}
                </span>
                <span className="column-count">{tasks.length}</span>
              </div>
              <div className="task-list">
                {tasks.length ? (
                  tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      scenario={scenario}
                      state={state}
                      task={task}
                      difficulty={difficulty}
                      onAssignTask={onAssignTask}
                      onAdvanceTask={onAdvanceTask}
                    />
                  ))
                ) : (
                  <p className="muted">No tasks here.</p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

function TaskCard({
  scenario,
  state,
  task,
  onAssignTask,
  onAdvanceTask,
}: BoardProps & { task: ProjectTask }) {
  const blockedNames = dependencyNames(state, task);
  const isBlocked = task.status === "todo" && blockedNames.length > 0;
  const assignee = task.assignee ? memberById(scenario, task.assignee) : null;
  const cardClasses = ["task-card", `status-${task.status}`, isBlocked ? "blocked" : ""].filter(Boolean);

  return (
    <article className={cardClasses.join(" ")}>
      <div>
        <h3>{task.title}</h3>
        <div className="task-meta">
          <span className="tag effort" title={`Effort: ${task.effort} capacity used`}>
            <Icon name="zap" size="sm" />
            {task.effort} effort
          </span>
          <span className="tag coin" title={`Cost: ${task.cost} coins from the budget`}>
            <Icon name="coins" size="sm" />
            {task.cost}
          </span>
          <span className="tag skill" title={`Skill needed: ${task.skill}. Teammates with this skill do better work.`}>
            <Icon name="wrench" size="sm" />
            {task.skill}
          </span>
        </div>
      </div>
      {isBlocked && (
        <p className="warning">
          <Icon name="alertTriangle" size="sm" />
          Blocked by: {blockedNames.join(", ")}
        </p>
      )}
      {task.status !== "done" ? (
        <TaskActions
          scenario={scenario}
          state={state}
          task={task}
          onAssignTask={onAssignTask}
          onAdvanceTask={onAdvanceTask}
        />
      ) : (
        <span className="muted done-note">
          <Icon name="checkCircle" size="sm" /> Completed in week {task.completedWeek} by {assignee ? assignee.name : "the team"}.
        </span>
      )}
    </article>
  );
}

function TaskActions({
  scenario,
  state,
  task,
  onAssignTask,
  onAdvanceTask,
}: Pick<BoardProps, "scenario" | "state" | "onAssignTask" | "onAdvanceTask"> & { task: ProjectTask }) {
  const isTodo = task.status === "todo";
  const assignee = task.assignee ? memberById(scenario, task.assignee) : null;
  const blockedByDeps = isTodo && !dependenciesDone(state, task);
  const overBudget = isTodo && moneyRemaining(scenario, state) < task.cost;
  const noAssignee = isTodo && !task.assignee;
  const disableStart = isTodo && (blockedByDeps || overBudget || noAssignee);
  const actionLabel = task.status === "todo" ? "Start Task" : task.status === "doing" ? "Move to Review" : "Complete Task";
  const actionIcon = task.status === "todo" ? "play" : task.status === "doing" ? "eye" : "checkCircle";

  return (
    <div className="task-actions">
      {isTodo ? (
        <select
          aria-label={`Assign ${task.title}`}
          value={task.assignee}
          onChange={(event) => onAssignTask(task.id, event.target.value)}
        >
          <option value="">Assign teammate...</option>
          {scenario.team.map((member) => {
            const fit = member.skills.includes(task.skill) ? "fit" : "stretch";
            const cap = state.teamCapacity[member.id];
            const overload = cap < task.effort ? " - over capacity" : "";
            return (
              <option value={member.id} key={member.id}>
                {member.name} - {cap}/{member.capacity} left - {fit}
                {overload}
              </option>
            );
          })}
        </select>
      ) : (
        <span className="muted">Assigned to {assignee ? assignee.name : "the team"}</span>
      )}
      {isTodo && noAssignee && !blockedByDeps && !overBudget && (
        <p className="hint muted">
          <Icon name="users" size="sm" />
          Pick a teammate to start this task.
        </p>
      )}
      {isTodo && assignee && <AssignmentHint task={task} assignee={assignee} state={state} />}
      {overBudget && (
        <p className="warning">
          <Icon name="alertTriangle" size="sm" />
          Not enough budget for this task.
        </p>
      )}
      <button
        className={`button ${task.status === "review" ? "success" : "primary"}`}
        type="button"
        disabled={disableStart || state.finished}
        onClick={() => onAdvanceTask(task.id)}
      >
        <Icon name={actionIcon} size="sm" />
        {actionLabel}
      </button>
    </div>
  );
}

function AssignmentHint({
  task,
  assignee,
  state,
}: {
  task: ProjectTask;
  assignee: NonNullable<ReturnType<typeof memberById>>;
  state: GameState;
}) {
  const cap = state.teamCapacity[assignee.id];
  const overloaded = cap < task.effort;
  const skillMatch = assignee.skills.includes(task.skill);
  return (
    <div className="hint-stack">
      <span className={`hint ${overloaded ? "warn" : "ok"}`}>
        <Icon name={overloaded ? "alertTriangle" : "checkCircle"} size="sm" />
        {overloaded
          ? `Needs ${task.effort}, only ${cap} left - will overload ${assignee.name}`
          : `Uses ${task.effort} of ${cap} capacity`}
      </span>
      <span className={`hint ${skillMatch ? "ok" : "warn"}`}>
        <Icon name={skillMatch ? "sparkles" : "alertTriangle"} size="sm" />
        {skillMatch
          ? `${assignee.name} is strong at ${task.skill}`
          : `${task.skill} is not ${assignee.name}'s strength`}
      </span>
    </div>
  );
}

export function EffectChips({
  effects,
  difficulty,
}: {
  effects: Effects;
  difficulty: Difficulty;
}) {
  return (
    <span className="effect-row">
      {Object.entries(effects)
        .filter(([, value]) => value !== undefined && value !== 0)
        .map(([key, value]) => {
          const effect = formatEffect(key as keyof Effects, value ?? 0, difficulty);
          return (
            <span className={`effect-chip ${effect.tone}`} key={key}>
              {effect.label}
            </span>
          );
        })}
    </span>
  );
}

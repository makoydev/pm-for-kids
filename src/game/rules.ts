import type {
  Difficulty,
  Effects,
  GameState,
  ProjectTask,
  Scenario,
  ScenarioEvent,
  ScoreSummary,
  TeamMember,
} from "./types";

export const columns = [
  { id: "todo", title: "Todo" },
  { id: "doing", title: "Doing" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
] as const;

export function createInitialState(scenario: Scenario): GameState {
  const teamCapacity = Object.fromEntries(
    scenario.team.map((member) => [member.id, member.capacity]),
  );

  return {
    week: 1,
    spent: 0,
    quality: 45,
    morale: 80,
    trust: 65,
    teamCapacity,
    tasks: scenario.tasks.map((task) => ({
      ...task,
      status: "todo",
      assignee: "",
      startedWeek: null,
      completedWeek: null,
    })),
    mitigatedRisks: [],
    usedEvents: [],
    activeEvent: null,
    log: ["Project started. Review the backlog, assign work, and keep the team healthy."],
    lessons: [],
    finished: false,
  };
}

export function normalizeState(scenario: Scenario, savedState: Partial<GameState>): GameState {
  const initialState = createInitialState(scenario);
  return {
    ...initialState,
    ...savedState,
    teamCapacity: {
      ...initialState.teamCapacity,
      ...(savedState.teamCapacity ?? {}),
    },
    tasks: mergeTasks(initialState.tasks, savedState.tasks),
    mitigatedRisks: savedState.mitigatedRisks ?? [],
    usedEvents: savedState.usedEvents ?? [],
    log: savedState.log ?? initialState.log,
    lessons: savedState.lessons ?? [],
  };
}

function mergeTasks(initialTasks: ProjectTask[], savedTasks?: ProjectTask[]) {
  if (!savedTasks) return initialTasks;
  return initialTasks.map((initialTask) => ({
    ...initialTask,
    ...savedTasks.find((task) => task.id === initialTask.id),
  }));
}

export function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

export function moneyRemaining(scenario: Scenario, state: GameState) {
  return scenario.budget - state.spent;
}

export function completedTasks(state: GameState) {
  return state.tasks.filter((task) => task.status === "done");
}

export function getTask(state: GameState, taskId: string) {
  return state.tasks.find((task) => task.id === taskId);
}

export function dependenciesDone(state: GameState, task: ProjectTask) {
  return task.dependsOn.every((dependencyId) => getTask(state, dependencyId)?.status === "done");
}

export function dependencyNames(state: GameState, task: ProjectTask) {
  return task.dependsOn
    .filter((dependencyId) => getTask(state, dependencyId)?.status !== "done")
    .map((dependencyId) => getTask(state, dependencyId)?.title)
    .filter(Boolean);
}

export function memberById(scenario: Scenario, memberId: string) {
  return scenario.team.find((member) => member.id === memberId);
}

export function riskByEvent(scenario: Scenario, eventId: string) {
  return scenario.risks.find((risk) => risk.eventId === eventId);
}

export function hasMitigatedRisk(state: GameState, riskId: string) {
  return state.mitigatedRisks.includes(riskId);
}

export function applyEffects(state: GameState, effects: Effects): GameState {
  return {
    ...state,
    spent: Math.max(0, state.spent + (effects.spent ?? 0)),
    quality: clamp(state.quality + (effects.quality ?? 0)),
    morale: clamp(state.morale + (effects.morale ?? 0)),
    trust: clamp(state.trust + (effects.trust ?? 0)),
  };
}

export function addLog(state: GameState, message: string): GameState {
  return {
    ...state,
    log: [message, ...state.log].slice(0, 18),
  };
}

export function assignTask(state: GameState, taskId: string, assignee: string): GameState {
  return {
    ...state,
    tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, assignee } : task)),
  };
}

export function mitigateRisk(scenario: Scenario, state: GameState, riskId: string): GameState {
  const risk = scenario.risks.find((candidate) => candidate.id === riskId);
  if (!risk || hasMitigatedRisk(state, risk.id) || state.finished) return state;

  if (moneyRemaining(scenario, state) < risk.cost) {
    return addLog(state, `${risk.title} needs more budget than you have left.`);
  }

  return addLog(
    {
      ...state,
      spent: state.spent + risk.cost,
      mitigatedRisks: [...state.mitigatedRisks, risk.id],
      trust: clamp(state.trust + 2),
    },
    `${risk.title} mitigated. You spent ${risk.cost} coins to reduce future risk.`,
  );
}

export function advanceTask(scenario: Scenario, state: GameState, taskId: string): GameState {
  const task = getTask(state, taskId);
  if (!task || state.finished) return state;

  if (task.status === "todo") return startTask(scenario, state, task);
  if (task.status === "doing") {
    return addLog(updateTask(state, taskId, { status: "review" }), `${task.title} moved to review.`);
  }
  if (task.status === "review") {
    const nextState = updateTask(state, taskId, {
      status: "done",
      completedWeek: state.week,
    });
    const withQuality = {
      ...nextState,
      quality: clamp(nextState.quality + Math.ceil(task.qualityImpact / 2)),
    };
    const withLog = addLog(withQuality, `${task.title} completed. Quality improved.`);
    return completedTasks(withLog).length === withLog.tasks.length
      ? finishProject(withLog)
      : withLog;
  }

  return state;
}

function startTask(scenario: Scenario, state: GameState, task: ProjectTask): GameState {
  if (!dependenciesDone(state, task)) {
    return addLog(state, `${task.title} is blocked by another task.`);
  }
  if (!task.assignee) {
    return addLog(state, `Assign a teammate before starting ${task.title}.`);
  }
  if (moneyRemaining(scenario, state) < task.cost) {
    return addLog(state, `${task.title} needs more budget than you have left.`);
  }

  const member = memberById(scenario, task.assignee);
  if (!member) return state;

  let nextState = updateTask(state, task.id, {
    status: "doing",
    startedWeek: state.week,
  });
  nextState = { ...nextState, spent: nextState.spent + task.cost };

  const capacityLeft = state.teamCapacity[member.id];
  if (capacityLeft >= task.effort) {
    nextState = {
      ...nextState,
      teamCapacity: {
        ...nextState.teamCapacity,
        [member.id]: capacityLeft - task.effort,
      },
    };
  } else {
    nextState = addLog(
      {
        ...nextState,
        teamCapacity: { ...nextState.teamCapacity, [member.id]: 0 },
        morale: clamp(nextState.morale - 7),
        quality: clamp(nextState.quality - 3),
      },
      `${member.name} is overloaded. Morale and quality took a hit.`,
    );
  }

  if (member.skills.includes(task.skill)) {
    nextState = { ...nextState, quality: clamp(nextState.quality + 2) };
  } else {
    nextState = addLog(
      { ...nextState, morale: clamp(nextState.morale - 3) },
      `${member.name} can help, but ${task.skill} is not their strongest skill.`,
    );
  }

  return addLog(nextState, `${task.title} started by ${member.name}.`);
}

function updateTask(state: GameState, taskId: string, updates: Partial<ProjectTask>) {
  return {
    ...state,
    tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
  };
}

export function advanceWeek(
  scenario: Scenario,
  state: GameState,
  eventPicker: (availableEvents: ScenarioEvent[]) => ScenarioEvent | null = pickRandomEvent,
): GameState {
  if (state.finished || state.activeEvent) return state;
  if (state.week >= scenario.deadlineWeeks) return finishProject(state);

  let nextState: GameState = {
    ...state,
    week: state.week + 1,
    teamCapacity: Object.fromEntries(
      scenario.team.map((member) => [member.id, member.capacity]),
    ),
  };

  const doingCount = nextState.tasks.filter((task) => task.status === "doing").length;
  if (doingCount > 3) {
    nextState = addLog(
      { ...nextState, morale: clamp(nextState.morale - 4) },
      "Too much work is in progress. The team feels stretched.",
    );
  }

  const event = eventPicker(scenario.events.filter((item) => !state.usedEvents.includes(item.id)));
  if (event) nextState = { ...nextState, activeEvent: event.id };

  return addLog(nextState, `Week ${nextState.week} started. Team capacity refreshed.`);
}

export function pickRandomEvent(availableEvents: ScenarioEvent[]) {
  if (!availableEvents.length) return null;
  return availableEvents[Math.floor(Math.random() * availableEvents.length)];
}

export function chooseEvent(scenario: Scenario, state: GameState, choiceIndex: number): GameState {
  const event = scenario.events.find((candidate) => candidate.id === state.activeEvent);
  if (!event) return state;

  const choice = event.choices[choiceIndex];
  if (!choice) return state;

  const risk = riskByEvent(scenario, event.id);
  const prepared = Boolean(risk && hasMitigatedRisk(state, risk.id));

  let nextState = applyEffects(state, choice.effects);
  if (prepared && risk) nextState = applyEffects(nextState, risk.response.effects);

  nextState = {
    ...nextState,
    usedEvents: [...nextState.usedEvents, event.id],
    activeEvent: null,
    lessons: [
      ...(prepared
        ? ["Risk responses work best when they are planned before the problem happens."]
        : []),
      choice.lesson,
      ...nextState.lessons,
    ].slice(0, 6),
  };

  nextState = addLog(nextState, `${event.title}: ${choice.outcome}`);
  if (prepared && risk) nextState = addLog(nextState, `${risk.response.label}: ${risk.response.outcome}`);
  return nextState;
}

export function finishProject(state: GameState): GameState {
  return { ...state, finished: true };
}

export function scoreProject(scenario: Scenario, state: GameState): ScoreSummary {
  const done = completedTasks(state).length;
  const scope = Math.round((done / state.tasks.length) * 100);
  const budget = moneyRemaining(scenario, state);
  const deadlineText = done === state.tasks.length ? "All tasks done" : `${done}/${state.tasks.length} tasks done`;
  const outcome =
    scope >= 80 && budget >= 0 && state.quality >= 65
      ? `${scenario.title} is ready to share.`
      : "The project has useful progress, but the retrospective shows what to improve next time.";
  const lessons = state.lessons.length
    ? state.lessons
    : ["Good PMs make tradeoffs visible and communicate early."];

  return {
    outcome,
    scoreCards: [
      { label: "Scope", value: `${scope}%`, icon: "target" },
      { label: "Deadline", value: deadlineText, icon: "calendar", variant: "info" },
      { label: "Budget left", value: `${budget} coins`, icon: "coins", variant: "success" },
      { label: "Quality", value: `${state.quality}/100`, icon: "sparkles", variant: "purple" },
      { label: "Team morale", value: `${state.morale}/100`, icon: "smile", variant: "warning" },
      { label: "Stakeholder trust", value: `${state.trust}/100`, icon: "handshake", variant: "info" },
      {
        label: "Risks mitigated",
        value: `${state.mitigatedRisks.length}/${scenario.risks.length}`,
        icon: "shieldAlert",
        variant: "accent",
      },
    ],
    retrospective: [bestResult(state, scope, budget), riskResult(scenario, state), lessons[0]],
  };
}

function bestResult(state: GameState, scope: number, budget: number) {
  if (scope >= 80 && budget >= 0) return "You protected delivery while keeping the budget visible.";
  if (state.trust >= 75) return "Stakeholders stayed informed, which made the project healthier.";
  return "You created a working plan and can now improve the next run.";
}

function riskResult(scenario: Scenario, state: GameState) {
  if (state.morale < 50) return "Biggest risk: the team was under too much pressure.";
  if (state.quality < 60) return "Biggest risk: quality needed more review and testing.";
  if (moneyRemaining(scenario, state) < 10) return "Biggest risk: the budget had very little safety room.";
  return "Biggest risk handled: you kept the main project constraints balanced.";
}

export function formatEffect(key: keyof Effects, value: number, difficulty: Difficulty) {
  if (difficulty === "challenge") return formatChallengeEffect(key, value);
  if (key === "spent") {
    return {
      label: value > 0 ? `-${value} coins` : `+${Math.abs(value)} coins`,
      tone: value > 0 ? "negative" : "positive",
    };
  }
  return {
    label: `${value > 0 ? "+" : ""}${value} ${key}`,
    tone: value > 0 ? "positive" : "negative",
  };
}

function formatChallengeEffect(key: keyof Effects, value: number) {
  if (key === "spent") {
    return {
      label: value > 0 ? "costs coins" : "saves coins",
      tone: value > 0 ? "negative" : "positive",
    };
  }
  return {
    label: value > 0 ? `helps ${key}` : `hurts ${key}`,
    tone: value > 0 ? "positive" : "negative",
  };
}

export function bestAssigneeForTask(scenario: Scenario, state: GameState, task: ProjectTask): TeamMember {
  return scenario.team
    .map((member) => {
      const skillScore = member.skills.includes(task.skill) ? 10 : 0;
      const capacityScore = state.teamCapacity[member.id] >= task.effort ? 4 : 0;
      return { member, score: skillScore + capacityScore + state.teamCapacity[member.id] };
    })
    .sort((a, b) => b.score - a.score)[0].member;
}

export function getStarterChecklistItems(state: GameState) {
  return [
    {
      done: state.tasks.some((task) => task.assignee),
      icon: "users",
      title: "Assign a teammate",
      detail: "Pick someone for an unblocked task so work has a clear owner.",
    },
    {
      done: state.tasks.some((task) => task.status !== "todo"),
      icon: "play",
      title: "Start one task",
      detail: "Spend the task budget and capacity when the assignment looks right.",
    },
    {
      done: state.mitigatedRisks.length > 0,
      icon: "shieldAlert",
      title: "Plan for one risk",
      detail: "Mitigate a risk before the matching scenario card appears.",
    },
    {
      done: completedTasks(state).length > 0,
      icon: "eye",
      title: "Complete reviewed work",
      detail: "Move a task through Doing and Review so it counts toward scope.",
    },
    {
      done: state.week > 1,
      icon: "arrowRight",
      title: "Advance the week",
      detail: "Refresh team capacity and respond to the next project surprise.",
    },
  ];
}

export function getCoachAdvice(scenario: Scenario, state: GameState) {
  if (state.activeEvent) {
    return {
      icon: "lightbulb",
      tone: "warning",
      title: "Answer the scenario card",
      body: "Pick a response before changing the board. The project is paused until that decision is made.",
    };
  }
  if (state.finished) {
    return {
      icon: "trophy",
      tone: "success",
      title: "Review the retrospective",
      body: "Use the scorecard to connect your choices with scope, budget, quality, morale, and trust.",
    };
  }

  const reviewTask = state.tasks.find((task) => task.status === "review");
  if (reviewTask) {
    return {
      icon: "eye",
      tone: "success",
      title: "Finish review work",
      body: `${reviewTask.title} is ready to complete. Finishing reviewed work improves quality and unlocks progress.`,
    };
  }

  const doingCount = state.tasks.filter((task) => task.status === "doing").length;
  const doingTask = state.tasks.find((task) => task.status === "doing");
  if (doingCount >= 3 && doingTask) {
    return {
      icon: "alertTriangle",
      tone: "warning",
      title: "Limit work in progress",
      body: `Move ${doingTask.title} to review before starting more tasks so the team does not get stretched.`,
    };
  }

  const startableTask = state.tasks.find(
    (task) =>
      task.status === "todo" &&
      task.assignee &&
      dependenciesDone(state, task) &&
      moneyRemaining(scenario, state) >= task.cost,
  );
  if (startableTask) {
    const assignee = memberById(scenario, startableTask.assignee);
    return {
      icon: "play",
      tone: "info",
      title: "Start the assigned task",
      body: `${startableTask.title} is ready for ${assignee ? assignee.name : "the team"}. Start it when you want to spend the effort and budget.`,
    };
  }

  const readyTask = state.tasks.find(
    (task) => task.status === "todo" && dependenciesDone(state, task) && moneyRemaining(scenario, state) >= task.cost,
  );
  if (readyTask) {
    const suggested = bestAssigneeForTask(scenario, state, readyTask);
    return {
      icon: "users",
      tone: "info",
      title: "Assign the next task",
      body: `${readyTask.title} is unblocked. ${suggested.name} is the best fit right now based on skill and capacity.`,
    };
  }

  const blockedTask = state.tasks.find((task) => task.status === "todo" && !dependenciesDone(state, task));
  if (blockedTask) {
    const dependency = blockedTask.dependsOn
      .map((dependencyId) => getTask(state, dependencyId))
      .find((task) => task && task.status !== "done");
    return {
      icon: "alertTriangle",
      tone: "warning",
      title: "Clear a dependency",
      body: `${blockedTask.title} is waiting on ${dependency ? dependency.title : "another task"}. Finish the prerequisite first.`,
    };
  }

  if (moneyRemaining(scenario, state) < 15) {
    return {
      icon: "coins",
      tone: "warning",
      title: "Protect the remaining budget",
      body: "Money is tight. Prioritize no-cost work, review risky spending, and avoid optional extras.",
    };
  }

  const affordableRisk = scenario.risks.find(
    (risk) => !hasMitigatedRisk(state, risk.id) && moneyRemaining(scenario, state) >= risk.cost,
  );
  if (affordableRisk) {
    return {
      icon: "shieldAlert",
      tone: "warning",
      title: "Plan for a likely risk",
      body: `${affordableRisk.title} can be mitigated before it appears. Risk work costs less when it happens early.`,
    };
  }

  return {
    icon: "target",
    tone: "info",
    title: "Advance when the week feels ready",
    body: "Check capacity, budget, and risks. Then advance the week to see how the project changes.",
  };
}

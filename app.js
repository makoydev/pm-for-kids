const STORAGE_KEY = "pm-for-kids-state-v1";

const scenario = {
  id: "science-fair-booth",
  title: "School Science Fair Booth",
  goal: "Build and present a clean water filtration booth before the science fair deadline.",
  deadlineWeeks: 4,
  budget: 100,
  team: [
    {
      id: "alex",
      name: "Alex",
      role: "Builder",
      skills: ["build", "test"],
      capacity: 4,
    },
    {
      id: "sam",
      name: "Sam",
      role: "Designer",
      skills: ["design", "present"],
      capacity: 3,
    },
    {
      id: "riley",
      name: "Riley",
      role: "Researcher",
      skills: ["research", "plan"],
      capacity: 5,
    },
  ],
  tasks: [
    {
      id: "pick-topic",
      title: "Pick project topic",
      effort: 1,
      cost: 0,
      skill: "plan",
      dependsOn: [],
      qualityImpact: 6,
    },
    {
      id: "research-filters",
      title: "Research water filters",
      effort: 2,
      cost: 0,
      skill: "research",
      dependsOn: ["pick-topic"],
      qualityImpact: 12,
    },
    {
      id: "supply-list",
      title: "Make supplies list",
      effort: 1,
      cost: 0,
      skill: "plan",
      dependsOn: ["research-filters"],
      qualityImpact: 8,
    },
    {
      id: "buy-supplies",
      title: "Buy supplies",
      effort: 1,
      cost: 26,
      skill: "plan",
      dependsOn: ["supply-list"],
      qualityImpact: 8,
    },
    {
      id: "build-prototype",
      title: "Build filter prototype",
      effort: 3,
      cost: 12,
      skill: "build",
      dependsOn: ["buy-supplies"],
      qualityImpact: 18,
    },
    {
      id: "test-prototype",
      title: "Test the prototype",
      effort: 2,
      cost: 6,
      skill: "test",
      dependsOn: ["build-prototype"],
      qualityImpact: 18,
    },
    {
      id: "make-poster",
      title: "Create poster",
      effort: 2,
      cost: 14,
      skill: "design",
      dependsOn: ["research-filters"],
      qualityImpact: 12,
    },
    {
      id: "practice-talk",
      title: "Practice presentation",
      effort: 2,
      cost: 0,
      skill: "present",
      dependsOn: ["make-poster", "test-prototype"],
      qualityImpact: 15,
    },
    {
      id: "backup-plan",
      title: "Prepare backup supplies",
      effort: 1,
      cost: 10,
      skill: "plan",
      dependsOn: ["buy-supplies"],
      qualityImpact: 8,
    },
    {
      id: "booth-cleanup",
      title: "Clean up booth area",
      effort: 1,
      cost: 0,
      skill: "build",
      dependsOn: ["practice-talk"],
      qualityImpact: 5,
    },
  ],
  events: [
    {
      id: "supplier-delay",
      title: "Supplies arrive late",
      body: "The store says the filter materials may arrive one week late. The team still wants to keep building.",
      choices: [
        {
          label: "Tell the sponsor and re-plan the week",
          outcome: "The sponsor trusts you more, and the team switches to poster and research work.",
          lesson: "Good PMs communicate early when a schedule risk appears.",
          effects: { trust: 9, morale: 3 },
        },
        {
          label: "Buy local materials today",
          outcome: "The project stays moving, but the replacement materials cost more.",
          lesson: "Sometimes spending contingency protects the schedule.",
          effects: { spent: 12, quality: 3 },
        },
        {
          label: "Wait and say nothing",
          outcome: "No money is spent, but the sponsor is surprised later.",
          lesson: "Hidden risks usually become bigger problems.",
          effects: { trust: -12, morale: -4 },
        },
      ],
    },
    {
      id: "prototype-leaks",
      title: "The prototype leaks",
      body: "Water is dripping from one side of the filter. The team can fix it, cover it up, or explain the risk.",
      choices: [
        {
          label: "Pause and fix the leak",
          outcome: "The fix takes focus, but the booth becomes much stronger.",
          lesson: "Protecting quality early prevents expensive rework.",
          effects: { quality: 14, morale: 2 },
        },
        {
          label: "Cover it with tape and continue",
          outcome: "The team moves faster, but the judge may notice poor quality.",
          lesson: "Fast shortcuts can create quality debt.",
          effects: { quality: -10, trust: -4 },
        },
        {
          label: "Ask Alex and Riley to test causes",
          outcome: "The team finds the real cause and learns from it.",
          lesson: "Root cause analysis beats guessing.",
          effects: { quality: 9, morale: 5 },
        },
      ],
    },
    {
      id: "team-sick",
      title: "A teammate is sick",
      body: "Sam cannot help this week. The poster and presentation work may slip.",
      choices: [
        {
          label: "Reassign only the most important work",
          outcome: "The team stays calm and protects the must-have tasks.",
          lesson: "Prioritization matters when capacity drops.",
          effects: { morale: 6, trust: 3 },
        },
        {
          label: "Ask everyone to work extra",
          outcome: "More tasks move, but the team feels tired.",
          lesson: "Overtime can help briefly, but it has a cost.",
          effects: { morale: -12, quality: -4 },
        },
        {
          label: "Cut practice time",
          outcome: "The plan saves time but the final presentation may suffer.",
          lesson: "Scope cuts should be chosen carefully.",
          effects: { quality: -8, trust: 2 },
        },
      ],
    },
    {
      id: "sponsor-bigger-poster",
      title: "The sponsor asks for a bigger poster",
      body: "A bigger poster could look great, but it was not in the original plan.",
      choices: [
        {
          label: "Ask what problem the bigger poster solves",
          outcome: "You learn the sponsor wants clearer results, not just a bigger poster.",
          lesson: "Clarify the need before accepting scope changes.",
          effects: { trust: 8, quality: 5 },
        },
        {
          label: "Accept it immediately",
          outcome: "The sponsor is happy today, but the team now has extra work.",
          lesson: "Uncontrolled scope can pressure the schedule.",
          effects: { trust: 4, morale: -8, spent: 8 },
        },
        {
          label: "Say no without explaining",
          outcome: "The team avoids work, but the sponsor feels ignored.",
          lesson: "Stakeholder management needs clear reasons.",
          effects: { trust: -10, morale: 2 },
        },
      ],
    },
    {
      id: "judge-clarity",
      title: "The judge wants clearer results",
      body: "A teacher says the experiment is interesting, but the results are hard to understand.",
      choices: [
        {
          label: "Add a simple results chart",
          outcome: "The booth becomes easier to understand.",
          lesson: "Quality includes whether people can use and understand the work.",
          effects: { quality: 12, spent: 4 },
        },
        {
          label: "Keep the original poster",
          outcome: "No extra work is needed, but the message stays unclear.",
          lesson: "Ignoring feedback can limit project value.",
          effects: { quality: -8, trust: -3 },
        },
        {
          label: "Practice a shorter explanation",
          outcome: "The presentation gets clearer without much cost.",
          lesson: "Sometimes communication improves value more than more features.",
          effects: { quality: 8, morale: 3 },
        },
      ],
    },
    {
      id: "cheap-material",
      title: "A cheaper material is available",
      body: "A friend offers cheaper materials. They save money, but nobody has tested them.",
      choices: [
        {
          label: "Test the material before switching",
          outcome: "The team spends a little time learning whether the swap is safe.",
          lesson: "Validate assumptions before changing the plan.",
          effects: { quality: 7, trust: 3 },
        },
        {
          label: "Switch now to save money",
          outcome: "Budget improves, but the prototype becomes less reliable.",
          lesson: "Lowest cost is not always best value.",
          effects: { spent: -8, quality: -10 },
        },
        {
          label: "Reject the change",
          outcome: "The team keeps the known plan and avoids new risk.",
          lesson: "Avoiding change can be smart when the risk is not worth it.",
          effects: { trust: 2 },
        },
      ],
    },
    {
      id: "friend-adds-feature",
      title: "A friend suggests a bonus feature",
      body: "Someone says the booth should include a small quiz game. It sounds fun, but the deadline is close.",
      choices: [
        {
          label: "Add it only if core work is done",
          outcome: "The idea becomes optional instead of distracting the team.",
          lesson: "Use nice-to-have scope only after must-have work is safe.",
          effects: { trust: 5, morale: 3 },
        },
        {
          label: "Add it now",
          outcome: "The team gets excited, but core delivery becomes riskier.",
          lesson: "Fun ideas still need priority decisions.",
          effects: { morale: 5, quality: -7 },
        },
        {
          label: "Ignore the suggestion",
          outcome: "The plan stays focused, but the friend does not know why.",
          lesson: "A short explanation keeps people aligned.",
          effects: { trust: -3 },
        },
      ],
    },
    {
      id: "budget-warning",
      title: "The budget is getting tight",
      body: "There is less money left than expected. The project can still succeed, but choices matter now.",
      choices: [
        {
          label: "Protect money for must-have tasks",
          outcome: "The team stops spending on extras and keeps delivery possible.",
          lesson: "A PM protects budget for the highest-value work.",
          effects: { trust: 5, morale: 1 },
        },
        {
          label: "Spend on decorations anyway",
          outcome: "The booth looks nicer, but the project has less room for surprises.",
          lesson: "Spending should match project goals.",
          effects: { spent: 10, quality: 3, trust: -4 },
        },
        {
          label: "Ask for more money with a reason",
          outcome: "The sponsor appreciates the clear request, but only approves a small increase.",
          lesson: "Escalation works best with facts and options.",
          effects: { trust: 7, spent: -6 },
        },
      ],
    },
    {
      id: "team-conflict",
      title: "Two teammates disagree",
      body: "Alex wants to rebuild the filter. Sam wants to finish the poster first.",
      choices: [
        {
          label: "Review the project goal together",
          outcome: "The team agrees to focus on the work that protects judging success.",
          lesson: "A shared goal helps resolve conflict.",
          effects: { morale: 8, trust: 3 },
        },
        {
          label: "Choose one person quickly",
          outcome: "The decision is fast, but one teammate feels unheard.",
          lesson: "Fast decisions still need team buy-in.",
          effects: { morale: -7, quality: 2 },
        },
        {
          label: "Let them keep debating",
          outcome: "No one is upset yet, but progress slows.",
          lesson: "Avoiding decisions can also be a decision.",
          effects: { morale: -4, trust: -4 },
        },
      ],
    },
    {
      id: "missing-dependency",
      title: "A dependency was missed",
      body: "The team realizes the presentation cannot be practiced until test results are ready.",
      choices: [
        {
          label: "Update the task order",
          outcome: "The board becomes clearer and the team stops starting blocked work.",
          lesson: "Dependencies make plans more realistic.",
          effects: { quality: 5, morale: 4 },
        },
        {
          label: "Practice without results",
          outcome: "The team uses time, but the practice is not very useful.",
          lesson: "Starting too early can waste effort.",
          effects: { quality: -6, morale: -2 },
        },
        {
          label: "Skip practice",
          outcome: "The team saves effort but the final delivery gets riskier.",
          lesson: "Removing quality activities should be a conscious tradeoff.",
          effects: { quality: -9, trust: 2 },
        },
      ],
    },
    {
      id: "weather-risk",
      title: "Rain may affect transport",
      body: "The booth materials need to be carried to school, and rain is forecast for fair day.",
      choices: [
        {
          label: "Prepare bags and labels",
          outcome: "The team spends a little money and avoids a messy delivery risk.",
          lesson: "Risk response planning can be simple and practical.",
          effects: { spent: 5, trust: 5, quality: 3 },
        },
        {
          label: "Hope the weather changes",
          outcome: "Nothing changes today, but the delivery risk remains.",
          lesson: "Hope is not a risk plan.",
          effects: { trust: -6 },
        },
        {
          label: "Move materials early",
          outcome: "The team reduces risk and feels more prepared.",
          lesson: "Pulling work forward can reduce deadline pressure.",
          effects: { morale: 5, trust: 4 },
        },
      ],
    },
    {
      id: "quality-review",
      title: "A teacher offers a review",
      body: "A teacher can review the booth, but the team must use time to listen and adjust.",
      choices: [
        {
          label: "Take the review",
          outcome: "The feedback helps the team fix weak spots.",
          lesson: "Reviews improve quality before the deadline.",
          effects: { quality: 12, trust: 4 },
        },
        {
          label: "Decline because the team is busy",
          outcome: "The team saves time but misses useful feedback.",
          lesson: "Skipping feedback can hide defects.",
          effects: { quality: -5 },
        },
        {
          label: "Ask for only the top two issues",
          outcome: "The team gets focused feedback without losing the whole week.",
          lesson: "Time-boxing keeps feedback useful and manageable.",
          effects: { quality: 8, morale: 2 },
        },
      ],
    },
    {
      id: "unclear-owner",
      title: "No one owns cleanup",
      body: "Everyone thought someone else would clean and pack the booth after practice.",
      choices: [
        {
          label: "Assign a clear owner",
          outcome: "The task becomes visible and the team avoids last-minute confusion.",
          lesson: "Clear ownership prevents dropped work.",
          effects: { morale: 4, trust: 4 },
        },
        {
          label: "Do it yourself without telling anyone",
          outcome: "The work gets done, but the team does not learn the process.",
          lesson: "PMs help the system improve, not just rescue every task.",
          effects: { morale: -3, quality: 3 },
        },
        {
          label: "Leave it for later",
          outcome: "The board looks easier now, but the deadline gets more stressful.",
          lesson: "Deferred work still exists.",
          effects: { morale: -5, trust: -3 },
        },
      ],
    },
    {
      id: "scope-cut",
      title: "There may be too much work",
      body: "The deadline is close. The team may need to cut something to protect the project.",
      choices: [
        {
          label: "Cut a nice-to-have task",
          outcome: "The project stays realistic and the most important work remains safe.",
          lesson: "Scope control protects project goals.",
          effects: { trust: 6, morale: 4 },
        },
        {
          label: "Cut testing",
          outcome: "The board moves faster, but quality risk rises sharply.",
          lesson: "Cutting validation is dangerous.",
          effects: { quality: -14, morale: -3 },
        },
        {
          label: "Keep everything",
          outcome: "The plan looks complete, but the team feels pressure.",
          lesson: "A plan is only useful if the team can execute it.",
          effects: { morale: -8, trust: -3 },
        },
      ],
    },
    {
      id: "final-rehearsal",
      title: "Final rehearsal is rough",
      body: "The team forgets key points during practice. There is still time to improve if you focus.",
      choices: [
        {
          label: "Practice the opening and results",
          outcome: "The team improves the most important parts of the talk.",
          lesson: "Focus effort where it creates the most value.",
          effects: { quality: 10, morale: 4 },
        },
        {
          label: "Rewrite the whole talk",
          outcome: "The presentation may improve, but the team gets overwhelmed.",
          lesson: "Big late changes can create new risk.",
          effects: { quality: 3, morale: -9 },
        },
        {
          label: "Skip rehearsal because the booth is done",
          outcome: "The physical booth is ready, but delivery is weaker.",
          lesson: "Done includes being ready to present.",
          effects: { quality: -10, trust: -2 },
        },
      ],
    },
  ],
};

const columns = [
  { id: "todo", title: "Todo" },
  { id: "doing", title: "Doing" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

let state = loadState();

const els = {
  projectTitle: document.querySelector("#projectTitle"),
  projectGoal: document.querySelector("#projectGoal"),
  weekValue: document.querySelector("#weekValue"),
  meters: document.querySelector("#meters"),
  teamList: document.querySelector("#teamList"),
  board: document.querySelector("#board"),
  doneCount: document.querySelector("#doneCount"),
  blockedCount: document.querySelector("#blockedCount"),
  activityLog: document.querySelector("#activityLog"),
  savedStatus: document.querySelector("#savedStatus"),
  advanceButton: document.querySelector("#advanceButton"),
  finishButton: document.querySelector("#finishButton"),
  resetButton: document.querySelector("#resetButton"),
  clearLogButton: document.querySelector("#clearLogButton"),
  eventDialog: document.querySelector("#eventDialog"),
  eventType: document.querySelector("#eventType"),
  eventTitle: document.querySelector("#eventTitle"),
  eventBody: document.querySelector("#eventBody"),
  eventChoices: document.querySelector("#eventChoices"),
  scoreDialog: document.querySelector("#scoreDialog"),
  scoreContent: document.querySelector("#scoreContent"),
  playAgainButton: document.querySelector("#playAgainButton"),
  closeScoreButton: document.querySelector("#closeScoreButton"),
};

function createInitialState() {
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
    usedEvents: [],
    activeEvent: null,
    log: [
      "Project started. Review the backlog, assign work, and keep the team healthy.",
    ],
    lessons: [],
    finished: false,
  };
}

function loadState() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return createInitialState();
  }

  try {
    const parsed = JSON.parse(saved);
    if (!parsed || parsed.scenarioId !== scenario.id) {
      return createInitialState();
    }
    return parsed.state;
  } catch {
    return createInitialState();
  }
}

function saveState() {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ scenarioId: scenario.id, state }),
  );
  els.savedStatus.textContent = "Saved";
}

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function moneyRemaining() {
  return scenario.budget - state.spent;
}

function completedTasks() {
  return state.tasks.filter((task) => task.status === "done");
}

function getTask(taskId) {
  return state.tasks.find((task) => task.id === taskId);
}

function dependenciesDone(task) {
  return task.dependsOn.every((dependencyId) => getTask(dependencyId)?.status === "done");
}

function dependencyNames(task) {
  return task.dependsOn
    .filter((dependencyId) => getTask(dependencyId)?.status !== "done")
    .map((dependencyId) => getTask(dependencyId)?.title)
    .filter(Boolean);
}

function memberById(memberId) {
  return scenario.team.find((member) => member.id === memberId);
}

function applyEffects(effects) {
  state.spent = Math.max(0, state.spent + (effects.spent || 0));
  state.quality = clamp(state.quality + (effects.quality || 0));
  state.morale = clamp(state.morale + (effects.morale || 0));
  state.trust = clamp(state.trust + (effects.trust || 0));
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 18);
}

function render() {
  els.projectTitle.textContent = scenario.title;
  els.projectGoal.textContent = scenario.goal;
  els.weekValue.textContent = `${state.week} of ${scenario.deadlineWeeks}`;
  els.advanceButton.disabled = state.finished || Boolean(state.activeEvent);
  els.finishButton.disabled = state.finished;

  renderMeters();
  renderTeam();
  renderBoard();
  renderLog();
  saveState();
}

function renderMeters() {
  const scope = Math.round((completedTasks().length / state.tasks.length) * 100);
  const budgetValue = clamp(Math.round((moneyRemaining() / scenario.budget) * 100));
  const meters = [
    {
      label: "Scope done",
      value: scope,
      detail: `${completedTasks().length}/${state.tasks.length} tasks`,
      className: "quality",
    },
    {
      label: "Budget left",
      value: budgetValue,
      detail: `${moneyRemaining()} coins`,
      className: "budget",
    },
    {
      label: "Quality",
      value: state.quality,
      detail: `${state.quality}/100`,
      className: "quality",
    },
    {
      label: "Team morale",
      value: state.morale,
      detail: `${state.morale}/100`,
      className: "morale",
    },
    {
      label: "Stakeholder trust",
      value: state.trust,
      detail: `${state.trust}/100`,
      className: "trust",
    },
  ];

  els.meters.innerHTML = meters
    .map(
      (meter) => `
        <div class="meter">
          <div class="meter-row">
            <strong>${meter.label}</strong>
            <span>${meter.detail}</span>
          </div>
          <div class="track" aria-hidden="true">
            <div class="fill ${meter.className}" style="width: ${meter.value}%"></div>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderTeam() {
  els.teamList.innerHTML = scenario.team
    .map((member) => {
      const remaining = state.teamCapacity[member.id];
      return `
        <article class="team-card">
          <strong>${member.name}</strong>
          <span class="muted">${member.role} · ${remaining}/${member.capacity} capacity left</span>
          <div class="tag-row">
            ${member.skills.map((skill) => `<span class="tag">${skill}</span>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderBoard() {
  const blockedCount = state.tasks.filter(
    (task) => task.status === "todo" && !dependenciesDone(task),
  ).length;

  els.doneCount.textContent = `${completedTasks().length} done`;
  els.blockedCount.textContent = `${blockedCount} blocked`;

  els.board.innerHTML = columns
    .map((column) => {
      const tasks = state.tasks.filter((task) => task.status === column.id);
      return `
        <section class="column" aria-label="${column.title}">
          <div class="column-header">
            <span class="column-title">${column.title}</span>
            <span class="tag">${tasks.length}</span>
          </div>
          <div class="task-list">
            ${tasks.map(renderTask).join("") || `<p class="muted">No tasks here.</p>`}
          </div>
        </section>
      `;
    })
    .join("");

  state.tasks.forEach((task) => {
    const select = document.querySelector(`[data-assignee="${task.id}"]`);
    const button = document.querySelector(`[data-action="${task.id}"]`);
    if (select) {
      select.addEventListener("change", (event) => {
        task.assignee = event.target.value;
        saveState();
      });
    }
    if (button) {
      button.addEventListener("click", () => advanceTask(task.id));
    }
  });
}

function renderTask(task) {
  const blockedNames = dependencyNames(task);
  const isBlocked = task.status === "todo" && blockedNames.length > 0;
  const assignee = task.assignee ? memberById(task.assignee) : null;
  const actionLabel = getActionLabel(task);

  return `
    <article class="task-card ${isBlocked ? "blocked" : ""}">
      <div>
        <h3>${task.title}</h3>
        <div class="task-meta">
          <span class="tag">${task.effort} effort</span>
          <span class="tag">${task.cost} coins</span>
          <span class="tag">${task.skill}</span>
        </div>
      </div>
      ${isBlocked ? `<p class="warning">Blocked by: ${blockedNames.join(", ")}</p>` : ""}
      ${task.status !== "done" ? renderTaskActions(task, actionLabel, assignee) : renderDoneTask(task, assignee)}
    </article>
  `;
}

function renderTaskActions(task, actionLabel, assignee) {
  const disableStart = task.status === "todo" && (!dependenciesDone(task) || moneyRemaining() < task.cost);
  const warning =
    task.status === "todo" && moneyRemaining() < task.cost
      ? `<p class="warning">Not enough budget for this task.</p>`
      : "";

  return `
    <div class="task-actions">
      ${
        task.status === "todo"
          ? `
            <select data-assignee="${task.id}" aria-label="Assign ${task.title}">
              <option value="">Assign teammate</option>
              ${scenario.team
                .map(
                  (member) => `
                    <option value="${member.id}" ${task.assignee === member.id ? "selected" : ""}>
                      ${member.name} (${state.teamCapacity[member.id]} left)
                    </option>
                  `,
                )
                .join("")}
            </select>
          `
          : `<span class="muted">Assigned to ${assignee ? assignee.name : "the team"}</span>`
      }
      ${warning}
      <button
        class="button secondary"
        type="button"
        data-action="${task.id}"
        ${disableStart || state.finished ? "disabled" : ""}
      >
        ${actionLabel}
      </button>
    </div>
  `;
}

function renderDoneTask(task, assignee) {
  return `<span class="muted">Completed in week ${task.completedWeek} by ${assignee ? assignee.name : "the team"}.</span>`;
}

function getActionLabel(task) {
  if (task.status === "todo") return "Start Task";
  if (task.status === "doing") return "Move to Review";
  if (task.status === "review") return "Complete Task";
  return "Done";
}

function advanceTask(taskId) {
  const task = getTask(taskId);
  if (!task || state.finished) return;

  if (task.status === "todo") {
    startTask(task);
    return;
  }

  if (task.status === "doing") {
    task.status = "review";
    addLog(`${task.title} moved to review.`);
    render();
    return;
  }

  if (task.status === "review") {
    task.status = "done";
    task.completedWeek = state.week;
    state.quality = clamp(state.quality + Math.ceil(task.qualityImpact / 2));
    addLog(`${task.title} completed. Quality improved.`);
    maybeFinishAutomatically();
    render();
  }
}

function startTask(task) {
  if (!dependenciesDone(task)) {
    addLog(`${task.title} is blocked by another task.`);
    render();
    return;
  }

  if (!task.assignee) {
    addLog(`Assign a teammate before starting ${task.title}.`);
    render();
    return;
  }

  if (moneyRemaining() < task.cost) {
    addLog(`${task.title} needs more budget than you have left.`);
    render();
    return;
  }

  const member = memberById(task.assignee);
  const capacityLeft = state.teamCapacity[member.id];

  task.status = "doing";
  task.startedWeek = state.week;
  state.spent += task.cost;

  if (capacityLeft >= task.effort) {
    state.teamCapacity[member.id] -= task.effort;
  } else {
    state.teamCapacity[member.id] = 0;
    state.morale = clamp(state.morale - 7);
    state.quality = clamp(state.quality - 3);
    addLog(`${member.name} is overloaded. Morale and quality took a hit.`);
  }

  if (member.skills.includes(task.skill)) {
    state.quality = clamp(state.quality + 2);
  } else {
    state.morale = clamp(state.morale - 3);
    addLog(`${member.name} can help, but ${task.skill} is not their strongest skill.`);
  }

  addLog(`${task.title} started by ${member.name}.`);
  render();
}

function advanceWeek() {
  if (state.finished || state.activeEvent) return;

  if (state.week >= scenario.deadlineWeeks) {
    finishProject();
    return;
  }

  state.week += 1;
  state.teamCapacity = Object.fromEntries(
    scenario.team.map((member) => [member.id, member.capacity]),
  );

  const doingCount = state.tasks.filter((task) => task.status === "doing").length;
  if (doingCount > 3) {
    state.morale = clamp(state.morale - 4);
    addLog("Too much work is in progress. The team feels stretched.");
  }

  const event = pickEvent();
  if (event) {
    state.activeEvent = event.id;
    showEvent(event);
  }

  addLog(`Week ${state.week} started. Team capacity refreshed.`);
  render();
}

function pickEvent() {
  const available = scenario.events.filter((event) => !state.usedEvents.includes(event.id));
  if (!available.length) return null;
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

function showEvent(event) {
  if (els.eventDialog.open) {
    return;
  }

  els.eventType.textContent = `Scenario card · Week ${state.week}`;
  els.eventTitle.textContent = event.title;
  els.eventBody.textContent = event.body;
  els.eventChoices.innerHTML = event.choices
    .map(
      (choice, index) => `
        <button class="choice-card" type="button" data-choice="${index}">
          <strong>${choice.label}</strong>
          <span>${choice.outcome}</span>
        </button>
      `,
    )
    .join("");

  els.eventChoices.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => chooseEvent(Number(button.dataset.choice)));
  });

  els.eventDialog.showModal();
}

function chooseEvent(choiceIndex) {
  const event = scenario.events.find((candidate) => candidate.id === state.activeEvent);
  if (!event) return;
  const choice = event.choices[choiceIndex];

  applyEffects(choice.effects);
  state.usedEvents.push(event.id);
  state.activeEvent = null;
  state.lessons.unshift(choice.lesson);
  state.lessons = state.lessons.slice(0, 6);

  addLog(`${event.title}: ${choice.outcome}`);
  els.eventDialog.close();
  render();
}

function maybeFinishAutomatically() {
  if (completedTasks().length === state.tasks.length) {
    finishProject();
  }
}

function finishProject() {
  state.finished = true;
  showScorecard();
  render();
}

function showScorecard() {
  const done = completedTasks().length;
  const scope = Math.round((done / state.tasks.length) * 100);
  const budget = moneyRemaining();
  const deliveredCore = ["test-prototype", "make-poster", "practice-talk"].every(
    (taskId) => getTask(taskId)?.status === "done",
  );
  const deadlineText = done === state.tasks.length ? "All tasks done" : `${done}/${state.tasks.length} tasks done`;
  const outcome =
    deliveredCore && budget >= 0 && state.quality >= 65
      ? "The booth is ready for the science fair."
      : "The project has useful progress, but the retrospective shows what to improve next time.";

  const lessons = state.lessons.length
    ? state.lessons
    : ["Good PMs make tradeoffs visible and communicate early."];

  els.scoreContent.innerHTML = `
    <p class="muted">${outcome}</p>
    <div class="score-grid">
      <div class="score-card"><span>Scope</span><strong>${scope}%</strong></div>
      <div class="score-card"><span>Deadline</span><strong>${deadlineText}</strong></div>
      <div class="score-card"><span>Budget left</span><strong>${budget} coins</strong></div>
      <div class="score-card"><span>Quality</span><strong>${state.quality}/100</strong></div>
      <div class="score-card"><span>Team morale</span><strong>${state.morale}/100</strong></div>
      <div class="score-card"><span>Stakeholder trust</span><strong>${state.trust}/100</strong></div>
    </div>
    <h3>Retrospective</h3>
    <ol class="retro-list">
      <li>${bestResult(scope, budget)}</li>
      <li>${riskResult()}</li>
      <li>${lessons[0]}</li>
    </ol>
  `;

  els.scoreDialog.showModal();
}

function bestResult(scope, budget) {
  if (scope >= 80 && budget >= 0) {
    return "You protected delivery while keeping the budget visible.";
  }
  if (state.trust >= 75) {
    return "Stakeholders stayed informed, which made the project healthier.";
  }
  return "You created a working plan and can now improve the next run.";
}

function riskResult() {
  if (state.morale < 50) {
    return "Biggest risk: the team was under too much pressure.";
  }
  if (state.quality < 60) {
    return "Biggest risk: quality needed more review and testing.";
  }
  if (moneyRemaining() < 10) {
    return "Biggest risk: the budget had very little safety room.";
  }
  return "Biggest risk handled: you kept the main project constraints balanced.";
}

function renderLog() {
  els.activityLog.innerHTML = state.log.map((item) => `<li>${item}</li>`).join("");
}

function resetGame() {
  state = createInitialState();
  els.scoreDialog.close();
  if (els.eventDialog.open) {
    els.eventDialog.close();
  }
  render();
}

els.advanceButton.addEventListener("click", advanceWeek);
els.finishButton.addEventListener("click", finishProject);
els.resetButton.addEventListener("click", resetGame);
els.playAgainButton.addEventListener("click", resetGame);
els.closeScoreButton.addEventListener("click", () => els.scoreDialog.close());
els.eventDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
});
els.clearLogButton.addEventListener("click", () => {
  state.log = [];
  render();
});

render();

if (state.activeEvent) {
  const event = scenario.events.find((candidate) => candidate.id === state.activeEvent);
  if (event) {
    showEvent(event);
  }
}

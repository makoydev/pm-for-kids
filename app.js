const STORAGE_KEY = "pm-for-kids-state-v1";
const UI_PREFS_KEY = "pm-for-kids-ui-v1";

const ICONS = {
  briefcase: `<path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M2 13h20"/>`,
  bookOpen: `<path d="M12 7v14"/><path d="M3 18a2 2 0 0 0 2 2h7V5H5a2 2 0 0 0-2 2z"/><path d="M21 18a2 2 0 0 1-2 2h-7V5h7a2 2 0 0 1 2 2z"/>`,
  sparkles: `<path d="M12 3 10.5 8.5 5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5z"/><path d="M5 4v2"/><path d="M19 16v2"/><path d="M4 5h2"/><path d="M18 17h2"/>`,
  refresh: `<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v5h-5"/>`,
  flag: `<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>`,
  arrowRight: `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`,
  target: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
  calendar: `<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
  heartPulse: `<path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.36l-.78-.78a5.41 5.41 0 0 0-7.65 7.65l.78.78L12 20.66l7.65-7.65.78-.78a5.4 5.4 0 0 0 0-7.65z"/><path d="M3.22 12H7l1.5-3 3 6 1.5-3h4.78"/>`,
  users: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  shieldAlert: `<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
  kanban: `<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="7" x2="9" y2="14"/><line x1="15" y1="7" x2="15" y2="10"/>`,
  scroll: `<path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M22 17H2a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3 3 3 0 0 0-3-3H8"/>`,
  trash: `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`,
  lightbulb: `<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14a5 5 0 1 0-6.18 0c.46.37.91.86 1.09 1.5h4c.18-.64.63-1.13 1.09-1.5z"/>`,
  trophy: `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>`,
  coins: `<circle cx="9" cy="9" r="6"/><path d="M14.5 9.5h.01"/><path d="M21 15a6 6 0 0 1-9 5.2"/><path d="M15.5 21.5h.01"/>`,
  zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
  wrench: `<path d="M14.7 6.3a4 4 0 0 0 5 5l1.3-1.3a6 6 0 0 1-8.04 8.04L6 22l-4-4 4-4-2-2 2.7-2.7a6 6 0 0 1 8.04-8.04z"/>`,
  smile: `<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>`,
  handshake: `<path d="m11 17 2 2a1 1 0 0 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 0 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 0 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="M21 3v6h-2"/><path d="m3 11 8 8"/><path d="m12 12-3 3"/>`,
  hammer: `<path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-1.13-1.13-1.13-2.97 0-4.1l.07-.07a2 2 0 0 0 0-2.83 2 2 0 0 0-2.83 0l-.07.07c-1.13 1.13-2.97 1.13-4.1 0L11.48 2.3"/>`,
  palette: `<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2a10 10 0 1 0 0 20 4 4 0 0 1 0-8 4 4 0 0 0 0-8 10 10 0 0 0 0-4z"/>`,
  microscope: `<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>`,
  checkCircle: `<circle cx="12" cy="12" r="10"/><polyline points="9 12 12 15 16 10"/>`,
  alertTriangle: `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
  play: `<polygon points="6 3 20 12 6 21 6 3"/>`,
  eye: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
  circle: `<circle cx="12" cy="12" r="9"/>`,
  clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
  x: `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
};

function icon(name, options = {}) {
  const path = ICONS[name];
  if (!path) return "";
  const size = options.size || "";
  const classes = ["icon"];
  if (size) classes.push(size);
  if (options.className) classes.push(options.className);
  return `<svg class="${classes.join(" ")}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

const ROLE_THEMES = {
  Builder: { icon: "hammer", className: "role-builder" },
  Designer: { icon: "palette", className: "role-designer" },
  Researcher: { icon: "microscope", className: "role-researcher" },
};

const COLUMN_THEMES = {
  todo: { icon: "circle", label: "Todo" },
  doing: { icon: "play", label: "Doing" },
  review: { icon: "eye", label: "Review" },
  done: { icon: "checkCircle", label: "Done" },
};

const GLOSSARY_TERMS = [
  {
    term: "Scope",
    definition: "The work the project promises to finish.",
    example: "For the booth, scope includes the filter, poster, practice, and cleanup.",
  },
  {
    term: "Risk",
    definition: "Something that might happen and make the project harder.",
    example: "Late supplies are a risk because they can slow down building.",
  },
  {
    term: "Dependency",
    definition: "Work that must be finished before another task can start.",
    example: "The team needs test results before practicing the final presentation.",
  },
  {
    term: "Stakeholder",
    definition: "A person who cares about the project result.",
    example: "The sponsor, judge, teammates, and audience are stakeholders.",
  },
  {
    term: "Quality",
    definition: "How well the project works and how easy it is to understand.",
    example: "A clear chart and a leak-free filter improve quality.",
  },
  {
    term: "Budget",
    definition: "The money available for project choices.",
    example: "Coins spent on supplies leave fewer coins for surprises.",
  },
  {
    term: "Morale",
    definition: "How the team feels while doing the work.",
    example: "Too much overtime can lower morale, even when tasks move faster.",
  },
];

function hydrateStaticIcons() {
  document.querySelectorAll("[data-icon]").forEach((node) => {
    const name = node.dataset.icon;
    if (!name) return;
    node.innerHTML = icon(name);
  });
}

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
  risks: [
    {
      id: "supplier-backup",
      title: "Supplies might arrive late",
      description: "Reserve backup materials before the team needs them.",
      eventId: "supplier-delay",
      cost: 8,
      response: {
        label: "Backup supplies ready",
        outcome: "Your backup materials softened the supplier delay.",
        effects: { trust: 5, quality: 4 },
      },
    },
    {
      id: "team-coverage",
      title: "A teammate might be unavailable",
      description: "Cross-train the team so one person can cover another task.",
      eventId: "team-sick",
      cost: 6,
      response: {
        label: "Coverage plan used",
        outcome: "The cross-training plan helped the team absorb the absence.",
        effects: { morale: 7, trust: 3 },
      },
    },
    {
      id: "presentation-review",
      title: "The booth message might be unclear",
      description: "Schedule a quick review before the judge sees the booth.",
      eventId: "judge-clarity",
      cost: 4,
      response: {
        label: "Early review helped",
        outcome: "Your early review made the judge feedback easier to handle.",
        effects: { quality: 8, trust: 3 },
      },
    },
    {
      id: "weather-plan",
      title: "Rain might affect transport",
      description: "Pack labels and covers so booth parts survive the trip.",
      eventId: "weather-risk",
      cost: 5,
      response: {
        label: "Transport plan ready",
        outcome: "The packing plan protected the booth materials from rain.",
        effects: { quality: 4, morale: 4 },
      },
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
  weekProgress: document.querySelector("#weekProgress"),
  meters: document.querySelector("#meters"),
  starterProgress: document.querySelector("#starterProgress"),
  starterChecklist: document.querySelector("#starterChecklist"),
  teamList: document.querySelector("#teamList"),
  riskList: document.querySelector("#riskList"),
  coachPanel: document.querySelector("#coachPanel"),
  board: document.querySelector("#board"),
  doneCount: document.querySelector("#doneCount"),
  blockedCount: document.querySelector("#blockedCount"),
  activityLog: document.querySelector("#activityLog"),
  savedStatus: document.querySelector("#savedStatus"),
  advanceButton: document.querySelector("#advanceButton"),
  finishButton: document.querySelector("#finishButton"),
  resetButton: document.querySelector("#resetButton"),
  clearLogButton: document.querySelector("#clearLogButton"),
  glossaryButton: document.querySelector("#glossaryButton"),
  glossaryDialog: document.querySelector("#glossaryDialog"),
  glossaryContent: document.querySelector("#glossaryContent"),
  closeGlossaryButton: document.querySelector("#closeGlossaryButton"),
  eventDialog: document.querySelector("#eventDialog"),
  eventType: document.querySelector("#eventType"),
  eventTitle: document.querySelector("#eventTitle"),
  eventBody: document.querySelector("#eventBody"),
  eventChoices: document.querySelector("#eventChoices"),
  scoreDialog: document.querySelector("#scoreDialog"),
  scoreContent: document.querySelector("#scoreContent"),
  playAgainButton: document.querySelector("#playAgainButton"),
  closeScoreButton: document.querySelector("#closeScoreButton"),
  appShell: document.querySelector(".app-shell"),
  toggleActivityButton: document.querySelector("#toggleActivityButton"),
  closeActivityButton: document.querySelector("#closeActivityButton"),
  difficultyButtons: document.querySelectorAll("[data-difficulty]"),
};

function loadUIPrefs() {
  try {
    const raw = window.localStorage.getItem(UI_PREFS_KEY);
    if (!raw) return { activityCollapsed: true, difficulty: "easy" };
    const parsed = JSON.parse(raw);
    const difficulty = parsed.difficulty === "challenge" ? "challenge" : "easy";
    return { activityCollapsed: parsed.activityCollapsed !== false, difficulty };
  } catch {
    return { activityCollapsed: true, difficulty: "easy" };
  }
}

function saveUIPrefs() {
  window.localStorage.setItem(UI_PREFS_KEY, JSON.stringify(uiPrefs));
}

const uiPrefs = loadUIPrefs();

function applyActivityCollapsed() {
  const collapsed = uiPrefs.activityCollapsed;
  els.appShell.classList.toggle("activity-collapsed", collapsed);
  const label = els.toggleActivityButton.querySelector(".toggle-label");
  if (label) label.textContent = collapsed ? "Show Activity" : "Hide Activity";
  els.toggleActivityButton.setAttribute("aria-pressed", String(!collapsed));
  els.toggleActivityButton.setAttribute(
    "aria-label",
    collapsed ? "Show activity panel" : "Hide activity panel",
  );
}

function setActivityCollapsed(collapsed) {
  uiPrefs.activityCollapsed = collapsed;
  saveUIPrefs();
  applyActivityCollapsed();
}

function applyDifficultyMode() {
  els.difficultyButtons.forEach((button) => {
    const selected = button.dataset.difficulty === uiPrefs.difficulty;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function setDifficultyMode(difficulty) {
  uiPrefs.difficulty = difficulty === "challenge" ? "challenge" : "easy";
  saveUIPrefs();
  applyDifficultyMode();
}

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
    mitigatedRisks: [],
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
    return normalizeState(parsed.state);
  } catch {
    return createInitialState();
  }
}

function normalizeState(savedState) {
  const initialState = createInitialState();
  return {
    ...initialState,
    ...savedState,
    teamCapacity: {
      ...initialState.teamCapacity,
      ...(savedState.teamCapacity || {}),
    },
    mitigatedRisks: savedState.mitigatedRisks || [],
    usedEvents: savedState.usedEvents || [],
    log: savedState.log || initialState.log,
    lessons: savedState.lessons || [],
  };
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

function riskByEvent(eventId) {
  return scenario.risks.find((risk) => risk.eventId === eventId);
}

function hasMitigatedRisk(riskId) {
  return state.mitigatedRisks.includes(riskId);
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

  renderWeekProgress();
  renderMeters();
  renderStarterChecklist();
  renderTeam();
  renderRisks();
  renderCoachPanel();
  renderBoard();
  renderLog();
  saveState();
}

function renderWeekProgress() {
  if (!els.weekProgress) return;
  const total = scenario.deadlineWeeks;
  const dots = [];
  for (let i = 1; i <= total; i++) {
    let cls = "week-dot";
    if (i < state.week) cls += " done";
    else if (i === state.week) cls += " current";
    dots.push(`<span class="${cls}" title="Week ${i}"></span>`);
  }
  els.weekProgress.innerHTML = dots.join("");
}

function renderRisks() {
  els.riskList.innerHTML = scenario.risks
    .map((risk) => {
      const mitigated = hasMitigatedRisk(risk.id);
      const canAfford = moneyRemaining() >= risk.cost;
      const iconName = mitigated ? "checkCircle" : "shieldAlert";
      const effects = risk.response?.effects || {};
      const benefitTags = Object.entries(effects)
        .filter(([, value]) => value > 0)
        .map(
          ([key, value]) =>
            `<span class="tag benefit" title="If the risk happens, you gain +${value} ${key}">+${value} ${key}</span>`,
        )
        .join("");
      const benefitRow = !mitigated && benefitTags
        ? `<div class="risk-benefits">${benefitTags}</div>`
        : "";
      return `
        <article class="risk-card ${mitigated ? "mitigated" : ""}">
          <div class="risk-head">
            <span class="risk-icon">${icon(iconName)}</span>
            <div>
              <strong>${risk.title}</strong>
              <p>${risk.description}</p>
              ${benefitRow}
            </div>
          </div>
          <div class="risk-footer">
            <span class="tag coin" title="Cost to plan ahead">${icon("coins", { size: "sm" })}${risk.cost}</span>
            <button
              class="button secondary"
              type="button"
              data-risk="${risk.id}"
              ${mitigated || !canAfford || state.finished ? "disabled" : ""}
            >
              ${mitigated ? icon("checkCircle", { size: "sm" }) + "Planned" : "Mitigate"}
            </button>
          </div>
          ${!mitigated && !canAfford ? `<p class="warning">${icon("alertTriangle", { size: "sm" })}Not enough budget.</p>` : ""}
        </article>
      `;
    })
    .join("");

  scenario.risks.forEach((risk) => {
    const button = document.querySelector(`[data-risk="${risk.id}"]`);
    if (button) {
      button.addEventListener("click", () => mitigateRisk(risk.id));
    }
  });
}

function mitigateRisk(riskId) {
  const risk = scenario.risks.find((candidate) => candidate.id === riskId);
  if (!risk || hasMitigatedRisk(risk.id) || state.finished) return;

  if (moneyRemaining() < risk.cost) {
    addLog(`${risk.title} needs more budget than you have left.`);
    render();
    return;
  }

  state.spent += risk.cost;
  state.mitigatedRisks.push(risk.id);
  state.trust = clamp(state.trust + 2);
  addLog(`${risk.title} mitigated. You spent ${risk.cost} coins to reduce future risk.`);
  render();
}

function renderMeters() {
  const scope = Math.round((completedTasks().length / state.tasks.length) * 100);
  const budgetValue = clamp(Math.round((moneyRemaining() / scenario.budget) * 100));
  const meters = [
    {
      label: "Scope done",
      value: scope,
      detail: `${completedTasks().length}/${state.tasks.length} tasks`,
      className: "scope",
      icon: "target",
    },
    {
      label: "Budget left",
      value: budgetValue,
      detail: `${moneyRemaining()} coins`,
      className: "budget",
      icon: "coins",
    },
    {
      label: "Quality",
      value: state.quality,
      detail: `${state.quality}/100`,
      className: "quality",
      icon: "sparkles",
    },
    {
      label: "Team morale",
      value: state.morale,
      detail: `${state.morale}/100`,
      className: "morale",
      icon: "smile",
    },
    {
      label: "Stakeholder trust",
      value: state.trust,
      detail: `${state.trust}/100`,
      className: "trust",
      icon: "handshake",
    },
  ];

  els.meters.innerHTML = meters
    .map(
      (meter) => `
        <div class="meter">
          <div class="meter-row">
            <span class="meter-label">
              <span class="meter-icon ${meter.className}">${icon(meter.icon, { size: "sm" })}</span>
              ${meter.label}
            </span>
            <span class="meter-value">${meter.detail}</span>
          </div>
          <div class="track" aria-hidden="true">
            <div class="fill ${meter.className}" style="width: ${meter.value}%"></div>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderStarterChecklist() {
  if (!els.starterChecklist || !els.starterProgress) return;
  const items = getStarterChecklistItems();
  const doneCount = items.filter((item) => item.done).length;
  els.starterProgress.textContent = `${doneCount}/${items.length} done`;
  els.starterChecklist.innerHTML = items
    .map(
      (item) => `
        <div class="checklist-item ${item.done ? "done" : ""}">
          <span class="checklist-status">${icon(item.done ? "checkCircle" : item.icon, { size: "sm" })}</span>
          <div>
            <strong>${item.title}</strong>
            <p>${item.detail}</p>
          </div>
        </div>
      `,
    )
    .join("");
}

function getStarterChecklistItems() {
  const hasAssignedTask = state.tasks.some((task) => task.assignee);
  const hasStartedTask = state.tasks.some((task) => task.status !== "todo");
  const hasMitigatedRisk = state.mitigatedRisks.length > 0;
  const hasReviewedWork = completedTasks().length > 0;
  const hasAdvancedWeek = state.week > 1;

  return [
    {
      done: hasAssignedTask,
      icon: "users",
      title: "Assign a teammate",
      detail: "Pick someone for an unblocked task so work has a clear owner.",
    },
    {
      done: hasStartedTask,
      icon: "play",
      title: "Start one task",
      detail: "Spend the task budget and capacity when the assignment looks right.",
    },
    {
      done: hasMitigatedRisk,
      icon: "shieldAlert",
      title: "Plan for one risk",
      detail: "Mitigate a risk before the matching scenario card appears.",
    },
    {
      done: hasReviewedWork,
      icon: "eye",
      title: "Complete reviewed work",
      detail: "Move a task through Doing and Review so it counts toward scope.",
    },
    {
      done: hasAdvancedWeek,
      icon: "arrowRight",
      title: "Advance the week",
      detail: "Refresh team capacity and respond to the next project surprise.",
    },
  ];
}

function renderCoachPanel() {
  if (!els.coachPanel) return;
  const advice = getCoachAdvice();
  const signals = [
    `${completedTasks().length}/${state.tasks.length} tasks done`,
    `${moneyRemaining()} coins left`,
    `Week ${state.week}/${scenario.deadlineWeeks}`,
  ];

  els.coachPanel.className = `coach-panel ${advice.tone}`;
  els.coachPanel.innerHTML = `
    <div class="coach-main">
      <span class="coach-icon">${icon(advice.icon)}</span>
      <div>
        <p class="eyebrow">Coach</p>
        <strong>${advice.title}</strong>
        <p>${advice.body}</p>
      </div>
    </div>
    <div class="coach-signals" aria-label="Project signals">
      ${signals.map((signal) => `<span>${signal}</span>`).join("")}
    </div>
  `;
}

function getCoachAdvice() {
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
      dependenciesDone(task) &&
      moneyRemaining() >= task.cost,
  );
  if (startableTask) {
    const assignee = memberById(startableTask.assignee);
    return {
      icon: "play",
      tone: "info",
      title: "Start the assigned task",
      body: `${startableTask.title} is ready for ${assignee ? assignee.name : "the team"}. Start it when you want to spend the effort and budget.`,
    };
  }

  const readyTask = state.tasks.find(
    (task) => task.status === "todo" && dependenciesDone(task) && moneyRemaining() >= task.cost,
  );
  if (readyTask) {
    const suggested = bestAssigneeForTask(readyTask);
    return {
      icon: "users",
      tone: "info",
      title: "Assign the next task",
      body: `${readyTask.title} is unblocked. ${suggested.name} is the best fit right now based on skill and capacity.`,
    };
  }

  const blockedTask = state.tasks.find(
    (task) => task.status === "todo" && !dependenciesDone(task),
  );
  if (blockedTask) {
    const dependency = blockedTask.dependsOn
      .map((dependencyId) => getTask(dependencyId))
      .find((task) => task && task.status !== "done");
    return {
      icon: "alertTriangle",
      tone: "warning",
      title: "Clear a dependency",
      body: `${blockedTask.title} is waiting on ${dependency ? dependency.title : "another task"}. Finish the prerequisite first.`,
    };
  }

  if (moneyRemaining() < 15) {
    return {
      icon: "coins",
      tone: "warning",
      title: "Protect the remaining budget",
      body: "Money is tight. Prioritize no-cost work, review risky spending, and avoid optional extras.",
    };
  }

  const affordableRisk = scenario.risks.find(
    (risk) => !hasMitigatedRisk(risk.id) && moneyRemaining() >= risk.cost,
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

function bestAssigneeForTask(task) {
  return scenario.team
    .map((member) => {
      const skillScore = member.skills.includes(task.skill) ? 10 : 0;
      const capacityScore = state.teamCapacity[member.id] >= task.effort ? 4 : 0;
      return { member, score: skillScore + capacityScore + state.teamCapacity[member.id] };
    })
    .sort((a, b) => b.score - a.score)[0].member;
}

function renderTeam() {
  els.teamList.innerHTML = scenario.team
    .map((member) => {
      const remaining = state.teamCapacity[member.id];
      const theme = ROLE_THEMES[member.role] || { icon: "users", className: "" };
      const pct = Math.max(0, Math.round((remaining / member.capacity) * 100));
      const initial = member.name.charAt(0).toUpperCase();
      return `
        <article class="team-card ${theme.className}">
          <div class="team-avatar ${theme.className}">${initial}</div>
          <div class="team-body">
            <strong>${member.name}</strong>
            <span class="team-role ${theme.className}">
              <span class="role-icon">${icon(theme.icon, { size: "sm" })}</span>
              ${member.role}
            </span>
            <div class="capacity-meter">
              <div class="capacity-track" aria-hidden="true">
                <div class="capacity-fill" style="width: ${pct}%"></div>
              </div>
              <span class="capacity-label">${remaining}/${member.capacity}</span>
            </div>
            <div class="tag-row">
              ${member.skills.map((skill) => `<span class="tag skill">${skill}</span>`).join("")}
            </div>
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

  els.doneCount.innerHTML = `${icon("checkCircle", { size: "sm" })}${completedTasks().length} done`;
  els.blockedCount.innerHTML = `${icon("alertTriangle", { size: "sm" })}${blockedCount} blocked`;

  els.board.innerHTML = columns
    .map((column) => {
      const tasks = state.tasks.filter((task) => task.status === column.id);
      const theme = COLUMN_THEMES[column.id] || { icon: "circle" };
      return `
        <section class="column" data-status="${column.id}" aria-label="${column.title}">
          <div class="column-header">
            <span class="column-title">
              <span class="status-icon">${icon(theme.icon, { size: "sm" })}</span>
              ${column.title}
            </span>
            <span class="column-count">${tasks.length}</span>
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
        render();
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
  const cardClasses = ["task-card", `status-${task.status}`];
  if (isBlocked) cardClasses.push("blocked");

  return `
    <article class="${cardClasses.join(" ")}">
      <div>
        <h3>${task.title}</h3>
        <div class="task-meta">
          <span class="tag effort" title="Effort: ${task.effort} capacity used">${icon("zap", { size: "sm" })}${task.effort} effort</span>
          <span class="tag coin" title="Cost: ${task.cost} coins from the budget">${icon("coins", { size: "sm" })}${task.cost}</span>
          <span class="tag skill" title="Skill needed: ${task.skill}. Teammates with this skill do better work.">${icon("wrench", { size: "sm" })}${task.skill}</span>
        </div>
      </div>
      ${isBlocked ? `<p class="warning">${icon("alertTriangle", { size: "sm" })}Blocked by: ${blockedNames.join(", ")}</p>` : ""}
      ${task.status !== "done" ? renderTaskActions(task, actionLabel, assignee) : renderDoneTask(task, assignee)}
    </article>
  `;
}

function renderTaskActions(task, actionLabel, assignee) {
  const isTodo = task.status === "todo";
  const noAssignee = isTodo && !task.assignee;
  const blockedByDeps = isTodo && !dependenciesDone(task);
  const overBudget = isTodo && moneyRemaining() < task.cost;
  const disableStart = isTodo && (blockedByDeps || overBudget || noAssignee);
  const buttonVariant = task.status === "review" ? "success" : "primary";
  const buttonIcon = getActionIcon(task);

  const budgetWarning = overBudget
    ? `<p class="warning">${icon("alertTriangle", { size: "sm" })}Not enough budget for this task.</p>`
    : "";
  const assigneeHint = isTodo && noAssignee && !blockedByDeps && !overBudget
    ? `<p class="hint muted">${icon("users", { size: "sm" })}Pick a teammate to start this task.</p>`
    : "";
  const matchHint = isTodo && assignee ? renderAssignmentHint(task, assignee) : "";

  return `
    <div class="task-actions">
      ${
        isTodo
          ? `
            <select data-assignee="${task.id}" aria-label="Assign ${task.title}">
              <option value="">Assign teammate…</option>
              ${scenario.team
                .map((member) => {
                  const fit = member.skills.includes(task.skill) ? "✓ fit" : "stretch";
                  const cap = state.teamCapacity[member.id];
                  const overload = cap < task.effort ? " · over capacity" : "";
                  return `
                    <option value="${member.id}" ${task.assignee === member.id ? "selected" : ""}>
                      ${member.name} · ${cap}/${member.capacity} left · ${fit}${overload}
                    </option>
                  `;
                })
                .join("")}
            </select>
          `
          : `<span class="muted">Assigned to ${assignee ? assignee.name : "the team"}</span>`
      }
      ${assigneeHint}
      ${matchHint}
      ${budgetWarning}
      <button
        class="button ${buttonVariant}"
        type="button"
        data-action="${task.id}"
        ${disableStart || state.finished ? "disabled" : ""}
      >
        ${icon(buttonIcon, { size: "sm" })}${actionLabel}
      </button>
    </div>
  `;
}

function renderAssignmentHint(task, assignee) {
  const cap = state.teamCapacity[assignee.id];
  const overloaded = cap < task.effort;
  const skillMatch = assignee.skills.includes(task.skill);
  const parts = [];

  if (overloaded) {
    parts.push(
      `<span class="hint warn">${icon("alertTriangle", { size: "sm" })}Needs ${task.effort}, only ${cap} left — will overload ${assignee.name} (−morale, −quality)</span>`,
    );
  } else {
    parts.push(
      `<span class="hint ok">${icon("checkCircle", { size: "sm" })}Uses ${task.effort} of ${cap} capacity</span>`,
    );
  }

  if (skillMatch) {
    parts.push(
      `<span class="hint ok">${icon("sparkles", { size: "sm" })}${assignee.name} is strong at ${task.skill}</span>`,
    );
  } else {
    parts.push(
      `<span class="hint warn">${icon("alertTriangle", { size: "sm" })}${task.skill} is not ${assignee.name}'s strength (−morale)</span>`,
    );
  }

  return `<div class="hint-stack">${parts.join("")}</div>`;
}

function renderDoneTask(task, assignee) {
  return `<span class="muted">${icon("checkCircle", { size: "sm" })} Completed in week ${task.completedWeek} by ${assignee ? assignee.name : "the team"}.</span>`;
}

function getActionLabel(task) {
  if (task.status === "todo") return "Start Task";
  if (task.status === "doing") return "Move to Review";
  if (task.status === "review") return "Complete Task";
  return "Done";
}

function getActionIcon(task) {
  if (task.status === "todo") return "play";
  if (task.status === "doing") return "eye";
  if (task.status === "review") return "checkCircle";
  return "checkCircle";
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

  const risk = riskByEvent(event.id);
  const prepared = risk && hasMitigatedRisk(risk.id);

  els.eventType.innerHTML = `${icon("lightbulb", { size: "sm" })}Scenario card · Week ${state.week}`;
  els.eventTitle.textContent = event.title;
  els.eventBody.textContent = prepared
    ? `${event.body} Your risk register has a response ready: ${risk.response.label}.`
    : event.body;
  els.eventChoices.innerHTML = event.choices
    .map(
      (choice, index) => `
        <button class="choice-card" type="button" data-choice="${index}" aria-keyshortcuts="${index + 1}">
          <span class="choice-badge">${index + 1}</span>
          <span>
            <strong>${choice.label}</strong>
            <span>${choice.outcome}</span>
            ${renderEffectChips(choice.effects)}
          </span>
        </button>
      `,
    )
    .join("");

  els.eventChoices.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => chooseEvent(Number(button.dataset.choice)));
  });

  els.eventDialog.showModal();
}

function renderEffectChips(effects = {}) {
  const chips = Object.entries(effects)
    .filter(([, value]) => value !== 0)
    .map(([key, value]) => {
      const effect = formatEffect(key, value);
      return `<span class="effect-chip ${effect.tone}">${effect.label}</span>`;
    });
  return chips.length ? `<span class="effect-row">${chips.join("")}</span>` : "";
}

function formatEffect(key, value) {
  if (uiPrefs.difficulty === "challenge") {
    return formatChallengeEffect(key, value);
  }

  if (key === "spent") {
    return {
      label: value > 0 ? `-${value} coins` : `+${Math.abs(value)} coins`,
      tone: value > 0 ? "negative" : "positive",
    };
  }

  const labels = {
    quality: "quality",
    morale: "morale",
    trust: "trust",
  };
  const label = labels[key] || key;
  return {
    label: `${value > 0 ? "+" : ""}${value} ${label}`,
    tone: value > 0 ? "positive" : "negative",
  };
}

function formatChallengeEffect(key, value) {
  if (key === "spent") {
    return {
      label: value > 0 ? "costs coins" : "saves coins",
      tone: value > 0 ? "negative" : "positive",
    };
  }

  const labels = {
    quality: "quality",
    morale: "morale",
    trust: "trust",
  };
  const label = labels[key] || key;
  return {
    label: value > 0 ? `helps ${label}` : `hurts ${label}`,
    tone: value > 0 ? "positive" : "negative",
  };
}

function chooseEvent(choiceIndex) {
  const event = scenario.events.find((candidate) => candidate.id === state.activeEvent);
  if (!event) return;
  const choice = event.choices[choiceIndex];
  const risk = riskByEvent(event.id);
  const prepared = risk && hasMitigatedRisk(risk.id);

  applyEffects(choice.effects);
  if (prepared) {
    applyEffects(risk.response.effects);
  }
  state.usedEvents.push(event.id);
  state.activeEvent = null;
  state.lessons.unshift(choice.lesson);
  if (prepared) {
    state.lessons.unshift("Risk responses work best when they are planned before the problem happens.");
  }
  state.lessons = state.lessons.slice(0, 6);

  addLog(`${event.title}: ${choice.outcome}`);
  if (prepared) {
    addLog(`${risk.response.label}: ${risk.response.outcome}`);
  }
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
  const mitigatedCount = state.mitigatedRisks.length;

  const scoreCards = [
    { label: "Scope", value: `${scope}%`, icon: "target", variant: "" },
    { label: "Deadline", value: deadlineText, icon: "calendar", variant: "info" },
    { label: "Budget left", value: `${budget} coins`, icon: "coins", variant: "success" },
    { label: "Quality", value: `${state.quality}/100`, icon: "sparkles", variant: "purple" },
    { label: "Team morale", value: `${state.morale}/100`, icon: "smile", variant: "warning" },
    { label: "Stakeholder trust", value: `${state.trust}/100`, icon: "handshake", variant: "info" },
    { label: "Risks mitigated", value: `${mitigatedCount}/${scenario.risks.length}`, icon: "shieldAlert", variant: "accent" },
  ];

  els.scoreContent.innerHTML = `
    <p class="muted">${outcome}</p>
    <div class="score-grid">
      ${scoreCards
        .map(
          (card) => `
            <div class="score-card ${card.variant}">
              <span class="score-icon">${icon(card.icon)}</span>
              <div>
                <span>${card.label}</span>
                <strong>${card.value}</strong>
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
    <h3>Retrospective</h3>
    <ol class="retro-list">
      <li>${icon("trophy", { size: "sm" })}<span>${bestResult(scope, budget)}</span></li>
      <li>${icon("shieldAlert", { size: "sm" })}<span>${riskResult()}</span></li>
      <li>${icon("lightbulb", { size: "sm" })}<span>${lessons[0]}</span></li>
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

function renderGlossary() {
  els.glossaryContent.innerHTML = GLOSSARY_TERMS.map(
    (item) => `
      <article class="glossary-card">
        <strong>${item.term}</strong>
        <p>${item.definition}</p>
        <span>${item.example}</span>
      </article>
    `,
  ).join("");
}

function openGlossary() {
  renderGlossary();
  els.glossaryDialog.showModal();
}

function handleKeyboardShortcuts(event) {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName)) return;

  if (els.eventDialog.open) {
    const choiceIndex = Number(event.key) - 1;
    const choiceButton = els.eventChoices.querySelector(`[data-choice="${choiceIndex}"]`);
    if (choiceButton) {
      event.preventDefault();
      choiceButton.click();
    }
    return;
  }

  if (els.glossaryDialog.open || els.scoreDialog.open) return;

  const key = event.key.toLowerCase();
  if (key === "g") {
    event.preventDefault();
    openGlossary();
  } else if (key === "a") {
    event.preventDefault();
    setActivityCollapsed(!uiPrefs.activityCollapsed);
  } else if (key === "n" && !els.advanceButton.disabled) {
    event.preventDefault();
    advanceWeek();
  }
}

function hasProgress() {
  if (state.week > 1 || state.spent > 0 || state.mitigatedRisks.length > 0) return true;
  return state.tasks.some((task) => task.status !== "todo");
}

function resetGame() {
  if (hasProgress() && !state.finished) {
    const ok = window.confirm(
      "Reset the project? Your current week, board, and decisions will be cleared. The project starts fresh from week 1.",
    );
    if (!ok) return;
  }
  state = createInitialState();
  els.scoreDialog.close();
  if (els.eventDialog.open) {
    els.eventDialog.close();
  }
  render();
}

function confirmFinish() {
  if (state.finished) {
    finishProject();
    return;
  }
  const remaining = state.tasks.filter((task) => task.status !== "done").length;
  if (remaining === 0) {
    finishProject();
    return;
  }
  const ok = window.confirm(
    `Finish the project now? ${remaining} task${remaining === 1 ? "" : "s"} are still not done — the scorecard will lock in your current results.`,
  );
  if (ok) finishProject();
}

els.advanceButton.addEventListener("click", advanceWeek);
els.finishButton.addEventListener("click", confirmFinish);
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
els.glossaryButton.addEventListener("click", openGlossary);
els.closeGlossaryButton.addEventListener("click", () => els.glossaryDialog.close());
els.difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setDifficultyMode(button.dataset.difficulty);
  });
});
els.toggleActivityButton.addEventListener("click", () => {
  setActivityCollapsed(!uiPrefs.activityCollapsed);
});
els.closeActivityButton.addEventListener("click", () => {
  setActivityCollapsed(true);
});
document.addEventListener("keydown", handleKeyboardShortcuts);

hydrateStaticIcons();
applyActivityCollapsed();
applyDifficultyMode();
render();

if (state.activeEvent) {
  const event = scenario.events.find((candidate) => candidate.id === state.activeEvent);
  if (event) {
    showEvent(event);
  }
}

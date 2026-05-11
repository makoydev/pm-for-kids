# PM for Kids Product Plan

## 1. Vision

PM for Kids is a browser-based learning game where kids act as the project manager for small, relatable projects. They plan work, manage a simple task board, spend a budget, react to surprises, and learn why project decisions have tradeoffs.

The app should feel like a playable simulator, not a lecture. Kids should learn project management by making choices, seeing consequences, and getting a short explanation after each outcome.

## 2. Target Users

- Primary: kids ages 9-14 who can read independently and enjoy management, building, or strategy games.
- Secondary: parents, teachers, and mentors who want a guided way to introduce planning, teamwork, and decision-making.
- Optional later audience: teens who want a lightweight intro to Agile, Scrum, Kanban, and PMP-style thinking.

## 3. Core Learning Outcomes

Kids should be able to:

- Break a goal into smaller tasks.
- Understand scope, schedule, budget, quality, and team capacity.
- Prioritize when everything cannot be done at once.
- React to risks, blockers, delays, and changing requirements.
- Communicate with stakeholders instead of silently absorbing problems.
- Make tradeoffs between speed, cost, quality, and team morale.
- Learn from a retrospective after the project ends.

## 4. Product Shape

The best first version is a single-player project simulation with a friendly UI:

- A simple Jira-style board with `Todo`, `Doing`, `Review`, and `Done`.
- A budget tracker using coins or dollars.
- A timeline with weeks or days remaining.
- A team panel showing capacity, morale, and skills.
- Scenario cards that interrupt the plan with real PM decisions.
- A final scorecard showing delivery, budget, quality, stakeholder happiness, and what the player learned.

## 5. Core Game Loop

1. Pick a project scenario, such as a school fair booth, birthday party, mini game launch, class garden, charity bake sale, or robot demo.
2. Review the project goal, deadline, budget, team, and stakeholder expectations.
3. Choose tasks from a backlog and place them on the board.
4. Assign tasks to team members based on skill and capacity.
5. Advance time by one day or one week.
6. Respond to event cards, blockers, scope changes, risks, and team issues.
7. Continue until the deadline or project completion.
8. Review the outcome and get a kid-friendly PM lesson.

## 6. Essential Features

### Task Board

The board is the main workspace. Each card should include:

- Task name.
- Effort estimate.
- Cost estimate.
- Skill needed.
- Quality impact.
- Dependencies, if any.
- Status.

For kids, task cards should use simple labels like `Small`, `Medium`, and `Big` before introducing story points or hours.

### Budget

Budget should be simple and visual:

- Starting budget.
- Money spent.
- Money reserved.
- Emergency funds.
- Budget warning when the player is close to running out.

Budget choices should create tradeoffs. For example, buying better tools may cost more now but reduce delay risk later.

### Team Capacity

Each team member can have:

- Name and role.
- Skills.
- Weekly capacity.
- Morale.
- Current assignment.

The goal is to teach that people are not infinite resources. Overloading the team should reduce morale or quality.

### Scenario Engine

Scenario cards are the heart of the app. Each card should present:

- What happened.
- Why it matters.
- Two to four possible PM actions.
- Immediate outcome.
- Longer-term effect on budget, time, quality, morale, or stakeholder trust.
- A short learning note after the choice.

Example:

**Engineering team will be delayed by 1 week. What should the PM do?**

Choices:

- Tell the sponsor early, re-plan scope, and protect the most important features.
- Ask the team to work overtime.
- Ignore it and hope the team catches up.
- Move budget from decorations to hire temporary help.

Possible outcomes:

- Early communication improves trust but may reduce scope.
- Overtime helps schedule but hurts morale and quality risk.
- Ignoring the delay damages stakeholder trust and may miss the deadline.
- Extra help costs money and may create onboarding delay.

### Stakeholders

Add simple stakeholder characters:

- Sponsor: cares about budget and deadline.
- Customer: cares about useful features.
- Team: cares about fair workload and clear priorities.
- Teacher or parent: cares about learning, safety, and teamwork.

This teaches kids that project success is not only finishing tasks.

### Retrospective

After each project, show:

- What went well.
- What went wrong.
- Best PM decision.
- Most expensive decision.
- Biggest risk.
- One concept learned.
- One challenge for next time.

The retrospective should be short and specific. It should explain cause and effect instead of only giving a score.

## 7. Features You Had Not Mentioned But Should Add

- **Age-appropriate scaffolding:** Start with simple language, then unlock terms like scope, risk, backlog, sprint, estimate, dependency, and stakeholder.
- **Difficulty levels:** Easy mode can show hints; hard mode can hide exact outcomes and make estimates less certain.
- **Risk register:** Let kids list risks before they happen, then reward preparation.
- **Dependencies:** Teach that some tasks cannot start until another task is done.
- **Quality meter:** Delivering fast and cheap should not always mean delivering well.
- **Morale meter:** Team pressure should have consequences.
- **Communication choices:** Include status updates, stakeholder conversations, escalation, and expectation setting.
- **Ethical choices:** Do not reward hiding problems, blaming teammates, or cutting safety-critical work.
- **Parent/teacher dashboard:** Show completed scenarios, concepts learned, and suggested discussion questions.
- **Content authoring format:** Store projects and events in JSON so new scenarios can be added without rewriting app logic.
- **Accessibility:** Large readable text, keyboard support, colorblind-safe status indicators, reduced motion mode, and plain-language summaries.
- **Privacy:** Avoid collecting personal data from kids. Prefer local progress for the MVP.
- **Replayability:** Randomize events and let different strategies produce different outcomes.
- **Glossary:** Keep a simple PM dictionary with kid-friendly examples.
- **Hints and coaching:** Add optional mentor hints before tough decisions.

## 8. MVP Scope

The first usable MVP should include:

- One complete project scenario.
- One task board.
- One simple team of three members.
- Budget, time, quality, morale, and stakeholder trust meters.
- At least 15 scenario cards.
- A final scorecard and retrospective.
- Local browser storage for progress.
- JSON-based scenario data.

Recommended first scenario: **School Science Fair Booth**.

Why this scenario works:

- Kids understand the setting.
- It has a deadline.
- It has physical and creative tasks.
- It naturally includes budget, supplies, teamwork, quality, and presentation risk.

## 9. First Scenario Example

Project: School Science Fair Booth

Goal: Build and present a booth about clean water filtration.

Deadline: 4 weeks.

Budget: 100 coins.

Team:

- Alex: strong at building, medium capacity.
- Sam: strong at art and presentation, low capacity.
- Riley: strong at research, high capacity.

Starter backlog:

- Pick project topic.
- Research water filters.
- Buy supplies.
- Build filter prototype.
- Test the prototype.
- Create poster.
- Practice presentation.
- Make backup supplies list.
- Clean up booth.

Example event cards:

- Supplies cost more than expected.
- Prototype leaks during testing.
- A team member is sick for one week.
- Sponsor asks for a bigger poster.
- Presentation judge wants clearer results.
- The team is tired after too much overtime.
- A cheaper material is available but may lower quality.

## 10. Scoring Model

Avoid one single score. Use multiple outcome meters:

- Delivered scope.
- Deadline health.
- Budget health.
- Quality.
- Team morale.
- Stakeholder trust.
- Learning points.

The app should allow partial success. A kid can miss budget but still learn good communication, or deliver less scope while protecting quality and morale.

## 11. Content Model Draft

Project scenarios can be defined with data like:

```json
{
  "id": "science-fair-booth",
  "title": "School Science Fair Booth",
  "deadlineWeeks": 4,
  "budget": 100,
  "team": [
    {
      "id": "alex",
      "name": "Alex",
      "skills": ["build"],
      "capacity": 3
    }
  ],
  "tasks": [
    {
      "id": "build-prototype",
      "title": "Build filter prototype",
      "effort": 3,
      "cost": 20,
      "skill": "build",
      "dependsOn": ["buy-supplies"],
      "qualityImpact": 20
    }
  ],
  "events": [
    {
      "id": "prototype-leaks",
      "trigger": "after-task:build-prototype",
      "title": "The prototype leaks",
      "choices": [
        {
          "label": "Pause and fix the leak",
          "effects": {
            "time": -1,
            "quality": 15,
            "trust": 5
          }
        }
      ]
    }
  ]
}
```

## 12. Suggested Web App Architecture

For the initial web app:

- Frontend-only first, using local storage for progress.
- Scenario content stored in versioned JSON files.
- Game engine as pure functions so outcomes are testable.
- UI components separated from scenario rules.
- Later backend only if accounts, classrooms, shared progress, or teacher dashboards become necessary.

Likely stack:

- Next.js or Vite + React.
- TypeScript.
- Tailwind CSS or a lightweight component system.
- Vitest for game engine tests.
- Playwright for critical user flows once the UI exists.

## 13. Product Principles

- Teach through consequences, not lectures.
- Reward communication and ethical project behavior.
- Make tradeoffs visible.
- Keep language concrete and kid-friendly.
- Make failure recoverable.
- Let kids replay and improve.
- Keep sessions short: 10-15 minutes for one project run.

## 14. Roadmap

### Phase 1: Documentation and Prototype

- Product plan.
- Scenario data shape.
- One playable scenario.
- Static UI mock or rough interactive prototype.

### Phase 2: MVP

- Full task board.
- Budget, time, quality, morale, and trust meters.
- Scenario event engine.
- Final scorecard.
- Local progress.

### Phase 3: Learning Depth

- More projects.
- Difficulty levels.
- Glossary.
- Hints.
- Risk register.
- Retrospective improvements.

### Phase 4: Parent and Teacher Support

- Parent/teacher dashboard.
- Classroom mode.
- Discussion prompts.
- Printable summary.

### Phase 5: Advanced PM Concepts

- Agile sprint mode.
- Waterfall mode.
- Procurement choices.
- Earned value style simplified metrics.
- Stakeholder map.
- Portfolio of multiple projects.

## 15. Open Questions

- What exact age range should the MVP optimize for: 8-10, 10-12, or 12-14?
- Should the tone be more like a game, classroom tool, or productivity app?
- Should scenarios be realistic school/life projects only, or include fantasy/game-world projects?
- Should the first version require login, or stay fully local?
- Should the app teach PMP vocabulary directly, or introduce vocabulary gradually after kids understand the concept?

## 16. Recommended Next Build Step

Build the first interactive prototype around the School Science Fair Booth scenario. The prototype should prove the main loop:

1. View backlog and team.
2. Move tasks across the board.
3. Spend budget.
4. Advance one week.
5. Respond to an event card.
6. See meters change.
7. Finish with a scorecard and retrospective.


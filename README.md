# PM for Kids

A web app concept for teaching project management to kids through short, game-like project simulations.

## Current App

The app is now a Vite + React + TypeScript project:

- Run `npm install`.
- Run `npm run dev` for local development.
- Run `npm run build` for a production build.
- Run `npm test` for unit and component tests.
- Run `npm run lint` for static checks.

The playable project simulation lets kids:

- Manage the School Science Fair Booth project.
- Switch between JSON-authored project scenarios, including the Birthday Party Plan and Class Garden Build.
- Move tasks through `Todo`, `Doing`, `Review`, and `Done`.
- Assign teammates based on capacity and skills.
- Mitigate risks before matching scenario cards appear.
- Watch budget, scope, quality, morale, and stakeholder trust.
- Use the coach panel for the next suggested action and current project signals.
- Compare scenario choice tradeoffs with effect chips before deciding.
- Advance weeks and respond to PM scenario cards.
- Finish the project to see a scorecard and retrospective.

Progress is stored in local browser storage.

## Project Structure

- `src/App.tsx` wires the app shell and top-level interactions.
- `src/components/` contains React UI components.
- `src/data/` contains typed scenario and glossary content.
- `src/data/scenarios/` contains JSON scenario files.
- `src/game/` contains domain types and pure game rules.
- `src/hooks/` contains React state and persistence hooks.
- `src/test/` contains shared test setup.

## Documentation

Start with the product plan:

- [Product Plan](docs/product-plan.md)
- [Feature Checklist](docs/feature-checklist.md)
- [UX Review Notes](docs/ux-review.md)

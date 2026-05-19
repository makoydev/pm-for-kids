import { describe, expect, it } from "vitest";

import { scenario } from "../data/scenario";
import { scenarios } from "../data/scenario";
import {
  advanceTask,
  advanceWeek,
  assignTask,
  chooseEvent,
  completedTasks,
  createInitialState,
  mitigateRisk,
  moneyRemaining,
} from "./rules";

describe("game rules", () => {
  it("creates a fresh project state from scenario data", () => {
    const state = createInitialState(scenario);

    expect(state.week).toBe(1);
    expect(state.spent).toBe(0);
    expect(state.tasks).toHaveLength(scenario.tasks.length);
    expect(state.teamCapacity.alex).toBe(4);
  });

  it("starts and completes a task through the board", () => {
    let state = createInitialState(scenario);
    state = assignTask(state, "pick-topic", "riley");
    state = advanceTask(scenario, state, "pick-topic");
    state = advanceTask(scenario, state, "pick-topic");
    state = advanceTask(scenario, state, "pick-topic");

    expect(completedTasks(state)).toHaveLength(1);
    expect(state.teamCapacity.riley).toBe(4);
    expect(state.quality).toBeGreaterThan(45);
  });

  it("applies mitigated risk benefits when the matching event appears", () => {
    let state = createInitialState(scenario);
    state = mitigateRisk(scenario, state, "supplier-backup");
    state = advanceWeek(scenario, state, () => scenario.events.find((event) => event.id === "supplier-delay") ?? null);

    expect(state.activeEvent).toBe("supplier-delay");

    state = chooseEvent(scenario, state, 0);

    expect(state.activeEvent).toBeNull();
    expect(state.trust).toBe(81);
    expect(state.quality).toBe(49);
    expect(moneyRemaining(scenario, state)).toBe(92);
  });

  it("loads multiple JSON-backed scenarios", () => {
    expect(scenarios.map((item) => item.id)).toEqual([
      "science-fair-booth",
      "birthday-party",
      "class-garden",
    ]);
    expect(scenarios[1].tasks.some((task) => task.id === "pick-theme")).toBe(true);
    expect(scenarios[2].tasks.some((task) => task.id === "choose-location")).toBe(true);
  });
});

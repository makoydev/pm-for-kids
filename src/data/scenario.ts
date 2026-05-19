import scienceFairBooth from "./scenarios/science-fair-booth.json";
import birthdayParty from "./scenarios/birthday-party.json";
import classGarden from "./scenarios/class-garden.json";
import type { Scenario } from "../game/types";

export const scenario = scienceFairBooth as Scenario;
export const scenarios = [scenario, birthdayParty as Scenario, classGarden as Scenario] as Scenario[];

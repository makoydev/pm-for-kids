export type TaskStatus = "todo" | "doing" | "review" | "done";
export type Difficulty = "easy" | "challenge";
export type EffectKey = "spent" | "quality" | "morale" | "trust";
export type Effects = Partial<Record<EffectKey, number>>;

export interface TeamMember {
  id: string;
  name: string;
  role: "Builder" | "Designer" | "Researcher";
  skills: string[];
  capacity: number;
}

export interface ScenarioTask {
  id: string;
  title: string;
  effort: number;
  cost: number;
  skill: string;
  dependsOn: string[];
  qualityImpact: number;
}

export interface ProjectTask extends ScenarioTask {
  status: TaskStatus;
  assignee: string;
  startedWeek: number | null;
  completedWeek: number | null;
}

export interface RiskResponse {
  label: string;
  outcome: string;
  effects: Effects;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  eventId: string;
  cost: number;
  response: RiskResponse;
}

export interface EventChoice {
  label: string;
  outcome: string;
  lesson: string;
  effects: Effects;
}

export interface ScenarioEvent {
  id: string;
  title: string;
  body: string;
  choices: EventChoice[];
}

export interface Scenario {
  id: string;
  title: string;
  goal: string;
  deadlineWeeks: number;
  budget: number;
  team: TeamMember[];
  tasks: ScenarioTask[];
  risks: Risk[];
  events: ScenarioEvent[];
}

export interface GameState {
  week: number;
  spent: number;
  quality: number;
  morale: number;
  trust: number;
  teamCapacity: Record<string, number>;
  tasks: ProjectTask[];
  mitigatedRisks: string[];
  usedEvents: string[];
  activeEvent: string | null;
  log: string[];
  lessons: string[];
  finished: boolean;
}

export interface UIPrefs {
  activityCollapsed: boolean;
  difficulty: Difficulty;
}

export interface ScoreCard {
  label: string;
  value: string;
  icon: string;
  variant?: string;
}

export interface ScoreSummary {
  outcome: string;
  scoreCards: ScoreCard[];
  retrospective: string[];
}

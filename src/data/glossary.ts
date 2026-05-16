export interface GlossaryTerm {
  term: string;
  definition: string;
  example: string;
}

export const glossaryTerms: GlossaryTerm[] = [
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

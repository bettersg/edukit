export type TuteeSummary = {
  index: number;
  name: string;
};

export type TutorMatchSummary = {
  index: number | undefined;
  contactNum: number | undefined;
  matchingScore: number | undefined;
};

export type MatchingList = {
  tutee: TuteeSummary;
  tutorMatches: TutorMatchSummary[];
}[];

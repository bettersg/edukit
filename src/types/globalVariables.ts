export type TuteeSummary = {
  index: number;
  name: string;
};

export type TutorMatchSummary = {
  index: number;
  contactNum: number;
  matchingScore: number;
};

export type MatchingList = {
  tutee: TuteeSummary;
  tutorMatches: TutorMatchSummary[];
}[];

import { TuteeSummary, TutorMatchSummary } from './globalVariables';
import { Tutee, Tutor } from './person';
import { DataFormat } from './dataFormat';

// This state has the contents of the main matching table displayed in the first page (OverviewPage)
export type matchesSummarySlice = {
  tutee: TuteeSummary;
  tutor: TutorMatchSummary[];
}[];

type TutorInfo = Tutor & {
  matchingScore: number;
};

// This state has contents of the table shown in 2nd page (MatchingDetailsPage)
export type selectedTuteeSlice = {
  dataFormat: DataFormat;
  tutee: Tutee;
  tutorInfo: TutorInfo[];
};

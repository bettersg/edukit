import {TuteeData, TutorData, TuteeSummary, TutorMatchSummary} from "./globalVariables"


// This state has the contents of the main matching table displayed in the first page (OverviewPage)
export type matchesSummarySlice = {
    tutee: TuteeSummary,
    tutor: TutorMatchSummary[]
}[]


type TutorInfo = TutorData & {
    matchingScore: number
}


// This state has contents of the table shown in 2nd page (MatchingDetailsPage)
export type selectedTuteeSlice = {
    tutee: TuteeData,
    tutorInfo: TutorInfo[]
}
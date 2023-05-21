export type TutorData = {
    index: number,
    name: string,
    gender: string,
    probonoPref: string,
    teachUnaided: string,
    streamPref: string,
    priSubj: string,
    lowerSecSubj: string,
    upperSecSubj: string,
    jcSubj: string,
    ibSubj: string
}

export type TuteeData = {
    index: number,
    name: string,
    gender: string,
    noGenderPref: string,
    financialAid: string,
    educationLevel: string,
    stream: string,
    subj: string,
    sso: boolean
}

export type TuteeSummary = {
    index: number,
    name: string,
    sso: boolean
}

export type TutorMatchSummary = {
    index: number,
    phoneNum: number,
    matchingScore: number
}


// Key Global variables to be defined
export type TutorRawData = TutorData[]
export type TuteeRawData = TuteeData[]
export type MatchingList = {
    tutee: TuteeSummary,
    tutorMatches: TutorMatchSummary[]
}[]
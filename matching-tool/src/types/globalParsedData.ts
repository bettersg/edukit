import { Tutor, Tutee } from '@/types/person';

// Key Global variables to be defined
export type TutorParsedData = Tutor[];
export type TuteeParsedData = Tutee[];
export type MatchingList = {
  tutee: {
    index: number;
    name: string;
  };
  tutorMatches: {
    index: number;
    phoneNum: number;
    matchingScore: number;
  }[];
}[];

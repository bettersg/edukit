// @ts-nocheck
import {
  EducationLevel,
  SecondaryStream,
  PrimarySubjects,
  SecondarySubjects,
  JCSubjects,
  IBSubjects,
} from './educationSubjects';

export enum TuteeDataFormat {
  KSGeneral = 'KSGeneral',
  KSSSO = 'KSSSO',
  EHTutee = 'EH'
}

export enum TutorDataFormat {
  KSTutor = 'KSTutor',
  EHTutor = 'EH'
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum PreferedGender {
  Male = Gender.Male,
  Female = Gender.Female,
  None = 'None',
}

export type Contact = {
  email: string;
  phone: number;
  telegram: string;
};

export type Person = {
  index: number;
  name?: string;
  gender?: Gender;
  contact?: Partial<Contact>;
};

export type Tutor = {
  personalData: Person;
  isProBonoOk?: boolean | undefined;
  isUnaidedOk?: boolean | undefined;
  acceptableSecondaryStreams?: SecondaryStream[];
  tutorSubjects: TutorSubjects;
  commitStr?: string;
  noOfStudents?: number;
};

export type TutorSubjects = {
  primary?: Subject[];
  lowerSecondary?: Subject[];
  upperSecondary?: Subject[];
  jc?: Subject[];
  ib?: Subject[];
};

export type TutorPreference = {
  firstTutorIndex: number;
  secondTutorIndex: number;
  thirdTutorIndex: number;
};

export type Subject =
  | PrimarySubjects
  | SecondarySubjects
  | JCSubjects
  | IBSubjects;
export type Tutee = {
  personalData: Person;
  preferedGender?: PreferedGender;
  // genderPreference?: keyof typeof Gender
  isOnFinancialAid?: boolean | undefined;
  educationLevel?: EducationLevel;
  secondaryStream?: SecondaryStream;
  subjects: (PrimarySubjects | SecondarySubjects | JCSubjects | IBSubjects)[];
  tutorPreference?: TutorPreference;
};

export type TutorMatchScore = Tutor & {
  score: number;
};
export type TuteeMatches = Tutee & {
  tutors: TutorMatchScore[];
};

import { Tutor, Tutee, Subject } from '@/types/person';

import {
  EducationLevel,
  JCSubjects,
  SecondarySubjects,
  SecondaryStream
} from '@/types/educationSubjects';

export const getEHMatchScore = (tutor: Tutor, tutee: Tutee): number => {
  const subjectScore = scoreSubjectLevel(tutor, tutee);
  if (subjectScore === 0) return 0;
  const choicesScore = scoreChoices(tutor, tutee);
  return subjectScore + choicesScore;
};

const scoreChoices = (tutor: Tutor, tutee: Tutee): number => {
  let preferences: number[] = [];
  let tutorID: number = -1;

  if (tutee.tutorPreference) {
    preferences = Object.values(tutee.tutorPreference);
  }
  if (tutor) {
    tutorID = tutor.personalData.index;
  }
  if (tutorID !== -1 && preferences.includes(tutorID)) {
    const preferenceIndex = preferences.indexOf(tutorID);
    if (preferenceIndex === 0) return 99;
    if (preferenceIndex === 1) return 98;
    if (preferenceIndex === 2) return 97;
  }
  return 0;
};

function flattenArray(nestedArray) {
  let flattenedArray = [];
  for (let i = 0; i < nestedArray.length; i++) {
      flattenedArray = flattenedArray.concat(nestedArray[i]);
  }
  return flattenedArray;
}

const scoreSubjectLevel = (tutor: Tutor, tutee: Tutee): number => {
  let relevantTutorSubjects: Subject[] | undefined = [];
  switch (tutee.educationLevel) {
    case EducationLevel.UpperSecondary:
      relevantTutorSubjects = flattenArray(tutor.tutorSubjects.upperSecondary); // im not sure why it becomes an array within an array
      // relevantTutorSubjects = tutor.tutorSubjects.upperSecondary;
      break;
    case EducationLevel.JuniorCollege:
      relevantTutorSubjects = flattenArray(tutor.tutorSubjects.jc);
      // relevantTutorSubjects = tutor.tutorSubjects.jc;
      break;
    default:
      return 0;
  }
  if (!relevantTutorSubjects || relevantTutorSubjects?.length == 0) {
    return 0;
  }
  return relevantTutorSubjects?.reduce<number>(
    (cumulativeScore: number, tutorSubject: Subject): number => {
      const score =
        tutee.subjects.includes(tutorSubject) && !(tutorSubject === undefined)
          ? 1
          : 0;
      return cumulativeScore + score;
    },
    0,
  );
};


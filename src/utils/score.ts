// @ts-nocheck
import { Tutor, Tutee, Subject, PreferedGender, } from '@/types/person'

import { EducationLevel, SecondaryStream } from '@/types/educationSubjects'
/**
 * Calculates the total matching score between tutor and tutee based on a
 * specific set of criteria between tutor and tutee.
 *
 * @param tutor the tutor being matched
 * @param tutee the tutee being evaluated
 * @returns an overall score between tutor and tutee
 */
export const getMatchScore = (tutor: Tutor, tutee: Tutee): number => {
  const genderMatchScore = scoreGender(tutor, tutee)
  const subjectScore = scoreSubjectLevel(tutor, tutee)
  // console.log("score - gender", scoreGender(tutor, tutee), "subj-" ,scoreSubjectLevel(tutor, tutee),"probono" ,scoreProBono(tutor, tutee), "finAid-" ,scoreFinancialAid(tutor, tutee), "stream-",  scoreStream(tutor, tutee))
  if ((genderMatchScore === 0)||
  (subjectScore === 0)) return 0
  return (
    scoreGender(tutor, tutee) +
    scoreSubjectLevel(tutor, tutee) +
    scoreProBono(tutor, tutee) +
    scoreFinancialAid(tutor, tutee) +
    scoreStream(tutor, tutee)
  )
}

const scoreGender = (tutor: Tutor, tutee: Tutee): number => {
  if (tutee.preferedGender === PreferedGender.None) return 1
  return String(tutor.personalData.gender) == String(tutee.preferedGender) ? 1 : 0
}

const scoreProBono = (tutor: Tutor, tutee: Tutee): number => {
  if (tutor.isProBonoOk || tutee.isOnFinancialAid) return 1
  if ((tutor.isProBonoOk === undefined) || (tutee.isOnFinancialAid === undefined)) return 0.5
  return 0
}

const scoreFinancialAid = (tutor: Tutor, tutee: Tutee): number => {
  if (tutor.isUnaidedOk || tutee.isOnFinancialAid) return 1
  if ((tutor.isUnaidedOk === undefined) || (tutee.isOnFinancialAid === undefined)) return 0.5
  return 0
}

const scoreStream = (tutor: Tutor, tutee: Tutee): number => {
  const isSecondaryLevel =
    tutee.educationLevel === EducationLevel.LowerSecondary ||
    tutee.educationLevel === EducationLevel.UpperSecondary
  if (
    tutor.acceptableSecondaryStreams.length === 0 ||
    tutee.secondaryStream === SecondaryStream.undefined
  )
    return 0.5
  const isStreamSame =
    isSecondaryLevel &&
    tutee.secondaryStream &&
    tutor.acceptableSecondaryStreams?.includes(tutee.secondaryStream)
  return isStreamSame ? 1 : 0
}

const scoreSubjectLevel = (tutor: Tutor, tutee: Tutee): number => {
  let relevantTutorSubjects: (Subject[]|undefined) = []
  switch (tutee.educationLevel) {
    case EducationLevel.Primary:
      relevantTutorSubjects = tutor.tutorSubjects.primary
      break
    case EducationLevel.LowerSecondary:
      relevantTutorSubjects = tutor.tutorSubjects.lowerSecondary
      break
    case EducationLevel.UpperSecondary:
      relevantTutorSubjects = tutor.tutorSubjects.upperSecondary
      break
    case EducationLevel.JuniorCollege:
      relevantTutorSubjects = tutor.tutorSubjects.jc
      break
    case EducationLevel.InternationalBaccalaureate:
      relevantTutorSubjects = tutor.tutorSubjects.ib
      break
    default:
      return 0
  }
  if ((!relevantTutorSubjects) || (relevantTutorSubjects?.length==0)){
    return 0
  }
  // console.log("Rel-TutorSubj - ", relevantTutorSubjects, tutee.subjects)
  return relevantTutorSubjects?.reduce<number>(
    (cumulativeScore: number, tutorSubject: Subject): number => {
      const score = (tutee.subjects.includes(tutorSubject) && !(tutorSubject === undefined)) ? 1 : 0
      return cumulativeScore + score
    },
    0)
  }

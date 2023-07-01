import { Tutor, Tutee, Subject, PreferedGender, } from '@/types/person'

import { EducationLevel } from '@/types/educationSubjects'
/**
 * Calculates the total matching score between tutor and tutee based on a
 * specific set of criteria between tutor and tutee.
 *
 * @param tutor the tutor being matched
 * @param tutee the tutee being evaluated
 * @returns an overall score between tutor and tutee
 */
export const sumScores = (tutor: Tutor, tutee: Tutee): number => {
  return (
    scoreGender(tutor, tutee) +
    scoreSubjectLevel(tutor, tutee) +
    scoreProBono(tutor, tutee) +
    scoreFinancialAid(tutor, tutee) +
    scoreStream(tutor, tutee)
  )
}

/**
 * Scores match based on gender preferences of the tutee.
 *
 * @description
 * If the tutee has no gender preference, or the tutee's preferred gender
 * is the same as the tutor, score 1; otherwise 0.
 *
 * For empty fields, assume no gender preference.
 *
 * @todo
 * For response to 'Yes', score 1; for empty field, change score to 0.5.
 *
 * @param tutor the tutor being matched
 * @param tutee the tutee being evaluated
 * @returns a score of either 0 or 1
 */
const scoreGender = (tutor: Tutor, tutee: Tutee): number => {
  if (tutee.preferedGender === PreferedGender.None) return 1
  return String(tutor.personalData.gender) == String(tutee.preferedGender) ? 1 : 0
}

/**
 *
 * @param tutor the tutor being matched
 * @param tutee the tutee being evaluated
 * @returns a score of either 0 or 1
 */
const scoreSubjectLevel = (tutor: Tutor, tutee: Tutee): number =>
  tutor.subjects.reduce<number>(
    (cumulativeScore: number, tutorSubject: Subject): number => {
      const isGeneralLevelSame =
        tutorSubject.educationLevel === tutee.educationLevel
      const hasSameSubjectCombination = tutee.subjects.includes(
        tutorSubject.name
      )
      const score = isGeneralLevelSame && hasSameSubjectCombination ? 1 : 0

      return cumulativeScore + score
    },
    0
  )

/**
 *
 * @param tutor the tutor being matched
 * @param tutee the tutee being evaluated
 * @returns a score of either 0 or 1
 */
const scoreProBono = (tutor: Tutor, tutee: Tutee): number => {
  if (!tutor.isProBono || !tutee.isOnFinancialAid) return 0.5
  if (tutor.isProBono && tutee.isOnFinancialAid) return 1
  return 0
}

/**
 *
 * @param tutor the tutor being matched
 * @param tutee the tutee being evaluated
 * @returns a score of either 0 or 1
 */
const scoreFinancialAid = (tutor: Tutor, tutee: Tutee): number => {
  if (tutor.isUnaided && tutee.isOnFinancialAid) return 1
  return 0.5
}

/**
 *
 * @param tutor the tutor being matched
 * @param tutee the tutee being evaluated
 * @returns a score of either 0 or 1
 */
const scoreStream = (tutor: Tutor, tutee: Tutee): number => {
  const isSecondaryLevel =
    tutee.educationLevel === EducationLevel.LowerSecondary ||
    tutee.educationLevel === EducationLevel.UpperSecondary
  if (
    tutor.secondaryStreams === undefined ||
    tutee.secondaryStream === undefined
  )
    return 0.5
  const isStreamSame =
    isSecondaryLevel &&
    tutee.secondaryStream &&
    tutor.secondaryStreams?.includes(tutee.secondaryStream)
  return isStreamSame ? 1 : 0
}

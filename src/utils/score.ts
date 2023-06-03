import { Tutor, Tutee } from '@/types/person'

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
export const scoreGender = (tutor: Tutor, tutee: Tutee): number => {
  if (!tutee.genderPreference) return 1
  return tutor.personalData.gender === tutee.genderPreference ? 1 : 0
}

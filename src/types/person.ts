/**
 * Represents the gender associated with the person.
 */
export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

/**
 * Represents the education level.
 */
export enum GeneralLevel {
  Primary,
  LowerSecondary,
  UpperSecondary,
  JuniorCollege,
  InternationalBaccalaureate,
}

/**
 * Represents the stream for a secondary school level.
 */
export enum SecondaryStream {
  InternationalBaccalaureate,
  IntegratedProgramme,
  Express,
  NormalAcademic,
  NormalTechnical,
}

/**
 * Contact details of the person.
 */
export type Contact = {
  /**
   * Email address.
   */
  email: string

  /**
   * Contact number.
   */
  phone: number

  /**
   * Telegram handle.
   */
  telegram: string
}

/**
 * Details about the person.
 */
export type Person = {
  /**
   * Index number of the person.
   */
  index: number

  /**
   * Name of the person.
   */
  name: string

  /**
   * Gender of the person.
   */
  gender: (typeof Gender)[keyof typeof Gender]

  /**
   * Contact details of the person.
   */
  contact: Partial<Contact>
}

/**
 * Represents information about a tutor.
 */
export type Tutor = {
  /**
   * Information about person.
   */
  personalData: Person

  /**
   * Whether the tutor would like to teach on a pro-bono basis.
   *
   * Values are any of:
   * - Free
   * - Both
   * - I would like to opt out and receive remuneration for tutoring
   * - ''
   *
   * Assume `true` if value is 'Free', `false` if value has 'opt out', and
   * `undefined` for all other cases.
   */
  isProBono?: boolean

  /**
   * Whether the tutor would like to teach students not on financial aid.
   *
   * Values are any of:
   * - Yes
   * - No
   * - ''
   *
   * Assume `true` if value is 'Yes', `false` if value is 'No' and `undefined`
   * for all other cases.
   */
  isUnaided?: boolean

  /**
   * Preferred stream to teach.
   * Applies only for subjects at secondary level.
   */
  secondaryStreams?: SecondaryStream[]

  /**
   * Subjects tutor is willing to teach.
   */
  subjects: TutorSubject[]
}

/**
 * Represents information about a subject.
 */
export type TutorSubject = {
  /**
   * Name of the subject.
   */
  name: string

  /**
   * General level at which tutor can teach for the subject.
   */
  generalLevel: GeneralLevel
}

export type TutorMatchScore = Tutor & {
  score: number
}

/**
 * Represents information about a tutee.
 */
export type Tutee = {
  /**
   * Information about person.
   */
  personalData: Person

  /**
   * Whether tutee has gender preference.
   */
  genderPreference?: keyof typeof Gender

  /**
   * Whether tutee is on financial aid.
   */
  isOnFinancialAid?: boolean

  /**
   * General level of education.
   */
  generalLevel: GeneralLevel

  /**
   * Sub-level of education.
   */
  level: string

  /**
   * Stream. Applicable for secondary level.
   */
  secondaryStream?: SecondaryStream

  /**
   * Subjects tutee would like to get tution on.
   */
  subjects: string[]
}

export type TuteeMatches = Tutee & {
  tutors: TutorMatchScore[]
}

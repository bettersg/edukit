/**
 * Represents the gender associated with the person.
 */
export enum Gender {
  Male = 'Male',
  Female = 'Female',
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
   */
  isProBono?: boolean

  /**
   * Subjects tutor is willing to teach.
   */
  subjects: Subject[]
}

/**
 * Represents information about a subject.
 */
export type Subject = {
  /**
   * Name of the subject.
   */
  name: string

  /**
   * Level at which tutor can teach for the subject.
   */
  level: string

  /**
   * Streams for the subject.
   * Applies only for subjects at secondary level.
   */
  stream?: string[]
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
   * Education level.
   */
  level: string

  /**
   * Stream. Applicable for secondary level.
   */
  stream?: string

  /**
   * Subjects tutee would like to get tution on.
   */
  subjects: string[]
}

import { GSheetsResponse, GSheetsData } from '@/types/google-sheets'
import { Tutee, Tutor, Subject, Gender } from '@/types/person'

/**
 * Get data from GSheets. Optionally transform the data.
 *
 * @param sheetsURL location of the GSheets
 * @param dropHeaderRow whether to drop the header row
 * @param transformFn function to transform the data
 * @returns array of data
 */
export const getGSheetsData = async <T = GSheetsData>(
  sheetsURL: string,
  dropHeaderRow = true,
  transformFn?: (data: GSheetsData) => T
): Promise<T[]> => {
  const response = await fetch(sheetsURL)
  if (!response.ok) return []

  const data: GSheetsResponse = await response.json()
  const rawData = data.content

  if (dropHeaderRow) rawData.shift()
  if (transformFn) return rawData.map(transformFn)
  return rawData as unknown as T[]
}

/**
 * Transform data from KindleSparks into `Tutor` compatible object.
 *
 * @param data raw data as obtained from GSheets
 * @returns `Tutor` object
 */
export const transformKSTutorData = (data: GSheetsData): Tutor => {
  const primarySubjects = parseSubjects('primary', data[10] as string)
  const lowerSecondarySubjects = parseSubjects(
    'lower-secondary',
    data[12] as string,
    data[11] as string
  )
  const upperSecondarySubjects = parseSubjects(
    'upper-secondary',
    data[13] as string,
    data[11] as string
  )
  const jcSubjects = parseSubjects('jc', data[14] as string)
  const ibSubjects = parseSubjects('ib', data[15] as string)
  const subjects = [
    ...primarySubjects,
    ...lowerSecondarySubjects,
    ...upperSecondarySubjects,
    ...jcSubjects,
    ...ibSubjects,
  ]

  const proBono = data[8] as string

  return {
    personalData: {
      index: data[0] as number,
      name: data[2] as string,
      gender: data[3] as (typeof Gender)[keyof typeof Gender],
      contact: {
        email: data[1] as string,
        phone: data[4] as number,
      },
    },
    isProBono: proBono === '' ? undefined : proBono === 'Yes',
    subjects: subjects,
  }
}

/**
 * Transforms data from KindleSparks into a `Tutee` compatible object.
 *
 * @param data raw data as obtained from GSheets
 * @returns `Tutee` object
 */
export const transformKSTuteeData = (data: GSheetsData): Tutee => {
  // console.log(data)

  return {
    personalData: {
      index: data[0] as number,
      name: data[3] as string,
      gender: data[26] as (typeof Gender)[keyof typeof Gender],
      contact: {
        email: data[2] as string,
        phone: data[6] as number,
      },
    },
    genderPreference: getGenderPreference(data[20] as string),
    isOnFinancialAid: (data[7] as string) === 'Yes',
    level: data[9] as string,
    stream: data[10] as string,
    subjects: (data[12] as string)
      .split(',')
      .map((subject: string) => subject.trim()),
  }
}

/**
 * Transforms data from SSO into a `Tutee` compatible object.
 *
 * @param data raw data as obtained from GSheets
 * @returns `Tutee` object
 */
export const transformSSOTuteeData = (data: GSheetsData): Tutee => {
  return {
    personalData: {
      index: 0,
      name: data[1] as string,
      gender: data[7] as (typeof Gender)[keyof typeof Gender],
      contact: {
        email: '',
        phone: 90009000,
        telegram: '',
      },
    },
    genderPreference: getGenderPreference(data[8] as string),
    isOnFinancialAid: false,
    level: data[4] as string,
    stream: '',
    subjects: [],
  }
}

/**
 * Gets the tutee's gender preference.
 *
 * @param rawGenderPreference original input of gender preference
 * @returns cleaned gender preference
 */
const getGenderPreference = (
  rawGenderPreference: string
): Tutee['genderPreference'] | undefined => {
  if (rawGenderPreference.includes('female')) return Gender.Female
  if (rawGenderPreference.includes('male')) return Gender.Male
  return undefined
}

/**
 * Parses the list of subjects tutor can teach.
 *
 * @param level level at which tutor is able to teach
 * @param rawSubjects string or comma-delimited list of subjects
 * @param streams stream at which tutor is able to teach
 * @returns list of subjects
 */
const parseSubjects = (
  level: string,
  rawSubjects: string,
  streams?: string
): Subject[] => {
  const searchPhrase = 'I would not like to teach'
  if (!rawSubjects || rawSubjects.includes(searchPhrase)) return []

  const subjects = rawSubjects.split(',')
  return subjects.map(
    (subject: string): Subject => ({
      name: subject.trim(),
      level: level,
      stream: streams?.split(','),
    })
  )
}

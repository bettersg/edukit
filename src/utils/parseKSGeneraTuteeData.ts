import { GSheetsResponse, GSheetsData } from '@/types/google-sheets'
import {
    Tutee,
    Tutor,
    Subject,
    Gender,
    PreferedGender
  } from '@/types/person'
  import {
    EducationLevel,
    SecondaryStream,
  } from '@/types/educationSubjects'
  import { stringToArray } from '.'
  
  /**

/**
 * Parses the list of subjects tutor can teach.
 *
 * @param level level at which tutor is able to teach
 * @param rawSubjects string or comma-delimited list of subjects
 * @param streams stream at which tutor is able to teach
 * @returns list of subjects
 */
const parseSubjects = (
    level: EducationLevel,
    rawSubjects: string
  ): Subject[] => {
    const searchPhrase = 'I would not like to teach'
    if (!rawSubjects || rawSubjects.includes(searchPhrase)) return []
  
    return rawSubjects.split(',').map(
      (subject: string): Subject => ({
        name: subject.trim(),
        educationLevel: level,
      })
    )
  }
  
  /**
   * Parses the secondary level stream.
   *
   * @param stream string representation of the stream
   * @returns enum value of the stream
   */
  const parseStream = (stream: string): SecondaryStream | undefined => {
    if (!stream) return undefined
    if (stream.includes('IB')) return SecondaryStream.InternationalBaccalaureate
    if (stream.includes('IP')) return SecondaryStream.IntegratedProgramme
    if (stream.includes('NA')) return SecondaryStream.NormalAcademic
    if (stream.includes('NT')) return SecondaryStream.NormalTechnical
    return SecondaryStream.Express
  }
  
  /**
   * Transform data from KindleSparks into `Tutor` compatible object.
   *
   * @param data raw data as obtained from GSheets
   * @returns `Tutor` object
   */
  export const transformKSTutorData = (data: GSheetsData): Tutor => {
    const subjects = [
      ...parseSubjects(EducationLevel.Primary, data[10] as string),
      ...parseSubjects(EducationLevel.LowerSecondary, data[12] as string),
      ...parseSubjects(EducationLevel.UpperSecondary, data[13] as string),
      ...parseSubjects(EducationLevel.JuniorCollege, data[14] as string),
      ...parseSubjects(
        EducationLevel.InternationalBaccalaureate,
        data[15] as string
      ),
    ]
  
    const proBono = data[7] as string
    const unaided = data[8] as string
    const streams = stringToArray(data[11] as string).map(
      (stream: string): SecondaryStream => parseStream(stream) as SecondaryStream
    )
  
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
      isProBono:
        proBono === '' || proBono === 'Both' ? undefined : proBono === 'Free',
      isUnaided: unaided === '' ? undefined : unaided === 'Yes',
      secondaryStreams: streams,
      subjects: subjects,
    }
  }
  
  /**
   *
   * @param level
   * @returns
   */
  const parseKSTuteeGeneralLevel = (level: string): EducationLevel => {
    if (level.includes('IB')) return EducationLevel.InternationalBaccalaureate
    if (level.includes('JC')) return EducationLevel.JuniorCollege
    if (level.includes('Secondary') && level.match(/(3|4|5)/gi))
      return EducationLevel.UpperSecondary
    if (level.includes('Secondary') && level.match(/(1|2)/gi))
      return EducationLevel.LowerSecondary
    return EducationLevel.Primary
  }
  
  /**
   * Transforms data from KindleSparks into a `Tutee` compatible object.
   *
   * @param data raw data as obtained from GSheets
   * @returns `Tutee` object
   */
  export const transformKSTuteeData = (data: GSheetsData): Tutee => {
    const level = data[9] as string
  
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
      preferedGender: getGenderPreference(data[20] as string),
      isOnFinancialAid: (data[7] as string) === 'Yes',
      // level: EducationLevel,
      educationLevel: parseKSTuteeGeneralLevel(level),
      secondaryStream: parseStream(data[10] as string),
      subjects: stringToArray(data[12] as string),
    }
  }
  
  /**
   *
   * @param level
   * @returns
   */
  const parseSSOTuteeGeneralLevel = (level: string): EducationLevel => {
    if (level.includes('JC')) return EducationLevel.JuniorCollege
    if (level.includes('S') && level.match(/(3|4|5)/gi))
      return EducationLevel.UpperSecondary
    if (level.includes('S') && level.match(/(1|2)/gi))
      return EducationLevel.LowerSecondary
    return EducationLevel.Primary
  }
  
  /**
   * Transforms data from SSO into a `Tutee` compatible object.
   *
   * @param data raw data as obtained from GSheets
   * @returns `Tutee` object
   */
  export const transformSSOTuteeData = (data: GSheetsData): Tutee => {
    const level = data[4] as string
    const subjects = [
      data[10] as string,
      data[11] as string,
      data[12] as string,
      data[14] as string,
      data[15] as string,
      data[16] as string,
      data[17] as string,
      data[18] as string,
      data[19] as string,
    ]
  
    return {
      personalData: {
        index: 0,
        name: data[1] as string,
        gender: data[7] as (typeof Gender)[keyof typeof Gender],
        contact: {
          email: '',
          phone: 0,
          telegram: '',
        },
      },
      preferedGender: getGenderPreference(data[8] as string),
      isOnFinancialAid: false,
      // level: level,
      educationLevel: parseSSOTuteeGeneralLevel(level),
      secondaryStream: parseStream(data[13] as string),
      subjects: subjects,
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
  ): Tutee['preferedGender'] => {
    if (rawGenderPreference.includes('female')) return PreferedGender.Female
    if (rawGenderPreference.includes('male')) return PreferedGender.Male
    return PreferedGender.None
  }
  
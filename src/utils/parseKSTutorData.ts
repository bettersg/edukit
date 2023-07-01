import { GSheetsResponse, GSheetsData } from '@/types/google-sheets'
import {
    Tutor,
    Gender,
    PreferedGender,
    TutorSubjects
  } from '@/types/person'
  import {
    EducationLevel,
    SecondaryStream,
  } from '@/types/educationSubjects'
  import { stringToArray } from '.'
  
const findIdxKSTutor = (colNames : string[]) => {
    const tutorIndexIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('tutor') &&
          colName.toLowerCase().includes('index')
      )
      const tutorNameIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('name')
      )
      const genderIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('gender')
      )
      const probonoPrefIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('pro-bono')
      )
      const teachUnaidedIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('financial aid')
      )
      const streamPrefIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('stream')
      )
      const priSubjIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('primary') &&
          colName.toLowerCase().includes('subject')
      )
      const lowerSecSubjIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('lower secondary') &&
          colName.toLowerCase().includes('subject')
      )
      const upperSecSubjIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('upper secondary') &&
          colName.toLowerCase().includes('subject')
      )
      const jcSubjIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('jc') &&
          colName.toLowerCase().includes('subject')
      )
      const ibSubjIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('international baccalaureate') &&
          colName.toLowerCase().includes('subject')
      )
      const contactNumIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('number')
      )
      if (
        tutorIndexIdx < 0 ||
        tutorNameIdx < 0 ||
        genderIdx < 0 ||
        probonoPrefIdx < 0 ||
        teachUnaidedIdx < 0 ||
        streamPrefIdx < 0 ||
        priSubjIdx < 0 ||
        lowerSecSubjIdx < 0 ||
        upperSecSubjIdx < 0 ||
        jcSubjIdx < 0 ||
        ibSubjIdx < 0 ||
        contactNumIdx < 0
      ) {
        alert('Tutor DB column name inaccurate! Tutor Data not loaded ')
        return null
      }
      return {
        tutorIndexIdx,
        tutorNameIdx,
        genderIdx,
        probonoPrefIdx,
        teachUnaidedIdx,
        streamPrefIdx,
        priSubjIdx,
        lowerSecSubjIdx,
        upperSecSubjIdx,
        jcSubjIdx,
        ibSubjIdx,
        contactNumIdx}
}

const parseSubjects = (
    level: EducationLevel,
    rawSubjects: string
  ): TutorSubjects => {


    const searchPhrase = 'I would not like to teach'
    if (!rawSubjects || rawSubjects.includes(searchPhrase)) return []
  
    return rawSubjects.split(',').map(
      (subject: string): Subject => ({
        name: subject.trim(),
        educationLevel: level,
      })
    )
  }
  

  const parseStream = (stream: string): SecondaryStream | undefined => {
    if (!stream) return undefined
    if (stream.includes('IB')) return SecondaryStream.InternationalBaccalaureate
    if (stream.includes('IP')) return SecondaryStream.IntegratedProgramme
    if (stream.includes('NA')) return SecondaryStream.NormalAcademic
    if (stream.includes('NT')) return SecondaryStream.NormalTechnical
    return SecondaryStream.Express
  }
  

const getGenderPreference = (
    rawGenderPreference: string
  ): Tutee['preferedGender'] => {
    if (rawGenderPreference.includes('female')) return PreferedGender.Female
    if (rawGenderPreference.includes('male')) return PreferedGender.Male
    return PreferedGender.None
  }
export const transformKSTutorData = (data: GSheetsData): Tutor[] => {
    const parsedTutorData = []
    // console.log(data)
    const colIdx = findIdxKSTutor(data)
    console.log(colIdx)
    return parsedTutorData
  }
  

  
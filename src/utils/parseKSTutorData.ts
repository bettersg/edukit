import { GSheetsResponse, GSheetsData } from '@/types/google-sheets'
import {
    Tutor,
    Gender,
    PreferedGender,
    TutorSubjects,
    Subject,
  } from '@/types/person'
  import {
    EducationLevel,
    SecondaryStream,
    PrimarySubjects,
    SecondarySubjects,
    JCSubjects,
    IBSubjects,
  } from '@/types/educationSubjects'
  import { stringToArray } from '.'

  const primarySubjectTextToEnumMapping = {
    "english language": PrimarySubjects.English,
    "mathematics": PrimarySubjects.Math,
    "science": PrimarySubjects.Science,
    "chinese language": PrimarySubjects.Chinese,
    "malay language": PrimarySubjects.Malay,
    "tamil language": PrimarySubjects.Tamil,
    "social studies": PrimarySubjects.SocialStudies
  }

  const secondarySubjectTextToEnumMapping = {
    "english language": SecondarySubjects.English,
    "chinese language": SecondarySubjects.Chinese,
    "malay language": SecondarySubjects.Malay,
    "tamil language": SecondarySubjects.Tamil,
    "mathematics": SecondarySubjects.EMath,
    "a-mathematics": SecondarySubjects.AMath,
    "principle of accounting": SecondarySubjects.Accounting,
    "physics": SecondarySubjects.Physics,
    "biology": SecondarySubjects.Biology,
    "chemistry": SecondarySubjects.Chemistry,
    "combined science (biology)": SecondarySubjects.CombinedScienceBiology,
    "combined science (chemistry)": SecondarySubjects.CombinedScienceChemistry,
    "combined science (physics)": SecondarySubjects.CombinedSciencePhysics,
    "geography": SecondarySubjects.Geography,
    "history": SecondarySubjects.History,
    "english literature": SecondarySubjects.EnglishLiterature,
    "social studies": SecondarySubjects.SocialStudies,
    "combined humanities (social studies)":SecondarySubjects.CombinedHumanitiesSocialStudies,
    "combined humanities (geography)":SecondarySubjects.CombinedHumanitiesGeography,
    "combined humanities (history)":SecondarySubjects.CombinedHumanitiesHistory,
    "combined humanities (literature)":SecondarySubjects.CombinedHumanitiesLiterature,
  }
  
  const jcSubjectTextToEnumMapping = {
    "general paper (gp)": JCSubjects.GeneralPaper,
    "knowledge & inquiry (ki)": JCSubjects.KnowledgeAndInquiry,
    "chinese language": JCSubjects.Chinese,
    "malay language": JCSubjects.Malay,
    "tamil language": JCSubjects.Tamil,
    "h1 mathematics": JCSubjects.H1Math,
    "h2 mathematics": JCSubjects.H2Math,
    "h1 physics": JCSubjects.H1Physics,
    "h2 physics": JCSubjects.H2Physics,
    "h1 chemistry": JCSubjects.H1Chemistry,
    "h2 chemistry": JCSubjects.H2Chemistry,
    "h1 biology": JCSubjects.H1Biology,
    "h2 biology": JCSubjects.H2Biology,
    "h1 geography": JCSubjects.H1Geography,
    "h2 geography": JCSubjects.H2Geography,
    "h1 history": JCSubjects.H1History,
    "h2 history": JCSubjects.H2History,
    "h1 english literature": JCSubjects.H1EnglishLiterature,
    "h2 english literature": JCSubjects.H2EnglishLiterature,
    "h1 economics": JCSubjects.H1Econs,
    "h2 economics": JCSubjects.H2Econs,
  }

  const ibSubjectTextToEnumMapping = {
    "english language": IBSubjects.English,
    "chinese language": IBSubjects.Chinese,
    "mathematics (sl)": IBSubjects.MathSL,
    "geography (sl)": IBSubjects.GeographySL,
    "history (sl)": IBSubjects.HistorySL,
    "english literature (sl)": IBSubjects.EnglishLiteratureSL,
    "economics (sl)":IBSubjects.EconomicsSL,
    "biology (sl)": IBSubjects.BiologySL,
    "physics (sl)": IBSubjects.PhysicsSL,
    "chemistry (sl)": IBSubjects.ChemistrySL,
    "mathematics (hl)": IBSubjects.MathSL,
    "geography (hl)": IBSubjects.GeographySL,
    "history (hl)": IBSubjects.HistorySL,
    "english literature (hl)": IBSubjects.EnglishLiteratureSL,
    "economics (hl)": IBSubjects.EconomicsSL,
    "biology (hl)": IBSubjects.BiologySL,
    "physics (hl)": IBSubjects.PhysicsSL,
    "chemistry (hl)": IBSubjects.ChemistryHL
  }

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
        personalData: {
            index: tutorIndexIdx,
            name: tutorNameIdx,
            gender: genderIdx,
            contact: {
                phone:contactNumIdx
            }
        },
        isProBonoOk: probonoPrefIdx,
        isUnaidedOk: teachUnaidedIdx,
        acceptableSecondaryStreams: streamPrefIdx,
        tutorSubjects: {
            primary:  priSubjIdx,
            lowerSecondary: lowerSecSubjIdx,
            upperSecondary: upperSecSubjIdx,
            jc: jcSubjIdx,
            ib: ibSubjIdx
        }      
        
       }
}

const parseSubjects = (
    level: EducationLevel,
    rawSubjects: string
  ): Subject[] => {
    const subjectsArr: Subject[] = []
    const searchPhrase = 'I would not like to teach'
    if (!rawSubjects || rawSubjects.includes(searchPhrase)) return subjectsArr
    let rawSubjectArr: string[] = rawSubjects.split(",")
    rawSubjectArr = rawSubjectArr.map((subj)=>subj.trim().toLowerCase())
    switch (level){
        case (EducationLevel.Primary):
            for (let rawSubject of rawSubjectArr){
                subjectsArr.push(primarySubjectTextToEnumMapping[rawSubject])
            }
            break;
        case (EducationLevel.UpperSecondary):
            for (let rawSubject of rawSubjectArr){
                subjectsArr.push(secondarySubjectTextToEnumMapping[rawSubject])
            }
            break;
        case (EducationLevel.LowerSecondary):
            for (let rawSubject of rawSubjectArr){
                subjectsArr.push(secondarySubjectTextToEnumMapping[rawSubject])
            }
            break;
        case (EducationLevel.JuniorCollege):
            for (let rawSubject of rawSubjectArr){
                subjectsArr.push(jcSubjectTextToEnumMapping[rawSubject])
            }
        break;    
        case (EducationLevel.InternationalBaccalaureate):
            for (let rawSubject of rawSubjectArr){
                subjectsArr.push(ibSubjectTextToEnumMapping[rawSubject])
            }
        break;
        }
    console.log(rawSubjectArr, "parsed : ", subjectsArr)
    return subjectsArr
  }
  

  const parseStream = (stream: string): SecondaryStream[] => {
    stream = stream.toLowerCase()
    const streamArr: SecondaryStream[] = []
    if (!stream) return streamArr
    if (stream.includes('international baccalaureate')) streamArr.push(SecondaryStream.InternationalBaccalaureate);
    if (stream.includes('normal academic')) streamArr.push(SecondaryStream.NormalAcademic);
    if (stream.includes('normal technical')) streamArr.push(SecondaryStream.NormalTechnical);
    if (stream.includes('integrated program ')) streamArr.push(SecondaryStream.IntegratedProgramme);
    if (stream.includes('express')) streamArr.push(SecondaryStream.Express);
    return streamArr
  }
  
  const parseGender = (gender: string) : Gender | undefined => {
    gender = gender.toLowerCase()
    if (gender.includes("female")) return Gender.Female
    if (gender.includes("male")) return Gender.Male
    return undefined
  }
// const getGenderPreference = (
//     rawGenderPreference: string
//   ): Tutee['preferedGender'] => {
//     if (rawGenderPreference.includes('female')) return PreferedGender.Female
//     if (rawGenderPreference.includes('male')) return PreferedGender.Male
//     return PreferedGender.None
//   }
  const parseProBonoPreference = (proBonoPref: string):boolean | undefined => {
    proBonoPref = proBonoPref.toLowerCase()
    if (proBonoPref.includes("free") || proBonoPref.includes("both")) return true
    if (proBonoPref.includes("opt out") && proBonoPref.includes("receive renumeration")) return false
    return undefined
  }
  const parseUnaidedPreference = (unaidedPref: string):boolean | undefined => {
    unaidedPref = unaidedPref.toLowerCase()
    if (unaidedPref.includes("yes")) return true
    if (unaidedPref.includes("no")) return false
    return undefined
  }
export const transformKSTutorData = (data: GSheetsData[]): Tutor[] => {
    const parsedTutorData : Tutor[] = []
    const colIdx = findIdxKSTutor(data[0])
    if (!colIdx) return parsedTutorData
    // console.log(colIdx)
    data.shift()
    for (let rowData of data){
        const tutor: Tutor = {
            personalData: {},
            acceptableSecondaryStreams: [],
            tutorSubjects: {}
          }
        tutor.personalData = {
            index: parseInt(rowData[colIdx.personalData.index]),
            name: rowData[colIdx.personalData.name],
            gender: parseGender(rowData[colIdx.personalData.gender]),
            contact: {
                phone: parseInt(rowData[colIdx.personalData.contact.phone])
            }
        }
        tutor.isProBonoOk = parseProBonoPreference(rowData[colIdx.isProBonoOk])
        tutor.isUnaidedOk = parseUnaidedPreference(rowData[colIdx.isUnaidedOk])
        tutor.acceptableSecondaryStreams = parseStream(rowData[colIdx.acceptableSecondaryStreams])

        const primary = parseSubjects(EducationLevel.Primary, rowData[colIdx.tutorSubjects.primary])
        const lowerSecondary = parseSubjects(EducationLevel.LowerSecondary, rowData[colIdx.tutorSubjects.lowerSecondary])
        const upperSecondary = parseSubjects(EducationLevel.UpperSecondary, rowData[colIdx.tutorSubjects.upperSecondary])
        const jc = parseSubjects(EducationLevel.JuniorCollege, rowData[colIdx.tutorSubjects.jc])
        const ib = parseSubjects(EducationLevel.InternationalBaccalaureate, rowData[colIdx.tutorSubjects.ib])
        tutor.tutorSubjects = {
            primary,
            lowerSecondary,
            upperSecondary,
            jc,
            ib
        }        
        parsedTutorData.push(tutor)
    }
    return parsedTutorData
  }
  

  
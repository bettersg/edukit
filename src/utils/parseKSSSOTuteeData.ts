import { GSheetsResponse, GSheetsData } from '@/types/google-sheets'
import {
    Tutee,
    Gender,
    PreferedGender,
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
    "english":PrimarySubjects.English,
    "math":PrimarySubjects.Math,
    "science":PrimarySubjects.Science,
    "chinese":PrimarySubjects.Chinese,
    "malay":PrimarySubjects.Malay,
    "tamil":PrimarySubjects.Tamil
}
  const secondarySubjectTextToEnumMapping = {
    "english":SecondarySubjects.English,
    "chinese":SecondarySubjects.Chinese,
    "malay":SecondarySubjects.Malay,
    "tamil":SecondarySubjects.Tamil,
    "e-math":SecondarySubjects.EMath,
    "a-math":SecondarySubjects.AMath,
    "combined science (physics)":SecondarySubjects.CombinedSciencePhysics,
    "combined science (chemistry)":SecondarySubjects.CombinedScienceChemistry,
    "combined science (biology)":SecondarySubjects.CombinedScienceBiology,
    "physics":SecondarySubjects.Physics,
    "chemistry":SecondarySubjects.Chemistry,
    "biology":SecondarySubjects.Biology,
    "combined humanities (social studies)":SecondarySubjects.CombinedHumanitiesSocialStudies,
    "combined humanities (geography)":SecondarySubjects.CombinedHumanitiesGeography,
    "combined humanities (history)":SecondarySubjects.CombinedHumanitiesHistory,
    "combined humanities (literature)":SecondarySubjects.CombinedHumanitiesLiterature,
    "geography":SecondarySubjects.Geography,
    "history":SecondarySubjects.History,
    "english literature":SecondarySubjects.EnglishLiterature
  }
  const jcSubjectTextToEnumMapping = {
    "general paper (gp)":JCSubjects.GeneralPaper,
    "knowledge & inquiry (ki)":JCSubjects.KnowledgeAndInquiry,
    "chinese":JCSubjects.Chinese,
    "malay":JCSubjects.Malay,
    "tamil":JCSubjects.Tamil,
    "h1 math":JCSubjects.H1Math,
    "h2 math":JCSubjects.H2Math,
    "h1 physics":JCSubjects.H1Physics,
    "h2 physics":JCSubjects.H2Physics,
    "h1 chemistry":JCSubjects.H1Chemistry,
    "h2 chemistry":JCSubjects.H2Chemistry,
    "h1 biology":JCSubjects.H1Biology,
    "h2 biology":JCSubjects.H2Biology,
    "h1 geography":JCSubjects.H1Geography,
    "h2 geography":JCSubjects.H2Geography,
    "h1 history":JCSubjects.H1History,
    "h2 history":JCSubjects.H2History,
    "h1 english literature":JCSubjects.H1EnglishLiterature,
    "h2 english literature":JCSubjects.H2EnglishLiterature,
    "h1 econs":JCSubjects.H1Econs,
    "h2 econs":JCSubjects.H2Econs,
  }
  const ibSubjectTextToEnumMapping = {
  }
  const educationLevelMapping = {
    "p1":EducationLevel.Primary,
    "p2":EducationLevel.Primary,
    "p3":EducationLevel.Primary,
    "p4":EducationLevel.Primary,
    "p5":EducationLevel.Primary,
    "p6":EducationLevel.Primary,
    "s1":EducationLevel.LowerSecondary,
    "s2":EducationLevel.LowerSecondary,
    "s3":EducationLevel.LowerSecondary,
    "s4":EducationLevel.UpperSecondary,
    "s5":EducationLevel.UpperSecondary,
    "jc1":EducationLevel.JuniorCollege,
    "jc2":EducationLevel.JuniorCollege,
  }
  const streamMapping = {
    "express": SecondaryStream.Express,
    "normal academic (na)": SecondaryStream.NormalAcademic,
    "normal technical (nt)": SecondaryStream.NormalTechnical,
    "integrated program (ip)": SecondaryStream.IntegratedProgramme,
    "international baccalaureate (ib)": SecondaryStream.InternationalBaccalaureate
  }

const findIdxKSSSOTutee = (colNames : string[]) => {
    const tuteeIndexIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('tutee') &&
          colName.toLowerCase().includes('index')
      )
      const tuteeNameIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('name') &&
        colName.toLowerCase().includes("tutee")
      )
      const contactNumIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('contact number')
      )
      const genderIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('gender') &&
          !colName.toLowerCase().includes('tutee')
      )
      const genderPrefIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('gender') && 
        colName.toLowerCase().includes('preference')
      )
    //   const financialAidIdx = colNames.findIndex((colName: string) =>
    //     colName.toLowerCase().includes('financial aid')
    //   )
      const educationLevelIdx = colNames.findIndex(
        (colName: string) =>
          colName.toLowerCase().includes('level') &&
          colName.toLowerCase().includes('education') 
      )
      const educationLevelIdxArr: number[] = []
      colNames.forEach((colName: string, idx: number) => {
        if (colName.toLowerCase().includes('education level')) {
          educationLevelIdxArr.push(idx)
        }
      })
      const streamIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('secondary level') && 
        (!(colName.toLowerCase().includes("subject")))
      )
      const subjIdx = colNames.findIndex((colName: string) =>
        colName.toLowerCase().includes('subject')
      )
      const subjIdxArr: number[] = []
      colNames.forEach((colName: string, idx: number) => {
        if (colName.toLowerCase().includes('subject')) {
          subjIdxArr.push(idx)
        }
      })     

    if (
        tuteeIndexIdx < 0 ||
        tuteeNameIdx < 0 ||
        genderIdx < 0 ||
        genderPrefIdx < 0 ||
        educationLevelIdx < 0 ||
        streamIdx < 0 ||
        subjIdx < 0
    ) {
        alert('Tutee DB column name inaccurate! Tutee Data not loaded ')
        console.log(tuteeIndexIdx, tuteeNameIdx, genderIdx, genderPrefIdx, streamIdx, subjIdx)
        return
    }
        return {
            personalData: {
                index: tuteeIndexIdx,
                name: tuteeNameIdx,
                gender: genderIdx,
                contact: {
                    phone:contactNumIdx
                }
            },
            PreferedGender: genderPrefIdx,
            isOnFinancialAid: true,
            EducationLevel: educationLevelIdxArr,
            secondaryStream: streamIdx,
            subjects:subjIdxArr        
       }
}
const parseGender = (gender: string) : Gender | undefined => {
    gender = gender.toLowerCase()
    if (gender.includes("female")) return Gender.Female
    if (gender.includes("male")) return Gender.Male
    return undefined
  }

const parseGenderPreference = (
    rawGenderPreference: string
  ): PreferedGender => {
    if (rawGenderPreference.includes('female')) return PreferedGender.Female
    if (rawGenderPreference.includes('male')) return PreferedGender.Male
    return PreferedGender.None
  }

  const parseEducationLevel = (levelArr: string[]): EducationLevel => {
    const parsedEducationLevelArr = levelArr.map((level)=>educationLevelMapping[level.trim().toLowerCase()])
    if (parsedEducationLevelArr.includes(EducationLevel.JuniorCollege)) return EducationLevel.JuniorCollege
    if (parsedEducationLevelArr.includes(EducationLevel.InternationalBaccalaureate)) return EducationLevel.InternationalBaccalaureate
    if (parsedEducationLevelArr.includes(EducationLevel.UpperSecondary)) return EducationLevel.UpperSecondary
    if (parsedEducationLevelArr.includes(EducationLevel.LowerSecondary)) return EducationLevel.LowerSecondary
    if (parsedEducationLevelArr.includes(EducationLevel.Primary)) return EducationLevel.Primary
    return EducationLevel.undefined
  }
  const parseStream = (stream: string): SecondaryStream => {
    stream = stream.toLowerCase()
    if (streamMapping[stream]) return streamMapping[stream]
    return SecondaryStream.undefined
  }
const parseSubjects = (
    level: EducationLevel,
    rawSubjectsArr: string[]
  ): Subject[] => {
    // let parsedSubjectsArr: Subject[] = []
    const rawSubjectsCombined = rawSubjectsArr.reduce((prev, curr)=>(prev+", "+curr+","),"")
    const rawSubjectsCombinedArr = rawSubjectsCombined.split(",").map((subj)=>subj.trim().toLowerCase())
    console.log(rawSubjectsCombinedArr)
    switch (level){
        case EducationLevel.JuniorCollege:
            return rawSubjectsCombinedArr.map((subj)=>jcSubjectTextToEnumMapping[subj])
        case EducationLevel.InternationalBaccalaureate:
            return rawSubjectsCombinedArr.map((subj)=>ibSubjectTextToEnumMapping[subj])
        case EducationLevel.UpperSecondary:
            return rawSubjectsCombinedArr.map((subj)=>secondarySubjectTextToEnumMapping[subj])
        case EducationLevel.LowerSecondary:
            return rawSubjectsCombinedArr.map((subj)=>secondarySubjectTextToEnumMapping[subj])
        case EducationLevel.Primary:
            return rawSubjectsCombinedArr.map((subj)=>primarySubjectTextToEnumMapping[subj])
    }
    return []
  }
  
  
export const transformKSSSOTuteeData = (data: GSheetsData[]): Tutee[] => {
    const parsedTuteeData : Tutee[] = []
    const colIdx = findIdxKSSSOTutee(data[0])
    if (!colIdx) return parsedTuteeData
    console.log(colIdx)
    data.shift()
    for (let rowData of data){
        const tutee: Tutee = {
            personalData: {},
            subjects: []
          }
        tutee.personalData = {
            index: parseInt(rowData[colIdx.personalData.index]),
            name: rowData[colIdx.personalData.name],
            gender: parseGender(rowData[colIdx.personalData.gender]),
            contact: {
                phone: parseInt(rowData[colIdx.personalData.contact.phone])
            }
        }
        tutee.preferedGender = parseGenderPreference(rowData[colIdx.PreferedGender])
        tutee.isOnFinancialAid = true
        const educationLevelArr = colIdx.EducationLevel.map((idx)=>rowData[idx])
        tutee.educationLevel = parseEducationLevel(educationLevelArr)
        tutee.secondaryStream = parseStream(rowData[colIdx.secondaryStream])
        const subjArr = colIdx.subjects.map((idx)=>rowData[idx])
        tutee.subjects = parseSubjects(tutee.educationLevel, subjArr)           
        parsedTuteeData.push(tutee)
    }
    return parsedTuteeData
  }
  

  
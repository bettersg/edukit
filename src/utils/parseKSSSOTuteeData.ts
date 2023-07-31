// // @ts-nocheck
// import { GSheetsResponse, MatrixData } from '@/types/google-sheets'
// import {
//     Tutee,
//     Gender,
//     PreferedGender,
//     Subject,
//   } from '@/types/person'
//   import {
//     EducationLevel,
//     SecondaryStream,
//     PrimarySubjects,
//     SecondarySubjects,
//     JCSubjects,
//     IBSubjects,
//   } from '@/types/educationSubjects'
//   import {primarySubjectTextToEnumMapping, secondarySubjectTextToEnumMapping, jcSubjectTextToEnumMapping, ibSubjectTextToEnumMapping, educationLevelMapping,streamMapping, colIdentifierContentMapping} from '@/utils/mappingData/KSSSOTutee'
  
//   // Keep all identifiers below in lower case
//   const colIdentifierContentMapping = {
//     personalData: {
//         name: ['name', 'tutee'],
//         gender: ['gender', 'tutee'],
//         contact: {
//             phone:['contact number']
//         }
//     },
//     PreferedGender: ['gender', 'preference'],
//     isOnFinancialAid: ['financial aid'],
//     EducationLevel: ['level','education'],
//     secondaryStream: ['stream'], //not used
//     subjects:['subject']
//     }                 
  
// const findColIdx = (colNames:string[], colIdentifierArr:string[]) => {
//   const colIdx = colNames.findIndex((colName) => 
//     colIdentifierArr.every((colIdentifierText)=>
//     (colName.toLowerCase().includes(colIdentifierText))))
//   return colIdx
// }

// const findColIdxArr = (colNames:string[], colIdentifierArr:string[]) => {
//   const colIdxArr = []
//   colNames.forEach((colName, idx) => 
//     {if (colIdentifierArr.every((colIdentifierText)=>
//     (colName.toLowerCase().includes(colIdentifierText)))){
//       colIdxArr.push(idx)
//     }})
//   return colIdxArr
// }
// const findIdxKSSSOTutee = (colNames : string[]) => {      
//       const streamIdx = colNames.findIndex((colName: string) =>
//       colName.toLowerCase().includes('secondary level') && 
//       (!(colName.toLowerCase().includes("subject")))
//       )
//       const colIdx = {
//         personalData: {
//             name: findColIdx(colNames, colIdentifierContentMapping.personalData.name),
//             gender: findColIdx(colNames, colIdentifierContentMapping.personalData.gender),
//             contact: {
//                 phone:findColIdx(colNames, colIdentifierContentMapping.personalData.contact.phone)
//             }
//         },
//         PreferedGender: findColIdx(colNames, colIdentifierContentMapping.PreferedGender),
//         EducationLevel: findColIdxArr(colNames, colIdentifierContentMapping.EducationLevel),
//         secondaryStream: streamIdx,
//         subjects:findColIdxArr(colNames, colIdentifierContentMapping.subjects)
//       }
//       console.log(colIdx)
//       // const invalidIdx = [-1, []]
//       const outerColFound = Object.keys(colIdx).every((col)=>
//       (colIdx[col] !== -1))
//       const personalDataColFound = Object.keys(colIdx.personalData).every((col)=>
//       (colIdx.personalData[col] !== -1))
//       const contactDataColFound = Object.keys(colIdx.personalData.contact).every((col)=>
//       (colIdx.personalData.contact[col] !== -1))
//       console.log(colIdx, outerColFound, personalDataColFound, contactDataColFound, Object.keys(colIdx.personalData.contact))
//       if (!(outerColFound &&
//         personalDataColFound &&
//         contactDataColFound)){
//           alert("Inaccurate Data format ")
//           console.log("Index of columns :", colIdx)
//           return
//         }
//       return colIdx      
      
//   }
// const parseGender = (gender: string) : Gender | undefined => {
//     gender = gender.toLowerCase()
//     if (gender.includes("female")) return Gender.Female
//     if (gender.includes("male")) return Gender.Male
//     return undefined
//   }

// const parseGenderPreference = (
//     rawGenderPreference: string
//   ): PreferedGender => {
//     if (rawGenderPreference.includes('female')) return PreferedGender.Female
//     if (rawGenderPreference.includes('male')) return PreferedGender.Male
//     return PreferedGender.None
//   }

//   const parseEducationLevel = (levelArr: string[]): EducationLevel => {
//     const parsedEducationLevelArr = levelArr.map((level)=>educationLevelMapping[level.trim().toLowerCase()])
//     if (parsedEducationLevelArr.includes(EducationLevel.JuniorCollege)) return EducationLevel.JuniorCollege
//     if (parsedEducationLevelArr.includes(EducationLevel.InternationalBaccalaureate)) return EducationLevel.InternationalBaccalaureate
//     if (parsedEducationLevelArr.includes(EducationLevel.UpperSecondary)) return EducationLevel.UpperSecondary
//     if (parsedEducationLevelArr.includes(EducationLevel.LowerSecondary)) return EducationLevel.LowerSecondary
//     if (parsedEducationLevelArr.includes(EducationLevel.Primary)) return EducationLevel.Primary
//     return EducationLevel.undefined
//   }
//   const parseStream = (stream: string): SecondaryStream => {
//     stream = stream.toLowerCase()
//     if (streamMapping[stream]) return streamMapping[stream]
//     return SecondaryStream.undefined
//   }
// const parseSubjects = (
//     level: EducationLevel,
//     rawSubjectsArr: string[]
//   ): Subject[] => {
//     // let parsedSubjectsArr: Subject[] = []
//     const rawSubjectsCombined = rawSubjectsArr.reduce((prev, curr)=>(prev+", "+curr+","),"")
//     const rawSubjectsCombinedArr = rawSubjectsCombined.split(",").map((subj)=>subj.trim().toLowerCase())
//     // console.log(rawSubjectsCombinedArr)
//     switch (level){
//         case EducationLevel.JuniorCollege:
//             return rawSubjectsCombinedArr.map((subj)=>jcSubjectTextToEnumMapping[subj])
//         case EducationLevel.InternationalBaccalaureate:
//             return rawSubjectsCombinedArr.map((subj)=>ibSubjectTextToEnumMapping[subj])
//         case EducationLevel.UpperSecondary:
//             return rawSubjectsCombinedArr.map((subj)=>secondarySubjectTextToEnumMapping[subj])
//         case EducationLevel.LowerSecondary:
//             return rawSubjectsCombinedArr.map((subj)=>secondarySubjectTextToEnumMapping[subj])
//         case EducationLevel.Primary:
//             return rawSubjectsCombinedArr.map((subj)=>primarySubjectTextToEnumMapping[subj])
//     }
//     return []
//   }  
  
// export const transformKSSSOTuteeData = (data: MatrixData[]): Tutee[] => {
//     const parsedTuteeData : Tutee[] = []
//     const colIdx = findIdxKSSSOTutee(data[0])
//     if (!colIdx) return parsedTuteeData
//     data.shift()
//     for (let rowDataIdx in data){
//         const rowData = data[rowDataIdx]
//         const tutee: Tutee = {
//             personalData: {},
//             subjects: []
//           }
//         tutee.personalData = {
//             index: parseInt(rowDataIdx)+2,
//             name: rowData[colIdx.personalData.name],
//             gender: parseGender(rowData[colIdx.personalData.gender]),
//             contact: {
//                 phone: parseInt(rowData[colIdx.personalData.contact.phone])
//             }
//         }
//         tutee.preferedGender = parseGenderPreference(rowData[colIdx.PreferedGender])
//         tutee.isOnFinancialAid = true
//         const educationLevelArr = colIdx.EducationLevel.map((idx)=>rowData[idx])
//         tutee.educationLevel = parseEducationLevel(educationLevelArr)
//         tutee.secondaryStream = parseStream(rowData[colIdx.secondaryStream])
//         const subjArr = colIdx.subjects.map((idx)=>rowData[idx])
//         tutee.subjects = parseSubjects(tutee.educationLevel, subjArr)           
//         parsedTuteeData.push(tutee)
//     }
//     return parsedTuteeData
//   }
  

  
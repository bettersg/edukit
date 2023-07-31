// // @ts-nocheck
// import { GSheetsResponse, MatrixData } from '@/types/google-sheets'
// import {
//     Tutor,
//     Gender,
//     PreferedGender,
//     TutorSubjects,
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
//   import {
//     primarySubjectTextToEnumMapping,
//     secondarySubjectTextToEnumMapping,
//     jcSubjectTextToEnumMapping,
//     ibSubjectTextToEnumMapping,
//     colIdentifierContentMapping
//   } from '@/utils/mappingData/KSTutor'

//   // Keep all identifiers below in lower case
//   const colIdentifierContentMapping = {
//     personalData: {
//         name: ['name'],
//         gender: ['gender'],
//         contact: {
//             phone:['number']
//         }
//     },
//     isProBonoOk: ['pro-bono'],
//     isUnaidedOk: ['financial aid'],
//     acceptableSecondaryStreams: ['stream'],
//     tutorSubjects: {
//         primary:  ['primary', 'subject'],
//         lowerSecondary: ['lower secondary', 'subject'],
//         upperSecondary: ['upper secondary', 'subject'],
//         jc: ['jc', 'subject'],
//         ib: ['international baccalaureate', 'subject']
//     }              
//    }

// const findColIdx = (colNames:string[], colIdentifierArr:string[]) => {
//   const colIdx = colNames.findIndex((colName) => 
//     colIdentifierArr.every((colIdentifierText)=>
//     (colName.toLowerCase().includes(colIdentifierText))))
//   return colIdx
// }

// const findIdxKSTutor = (colNames : string[]) => {
//       let colIdx = {
//         personalData: {
//             name: findColIdx(colNames, colIdentifierContentMapping.personalData.name),
//             gender: findColIdx(colNames, colIdentifierContentMapping.personalData.gender),
//             contact: {
//                 phone:findColIdx(colNames, colIdentifierContentMapping.personalData.contact.phone)
//             }
//         },
//         isProBonoOk: findColIdx(colNames, colIdentifierContentMapping.isProBonoOk),
//         isUnaidedOk: findColIdx(colNames, colIdentifierContentMapping.isUnaidedOk),
//         acceptableSecondaryStreams: findColIdx(colNames, colIdentifierContentMapping.acceptableSecondaryStreams),
//         tutorSubjects: {
//             primary:  findColIdx(colNames, colIdentifierContentMapping.tutorSubjects.primary),
//             lowerSecondary: findColIdx(colNames, colIdentifierContentMapping.tutorSubjects.lowerSecondary),
//             upperSecondary: findColIdx(colNames, colIdentifierContentMapping.tutorSubjects.upperSecondary),
//             jc: findColIdx(colNames, colIdentifierContentMapping.tutorSubjects.jc),
//             ib: findColIdx(colNames, colIdentifierContentMapping.tutorSubjects.ib)
//         }              
//        }
//       //  console.log("col idx", colIdx)
//        const outerColFound = Object.keys(colIdx).every((col)=>
//           (colIdx[col] !== -1))
//         const personalDataColFound = Object.keys(colIdx.personalData).every((col)=>
//         (colIdx.personalData[col] !== -1))
//         const contactDataColFound = Object.keys(colIdx.personalData.contact).every((col)=>
//         (colIdx.personalData.contact[col] !== -1))
//         const tutorSubjectsColFound = Object.keys(colIdx.tutorSubjects).every((col)=>
//         (colIdx.tutorSubjects[col] !== -1))
//         if (!(outerColFound &&
//             personalDataColFound &&
//             contactDataColFound &&
//             tutorSubjectsColFound)){
//               alert("Inaccurate Data format ")
//               console.log("Index of columns :", colIdx)
//               return
//             }
//       return colIdx
// }

// const parseSubjects = (
//     level: EducationLevel,
//     rawSubjects: string
//   ): Subject[] => {
//     const subjectsArr: Subject[] = []
//     const searchPhrase = 'I would not like to teach'
//     if (!rawSubjects || rawSubjects.includes(searchPhrase)) return subjectsArr
//     let rawSubjectArr: string[] = rawSubjects.split(",")
//     rawSubjectArr = rawSubjectArr.map((subj)=>subj.trim().toLowerCase())
//     switch (level){
//         case (EducationLevel.Primary):
//             for (let rawSubject of rawSubjectArr){
//                 subjectsArr.push(primarySubjectTextToEnumMapping[rawSubject])
//             }
//             break;
//         case (EducationLevel.UpperSecondary):
//             for (let rawSubject of rawSubjectArr){
//                 subjectsArr.push(secondarySubjectTextToEnumMapping[rawSubject])
//             }
//             break;
//         case (EducationLevel.LowerSecondary):
//             for (let rawSubject of rawSubjectArr){
//                 subjectsArr.push(secondarySubjectTextToEnumMapping[rawSubject])
//             }
//             break;
//         case (EducationLevel.JuniorCollege):
//             for (let rawSubject of rawSubjectArr){
//                 subjectsArr.push(jcSubjectTextToEnumMapping[rawSubject])
//             }
//         break;    
//         case (EducationLevel.InternationalBaccalaureate):
//             for (let rawSubject of rawSubjectArr){
//                 subjectsArr.push(ibSubjectTextToEnumMapping[rawSubject])
//             }
//         break;
//         }
//     // console.log(rawSubjectArr, "parsed : ", subjectsArr)
//     return subjectsArr
//   }
  
//   const parseStream = (stream: string): SecondaryStream[] => {
//     stream = stream.toLowerCase()
//     const streamArr: SecondaryStream[] = []
//     if (!stream) return streamArr
//     if (stream.includes('international baccalaureate')) streamArr.push(SecondaryStream.InternationalBaccalaureate);
//     if (stream.includes('normal academic')) streamArr.push(SecondaryStream.NormalAcademic);
//     if (stream.includes('normal technical')) streamArr.push(SecondaryStream.NormalTechnical);
//     if (stream.includes('integrated program ')) streamArr.push(SecondaryStream.IntegratedProgramme);
//     if (stream.includes('express')) streamArr.push(SecondaryStream.Express);
//     return streamArr
//   }
  
//   const parseGender = (gender: string) : Gender | undefined => {
//     gender = gender.toLowerCase()
//     if (gender.includes("female")) return Gender.Female
//     if (gender.includes("male")) return Gender.Male
//     return undefined
//   }

//   const parseProBonoPreference = (proBonoPref: string):boolean | undefined => {
//     proBonoPref = proBonoPref.toLowerCase()
//     if (proBonoPref.includes("free") || proBonoPref.includes("both")) return true
//     if (proBonoPref.includes("opt out") && proBonoPref.includes("receive renumeration")) return false
//     return undefined
//   }
//   const parseUnaidedPreference = (unaidedPref: string):boolean | undefined => {
//     unaidedPref = unaidedPref.toLowerCase()
//     if (unaidedPref.includes("yes")) return true
//     if (unaidedPref.includes("no")) return false
//     return undefined
//   }

// export const transformKSTutorData = (data: MatrixData[]): Tutor[] => {
//     const parsedTutorData : Tutor[] = []
//     const colIdx = findIdxKSTutor(data[0])
//     if (!colIdx) return parsedTutorData
//     data.shift()
//     for (let rowDataIdx in data){
//         const rowData = data[rowDataIdx]
//         const tutor: Tutor = {
//             personalData: {},
//             acceptableSecondaryStreams: [],
//             tutorSubjects: {}
//           }
//         tutor.personalData = {
//             index: (parseInt(rowDataIdx)+2),
//             name: rowData[colIdx.personalData.name],
//             gender: parseGender(rowData[colIdx.personalData.gender]),
//             contact: {
//                 phone: parseInt(rowData[colIdx.personalData.contact.phone])
//             }
//         }
//         tutor.isProBonoOk = parseProBonoPreference(rowData[colIdx.isProBonoOk])
//         tutor.isUnaidedOk = parseUnaidedPreference(rowData[colIdx.isUnaidedOk])
//         tutor.acceptableSecondaryStreams = parseStream(rowData[colIdx.acceptableSecondaryStreams])

//         const primary = parseSubjects(EducationLevel.Primary, rowData[colIdx.tutorSubjects.primary])
//         const lowerSecondary = parseSubjects(EducationLevel.LowerSecondary, rowData[colIdx.tutorSubjects.lowerSecondary])
//         const upperSecondary = parseSubjects(EducationLevel.UpperSecondary, rowData[colIdx.tutorSubjects.upperSecondary])
//         const jc = parseSubjects(EducationLevel.JuniorCollege, rowData[colIdx.tutorSubjects.jc])
//         const ib = parseSubjects(EducationLevel.InternationalBaccalaureate, rowData[colIdx.tutorSubjects.ib])
//         tutor.tutorSubjects = {
//             primary,
//             lowerSecondary,
//             upperSecondary,
//             jc,
//             ib
//         }        
//         parsedTutorData.push(tutor)
//     }
//     return parsedTutorData
//   }
  

  
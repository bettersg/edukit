import {
    EducationLevel,
    SecondaryStream,
    PrimarySubjects,
    SecondarySubjects,
    JCSubjects,
    IBSubjects,
  } from '@/types/educationSubjects'

  export const primarySubjectTextToEnumMapping = {
    "english":PrimarySubjects.English,
    "math":PrimarySubjects.Math,
    "science":PrimarySubjects.Science,
    "chinese":PrimarySubjects.Chinese,
    "malay":PrimarySubjects.Malay,
    "tamil":PrimarySubjects.Tamil
}
export const secondarySubjectTextToEnumMapping = {
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
  export const jcSubjectTextToEnumMapping = {
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
  export const ibSubjectTextToEnumMapping = {
  }
  export const educationLevelMapping = {
    "jc2":EducationLevel.JuniorCollege,
    "jc1":EducationLevel.JuniorCollege,
    "s5":EducationLevel.UpperSecondary,
    "s4":EducationLevel.UpperSecondary,
    "s3":EducationLevel.UpperSecondary,
    "s2":EducationLevel.LowerSecondary,
    "s1":EducationLevel.LowerSecondary,
    "p6":EducationLevel.Primary,
    "p5":EducationLevel.Primary,
    "p4":EducationLevel.Primary,
    "p3":EducationLevel.Primary,
    "p2":EducationLevel.Primary,
    "p1":EducationLevel.Primary,
  }

  export const educationLevelSubjectMappingMapping = {
    [EducationLevel.JuniorCollege]: jcSubjectTextToEnumMapping,
    [EducationLevel.InternationalBaccalaureate]: ibSubjectTextToEnumMapping,
    [EducationLevel.UpperSecondary]: secondarySubjectTextToEnumMapping,
    [EducationLevel.LowerSecondary]: secondarySubjectTextToEnumMapping,
    [EducationLevel.Primary]: primarySubjectTextToEnumMapping,
  }

  export const streamMapping = {
    "express": SecondaryStream.Express,
    "normal academic (na)": SecondaryStream.NormalAcademic,
    "normal technical (nt)": SecondaryStream.NormalTechnical,
    "integrated program (ip)": SecondaryStream.IntegratedProgramme,
    "international baccalaureate (ib)": SecondaryStream.InternationalBaccalaureate
  }
  
  

  // Keep all identifiers below in lower case
  export const colIdentifierContentMapping = {
    personalData: {
        name: ['name', 'tutee'],
        gender: ['gender', 'tutee'],
        contact: {
            phone:['contact number']
        }
    },
    PreferedGender: ['gender', 'preference'],
    isOnFinancialAid: ['financial aid'],
    EducationLevel: ['level','education'],
    secondaryStream: ['stream'], //not used
    subjects:['subject']
    }          
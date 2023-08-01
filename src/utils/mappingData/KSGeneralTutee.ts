  import {
    EducationLevel,
    SecondaryStream,
    PrimarySubjects,
    SecondarySubjects,
    JCSubjects,
    IBSubjects,
  } from '@/types/educationSubjects'

  // all the key values to be kept in lower case
  
  export const primarySubjectTextToEnumMapping = {
    "english language": PrimarySubjects.English,
    "mathematics": PrimarySubjects.Math,
    "science": PrimarySubjects.Science,
    "chinese language": PrimarySubjects.Chinese,
    "malay language": PrimarySubjects.Malay,
    "tamil language": PrimarySubjects.Tamil,
    "social studies": PrimarySubjects.SocialStudies
  }
  export const secondarySubjectTextToEnumMapping = {
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
  export const jcSubjectTextToEnumMapping = {
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
  export const ibSubjectTextToEnumMapping = {
    "english language": IBSubjects.English,
    "chinese language": IBSubjects.Chinese,
    "mathematics": IBSubjects.MathSL,
    "geography": IBSubjects.GeographySL,
    "history": IBSubjects.HistorySL,
    "english literature": IBSubjects.EnglishLiteratureSL,
    "economics":IBSubjects.EconomicsSL,
    "biology": IBSubjects.BiologySL,
    "physics": IBSubjects.PhysicsSL,
    "chemistry": IBSubjects.ChemistrySL,
    "mathematics (sl)": IBSubjects.MathSL,
    "geography (sl)": IBSubjects.GeographySL,
    "history (sl)": IBSubjects.HistorySL,
    "english literature (sl)": IBSubjects.EnglishLiteratureSL,
    "economics (sl)":IBSubjects.EconomicsSL,
    "biology (sl)": IBSubjects.BiologySL,
    "physics (sl)": IBSubjects.PhysicsSL,
    "chemistry (sl)": IBSubjects.ChemistrySL,
    "mathematics (hl)": IBSubjects.MathHL,
    "geography (hl)": IBSubjects.GeographyHL,
    "history (hl)": IBSubjects.HistoryHL,
    "english literature (hl)": IBSubjects.EnglishLiteratureHL,
    "economics (hl)": IBSubjects.EconomicsHL,
    "biology (hl)": IBSubjects.BiologyHL,
    "physics (hl)": IBSubjects.PhysicsHL,
    "chemistry (hl)": IBSubjects.ChemistryHL
  }
  export const educationLevelMapping = {
    "international baccalaureate (ib) grade 12": EducationLevel.InternationalBaccalaureate,
    "international baccalaureate (ib) grade 11": EducationLevel.InternationalBaccalaureate,
    "international baccalaureate (ib)": EducationLevel.InternationalBaccalaureate,
    "junior college (jc) 2": EducationLevel.JuniorCollege,
    "junior college (jc) 1": EducationLevel.JuniorCollege,
    "secondary 5": EducationLevel.UpperSecondary,
    "secondary 4": EducationLevel.UpperSecondary,
    "secondary 3": EducationLevel.UpperSecondary,
    "secondary 2": EducationLevel.LowerSecondary,
    "secondary 1": EducationLevel.LowerSecondary,
    "primary 6":EducationLevel.Primary,
    "primary 5":EducationLevel.Primary,
    "primary 4":EducationLevel.Primary,
    "primary 3":EducationLevel.Primary,
    "primary 2":EducationLevel.Primary,
    "primary 1":EducationLevel.Primary,
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
  export const finAidMapping = {
    "yes": true,
    "no": false
  }
  // Keep all identifiers below in lower case
  export const colIdentifierContentMapping = {
    personalData: {
        name: ['name', 'tutee'],
        gender: ['gender'],
        contact: {
            phone:['phone']
        }
    },
    PreferedGender: ['gender', '?'],
    isOnFinancialAid: ['financial aid'],
    EducationLevel: ['level of education'],
    secondaryStream: ['stream'],
    subjects:['subject']
    }  
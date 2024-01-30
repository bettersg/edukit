import {
  EducationLevel,
  SecondaryStream,
  SecondarySubjects,
  JCSubjects,
} from '@/types/educationSubjects';

export const subjectMappings = {
  'additional mathematics': SecondarySubjects.AMath,
  biology: SecondarySubjects.Biology,
  chemistry: SecondarySubjects.Chemistry,
  chinese: SecondarySubjects.Chinese,
  'combined science (biology + chemistry)': [SecondarySubjects.CombinedScienceBiology, SecondarySubjects.CombinedScienceChemistry],
  'combined science (physics + biology)': [SecondarySubjects.CombinedSciencePhysics, SecondarySubjects.CombinedScienceBiology],
  'combined science (physics + chemistry)': [SecondarySubjects.CombinedSciencePhysics, SecondarySubjects.CombinedScienceChemistry],
  economics: SecondarySubjects.Economics, // just added
  'elect geog': SecondarySubjects.ElectGeography,
  'elect history': SecondarySubjects.ElectHistory,
  'elect literature': SecondarySubjects.ElectLiterature,
  english: SecondarySubjects.English,
  'elementary math': SecondarySubjects.EMath,
  physics: SecondarySubjects.Physics,
  'pure geography': SecondarySubjects.Geography,
  'pure history': SecondarySubjects.History,
  'pure literature': SecondarySubjects.EnglishLiterature,
  'biology (h1)': JCSubjects.H1Biology,
  'biology (h2)': JCSubjects.H2Biology,
  'chemistry (h1)': JCSubjects.H1Chemistry,
  'chemistry (h2)': JCSubjects.H2Chemistry,
  'economics (h1)': JCSubjects.H1Econs,
  'economics (h2)': JCSubjects.H2Econs,
  'geography (h1)': JCSubjects.H1Geography,
  'geography (h2)': JCSubjects.H2Geography,
  'gp (h1)': JCSubjects.GeneralPaper,
  'history (h1)': JCSubjects.H1History,
  'history (h2)': JCSubjects.H2History,
  'literature (h1)': JCSubjects.H1EnglishLiterature,
  'literature (h2)': JCSubjects.H2EnglishLiterature,
  'mathematics (h1)': JCSubjects.H1Math,
  'mathematics (h2)': JCSubjects.H2Math,
  'physics (h1)': JCSubjects.H1Physics,
  'physics (h2)': JCSubjects.H2Physics,
}

export const secondarySubjectTextToEnumMapping = {
  'additional mathematics': SecondarySubjects.AMath,
  biology: SecondarySubjects.Biology,
  chemistry: SecondarySubjects.Chemistry,
  chinese: SecondarySubjects.Chinese,
  'combined science (biology + chemistry)': [SecondarySubjects.CombinedScienceBiology, SecondarySubjects.CombinedScienceChemistry],
  'combined science (physics + biology)': [SecondarySubjects.CombinedSciencePhysics, SecondarySubjects.CombinedScienceBiology],
  'combined science (physics + chemistry)': [SecondarySubjects.CombinedSciencePhysics, SecondarySubjects.CombinedScienceChemistry],
  economics: SecondarySubjects.Economics, // just added
  'elect geog': SecondarySubjects.ElectGeography,
  'elect history': SecondarySubjects.ElectHistory,
  'elect literature': SecondarySubjects.ElectLiterature,
  english: SecondarySubjects.English,
  'elementary math': SecondarySubjects.EMath,
  physics: SecondarySubjects.Physics,
  'pure geography': SecondarySubjects.Geography,
  'pure history': SecondarySubjects.History,
  'pure literature': SecondarySubjects.EnglishLiterature,
};

export const jcSubjectTextToEnumMapping = {
  'biology (h1)': JCSubjects.H1Biology,
  'biology (h2)': JCSubjects.H2Biology,
  'chemistry (h1)': JCSubjects.H1Chemistry,
  'chemistry (h2)': JCSubjects.H2Chemistry,
  'economics (h1)': JCSubjects.H1Econs,
  'economics (h2)': JCSubjects.H2Econs,
  'geography (h1)': JCSubjects.H1Geography,
  'geography (h2)': JCSubjects.H2Geography,
  'gp (h1)': JCSubjects.GeneralPaper,
  'history (h1)': JCSubjects.H1History,
  'history (h2)': JCSubjects.H2History,
  'literature (h1)': JCSubjects.H1EnglishLiterature,
  'literature (h2)': JCSubjects.H2EnglishLiterature,
  'mathematics (h1)': JCSubjects.H1Math,
  'mathematics (h2)': JCSubjects.H2Math,
  'physics (h1)': JCSubjects.H1Physics,
  'physics (h2)': JCSubjects.H2Physics,
};

export const educationLevelMapping = {
  'jc 2': EducationLevel.JuniorCollege,
  'jc 1': EducationLevel.JuniorCollege,
  'a level private candidate': EducationLevel.JuniorCollege,
  'secondary 5': EducationLevel.UpperSecondary,
  'secondary 4': EducationLevel.UpperSecondary,
  'secondary 3': EducationLevel.UpperSecondary,
  'o level private candidate': EducationLevel.UpperSecondary,
  // there's an others option that was not handled for
};

export const educationLevelSubjectMapping = {
  [EducationLevel.JuniorCollege]: jcSubjectTextToEnumMapping,
  [EducationLevel.UpperSecondary]: secondarySubjectTextToEnumMapping,
};

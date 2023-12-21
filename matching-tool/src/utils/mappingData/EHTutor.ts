import {
  SecondarySubjects,
  JCSubjects,
  EducationLevel,
} from '@/types/educationSubjects';

export const secondarySubjectTextToEnumMapping = {
  // 'combined science (biology + chemistry)': [SecondarySubjects.CombinedScienceBiology, SecondarySubjects.CombinedScienceChemistry],
  // 'combined science (physics + biology)': [SecondarySubjects.CombinedSciencePhysics, SecondarySubjects.CombinedScienceBiology],
  // 'combined science (physics + chemistry)': [SecondarySubjects.CombinedSciencePhysics, SecondarySubjects.CombinedScienceChemistry],
  'additional mathematics': SecondarySubjects.AMath,
  chinese: SecondarySubjects.Chinese,
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
  biology: SecondarySubjects.Biology,
  chemistry: SecondarySubjects.Chemistry,
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

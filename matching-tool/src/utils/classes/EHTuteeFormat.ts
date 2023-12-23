import { Subject, Tutee } from '@/types/person';
import GenericFormat, { DataFormat } from './GenericFormat';
import { DataFormatter } from './GenericFormat';
import { MatrixData } from '@/types/google-sheets';
import { EducationLevel } from '@/types/educationSubjects';
import {
  educationLevelMapping,
  educationLevelSubjectMapping,
  subjectMappings,
} from '../mappingData/EHTutee';

export default class EHTuteeFormat extends GenericFormat {
  constructor(data: MatrixData[]) {
    const format: DataFormat = [
      {
        fieldName: 'index',
        type: 'number',
        getterType: 'row_index',
      },
      {
        fieldName: 'name',
        type: 'string',
        getterType: 'cell_value',
        columnKeywords: ['name'],
      },
      // {
      //   fieldName: 'contact',
      //   type: 'number',
      //   getterType: 'cell_value',
      //   columnKeywords: ['number'],
      // },// but google form says need to fill in the telegram handle, and contact number is optional
      {
        fieldName: 'educationLevel',
        type: 'string',
        getterType: 'cell_value',
        columnKeywords: ['level of education'],
        multipleColumns: true,
        filter: {
          params: educationLevelMapping,
          noMatchValue: EducationLevel.undefined,
        },
      },
      {
        fieldName: 'subjects',
        type: 'string',
        getterType: 'cell_value',
        columnKeywords: ['subject'],
        multipleColumns: true,
      },
      {
        fieldName: 'firstTutorIndex',
        type: 'number',
        getterType: 'cell_value',
        columnKeywords: ['first', 'tutor'],
      },
      {
        fieldName: 'secondTutorIndex',
        type: 'number',
        getterType: 'cell_value',
        columnKeywords: ['second', 'tutor'],
      },
      {
        fieldName: 'thirdTutorIndex',
        type: 'number',
        getterType: 'cell_value',
        columnKeywords: ['third', 'tutor'],
      },
    ];
    super(data, format);
  }

  public getRelevantData() {
    const rawData = super.parseRawData();

    return rawData.map(tutee => {
      return {
        personalData: {
          index: tutee['index'] as number,
          name: tutee['name'] as string,
          // contact: {
          //   phone: tutee['contact'] as number,
          // },
        },
        educationLevel:
          tutee['educationLevel'] !== EducationLevel.undefined
            ? (tutee['educationLevel'] as EducationLevel[])[0]
            : EducationLevel.undefined,
        tutorPreference: {
          firstTutorIndex: tutee['firstTutorIndex'] as number,
          secondTutorIndex: tutee['secondTutorIndex'] as number,
          thirdTutorIndex: tutee['thirdTutorIndex'] as number,
        },
        subjects: (tutee['subjects'] as string[])
            .map(subject => {
              try {
                return educationLevelSubjectMapping[
                  tutee['educationLevel'] as EducationLevel
                ][subject.toLowerCase()];
              } catch {
                return undefined;
              }
            })
          .flat(Infinity)
          .filter(subject => subject !== undefined)
      };
    });
  }
}

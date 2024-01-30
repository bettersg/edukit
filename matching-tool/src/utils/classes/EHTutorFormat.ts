import { Tutor } from '@/types/person';
import GenericFormat, { DataFormat } from './GenericFormat';
import { MatrixData } from '@/types/google-sheets';
import {
  EducationLevel,
  JCSubjects,
  SecondarySubjects,
} from '@/types/educationSubjects';
import { DataFormatter } from './GenericFormat';
import { secondarySubjectTextToEnumMapping, jcSubjectTextToEnumMapping } from '../mappingData/EHTutor';

export default class EHTutorFormat
  extends GenericFormat
  implements DataFormatter<Tutor>
{
  constructor(data: MatrixData[]) {
    const format: DataFormat = [
      {
        fieldName: 'index',
        type: 'number',
        getterType: 'cell_value',
        columnKeywords: ['code'], // not row no. anymore, its the 4-digit code
      },
      {
        fieldName: 'name',
        type: 'string',
        getterType: 'cell_value',
        columnKeywords: ['name'],
      },
      {
        fieldName: 'acceptableEducationLevels',
        type: 'csv',
        getterType: 'cell_value',
        columnKeywords: ['level', 'education'],
        mapping: {
          both: [EducationLevel.UpperSecondary, EducationLevel.JuniorCollege],
          'a level': EducationLevel.JuniorCollege,
          'o level': EducationLevel.UpperSecondary,
        },
      },
      {
        fieldName: 'upperSecondary',
        type: 'string',
        getterType: 'cell_value',
        columnKeywords: ['subject'],
        multipleColumns: true,
        filter: {
          params: secondarySubjectTextToEnumMapping,
        },
      },
      {
        fieldName: 'jc',
        type: 'string',
        getterType: 'cell_value',
        columnKeywords: ['subject'],
        multipleColumns: true,
        filter: {
          params: jcSubjectTextToEnumMapping,
        },
      },
      {
        fieldName: 'noOfStudents',
        type: 'number',
        getterType: 'cell_value',
        columnKeywords: ['take up'],
      },
    ];
    super(data, format);
  }

  public getRelevantData() {
    const rawData = super.parseRawData();
    return rawData.map(tutor => {
      const acceptableEducationLevels = tutor['acceptableEducationLevels'] as EducationLevel[];
 
      const formattedData = {
        personalData: {
          index: tutor['index'] as number,
          name: tutor['name'] as string
        },
        acceptableEducationLevels: tutor['acceptableEducationLevels'] as EducationLevel[],
        tutorSubjects: {
          upperSecondary: !acceptableEducationLevels.includes(EducationLevel.UpperSecondary) 
          ? [] 
          : (tutor['upperSecondary'] as SecondarySubjects[]),
        jc: !acceptableEducationLevels.includes(EducationLevel.JuniorCollege) 
        ? [] 
        : (tutor['jc'] as JCSubjects[]),
        },
        noOfStudents: tutor['noOfStudents'] as number
      };
      return formattedData;
    });
  }
}

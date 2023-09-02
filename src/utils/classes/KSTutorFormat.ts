import { Gender, Tutor } from '@/types/person';
import GenericFormat, { DataFormat } from './GenericFormat';
import { MatrixData } from '@/types/google-sheets';
import {
  EducationLevel,
  IBSubjects,
  JCSubjects,
  PrimarySubjects,
  SecondaryStream,
  SecondarySubjects,
} from '@/types/educationSubjects';
import { DataFormatter } from './GenericFormat';
import {
  ibSubjectTextToEnumMapping,
  jcSubjectTextToEnumMapping,
  primarySubjectTextToEnumMapping,
  secondarySubjectTextToEnumMapping,
} from '../mappingData/KSTutor';

export default class KSTutorFormat
  extends GenericFormat
  implements DataFormatter<Tutor>
{
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
      {
        fieldName: 'gender',
        type: 'string',
        getterType: 'cell_value',
        columnKeywords: ['gender'],
        filter: {
          params: [Gender.Female, Gender.Male],
        },
      },
      {
        fieldName: 'phone',
        type: 'number',
        getterType: 'cell_value',
        columnKeywords: ['number'],
      },
      {
        fieldName: 'isProBonoOk',
        type: 'boolean',
        getterType: 'cell_value',
        columnKeywords: ['pro-bono'],
        filter: {
          boolParams: {
            true: ['free', '|both'],
            false: ['opt out', 'receive remuneration'],
          },
          noMatchValue: undefined,
        },
      },
      {
        fieldName: 'isUnaidedOk',
        type: 'boolean',
        getterType: 'cell_value',
        columnKeywords: ['financial aid'],
        filter: {
          boolParams: {
            true: 'yes',
            false: 'no',
          },
          noMatchValue: undefined,
        },
      },
      {
        fieldName: 'acceptableSecondaryStreams',
        type: 'csv',
        getterType: 'cell_value',
        columnKeywords: ['stream'],
        mapping: {
          'international baccalaureate':
            SecondaryStream.InternationalBaccalaureate,
          'normal academic': SecondaryStream.NormalAcademic,
          'normal technical': SecondaryStream.NormalTechnical,
          'integrated program': SecondaryStream.IntegratedProgramme,
          express: SecondaryStream.Express,
        },
      },
      {
        fieldName: 'primary',
        type: 'csv',
        getterType: 'cell_value',
        columnKeywords: ['primary', 'subject'],
        mapping: primarySubjectTextToEnumMapping,
      },
      {
        fieldName: 'lowerSecondary',
        type: 'csv',
        getterType: 'cell_value',
        columnKeywords: ['lower secondary', 'subject'],
        mapping: secondarySubjectTextToEnumMapping,
      },
      {
        fieldName: 'upperSecondary',
        type: 'csv',
        getterType: 'cell_value',
        columnKeywords: ['upper secondary', 'subject'],
        mapping: secondarySubjectTextToEnumMapping,
      },
      {
        fieldName: 'jc',
        type: 'csv',
        getterType: 'cell_value',
        columnKeywords: ['jc', 'subject'],
        mapping: jcSubjectTextToEnumMapping,
      },
      {
        fieldName: 'international baccalaureate',
        type: 'csv',
        getterType: 'cell_value',
        columnKeywords: ['international baccalaureate', 'subject'],
        mapping: ibSubjectTextToEnumMapping,
      },
      {
        fieldName: 'commitWk',
        type: 'number',
        getterType: 'cell_value',
        columnKeywords: ['commit', 'week'],
      },
      {
        fieldName: 'commitYr',
        type: 'string',
        getterType: 'cell_value',
        columnKeywords: ['commit', '!week'],
      },
    ];
    super(data, format);
  }

  public fromDataMatrix() {
    const rawData = super.rawFromGSheets();
    // console.log("Raw Data", rawData)
    return rawData.map(tutor => {
      // console.log(tutor)
      const formattedData = {
        personalData: {
          index: tutor['index'] as number,
          name: tutor['name'] as string,
          gender: tutor['gender'] as Gender,
          contact: {
            phone: tutor['phone'] as number,
          },
        },
        isProBonoOk: tutor['isProBonoOk'] as boolean,
        isUnaidedOk: tutor['isUnaidedOk'] as boolean,
        acceptableSecondaryStreams: tutor[
          'acceptableSecondaryStreams'
        ] as SecondaryStream[],
        tutorSubjects: {
          primary: tutor['primary'] as PrimarySubjects[],
          lowerSecondary: tutor['lowerSecondary'] as SecondarySubjects[],
          upperSecondary: tutor['upperSecondary'] as SecondarySubjects[],
          jc: tutor['jc'] as JCSubjects[],
          ib: tutor['international baccalaureate'] as IBSubjects[],
        },
        commitStr: `${tutor['commitWk']} hr${
          tutor['commitWk'] == 1 ? '' : 's'
        }/wk — ${tutor['commitYr']}`,
      };
      // console.log(tutor, formattedData)
      return formattedData;
    });
  }
}

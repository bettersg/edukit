import { Gender, PreferedGender, Tutee } from "@/types/person";
import GenericFormat, { DataFormat } from "./GenericFormat";
import { MatrixData } from "@/types/google-sheets";
import { EducationLevel, IBSubjects, JCSubjects, PrimarySubjects, SecondaryStream, SecondarySubjects } from "@/types/educationSubjects";
import { DataFormatter } from './GenericFormat';
import { educationLevelMapping, educationLevelSubjectMappingMapping, streamMapping, finAidMapping } from "../mappingData/KSGeneralTutee";

export default class KSGeneralTuteeFormat extends GenericFormat implements DataFormatter<Tutee> {
    constructor(data: MatrixData[]) {
        const format: DataFormat = [
            {
                fieldName: "index",
                type: "number",
                getterType: "row_index"
            },
            {
                fieldName: "name",
                type: "string",
                getterType: "cell_value",
                columnKeywords: ["name"]
            },
            {
                fieldName: "gender",
                type: "string",
                getterType: "cell_value",
                columnKeywords: ["gender"],
                filter: {
                    params: [Gender.Female, Gender.Male],
                }
            },
            {
                fieldName: "phone",
                type: "number",
                getterType: "cell_value",
                columnKeywords: ["phone"]
            },
            {
                fieldName: "preferedGender",
                type: "string",
                getterType: "cell_value",
                columnKeywords: ["gender", "?"],
                filter: {
                    params: [PreferedGender.Female, PreferedGender.Male] as string[],
                    noMatchValue: PreferedGender.None,
                }
            },
            {
                fieldName: "educationLevel",
                type: "string",
                getterType: "cell_value",
                columnKeywords: ["level of education","2023"],
                filter: {
                    params: educationLevelMapping, // because of the ordering of this variable, the first index will be the highest education level
                    noMatchValue: EducationLevel.undefined
                }
            },
            {
                fieldName: "secondaryStream",
                type: "string",
                getterType: "cell_value",
                columnKeywords: ["stream"],
                filter: {
                    params: streamMapping,
                    noMatchValue: undefined
                }
            },
            {
                fieldName: "subjects",
                type: "csv",
                getterType: "cell_value",
                columnKeywords: ["subject"],
                multipleColumns: true,
            },
            {
                fieldName: "isOnFinancialAid",
                type: "string",
                getterType: "cell_value",
                columnKeywords: ["financial aid", "currently on"],
                filter: {
                    params: finAidMapping,
                    noMatchValue: SecondaryStream.undefined
                }
            }
        ]
        super(data, format)
    }

    public fromDataMatrix() {
        const rawData = super.rawFromGSheets();
        console.log("rawData", rawData, "format", this.format)
        return rawData.map((tutee) => (
            {
                personalData: {
                    index: tutee["index"] as number,
                    name: tutee["name"] as string,
                    gender: tutee["gender"] as Gender,
                    contact: {
                        phone: tutee["phone"] as number,
                    }
                },
                preferedGender: tutee["preferedGender"] as PreferedGender,
                isOnFinancialAid: true, // for parity with parseKSSSOTuteeData.ts, I assume this is todo
                educationLevel: tutee["educationLevel"] as EducationLevel,
                secondaryStream: tutee["secondaryStream"] as SecondaryStream,
                subjects: ((tutee["subjects"] as string[][]).map(col => 
                    col.map(subject => educationLevelSubjectMappingMapping[tutee["educationLevel"] as EducationLevel][subject.toLowerCase()])) )
                    .flat(1)
                    .filter(subject => subject !== undefined),
            }
        ))
    }
} 

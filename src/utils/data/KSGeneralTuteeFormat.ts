import { Gender, PreferedGender, Tutee } from "@/types/person";
import GenericFormat, { DataFormat } from "./GenericFormat";
import { MatrixData } from "@/types/google-sheets";
import { EducationLevel, IBSubjects, JCSubjects, PrimarySubjects, SecondaryStream, SecondarySubjects } from "@/types/educationSubjects";
import { DataFormatter } from './GenericFormat';
import { educationLevelMapping, educationLevelSubjectMappingMapping, streamMapping, finAidMapping } from "../mappingData/KSGeneralTutee";
import { string } from "prop-types";

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
                columnKeywords: ["level of education"],
                multipleColumns: true,
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
                    noMatchValue: SecondaryStream.undefined
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
                    noMatchValue: undefined
                }
            }
        ]
        super(data, format)
    }

    private findHighestListedEduLevel = (eduLevelEntries : string[]) : EducationLevel => {
        const educationLevelStrArr = Object.values(EducationLevel)
        for (let eduLevelOption of educationLevelStrArr){
            if (eduLevelEntries.includes(eduLevelOption as EducationLevel)) {
                return eduLevelOption as EducationLevel
            }
        }
        return EducationLevel.undefined
    }

    public fromDataMatrix() {
        const rawData = super.rawFromGSheets();
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
                isOnFinancialAid: tutee["isOnFinancialAid"] as boolean | undefined, 
                // educationLevel: tutee["educationLevel"] as EducationLevel,
                educationLevel: this.findHighestListedEduLevel(tutee["educationLevel"] as string[]),
                secondaryStream: tutee["secondaryStream"] as SecondaryStream,
                // subjects:[]
                subjects: ((tutee["subjects"] as string[][]).map(col => 
                    col.map((subject) => {
                        try{
                            return educationLevelSubjectMappingMapping[tutee["educationLevel"] as EducationLevel][subject.toLowerCase()]
                        } catch{
                            return undefined
                        }
                    })
                    )
                    )
                    .flat(1)
                    .filter(subject => subject !== undefined),
            }
        ))
    }
} 

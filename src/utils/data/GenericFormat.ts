import { GSheetsData } from "@/types/google-sheets";



export type DataFormat = (
    // Shared parameters
    {
        fieldName: string
    } & (
        {
            type: "number",
            /**
             * Method of how the value is retrieved
             * @param row_index Value retrieved is the row index (starting at 1)
             * @param cell_value Value retrieved is the value of the cell, without any processing and given the column index
             */
            getterType: "row_index",
        } |
        {
            type: "string",
            /**
             * Method of how the value is retrieved
             * @param row_index Value retrieved is the row index (starting at 1)
             * @param cell_value Value retrieved is the value of the cell, without any processing and given the column index
             */
            getterType: "cell_value",
            columnIndex?: number,
            /**
             * Uses .findIndex on the headers row to find the column index of the column with the given name (case-insensitive). If the column name is not found, an error will be thrown.
             * 
             * If there are multiple items in the array, it acts as a boolean AND operator. If an item in the array starts with a `!`, it will act as a boolean NOT operator.
             * 
             * ## Examples
             * 
             * `["tutor", "money", "!tutee"]` -> Finds a column with a name containing "tutor" AND "money" AND NOT "tutee"
             */
            columnKeywords: string[],
            /**
             * Get an aggregate of multiple columns. If set to true, the output will be an array of strings, with each item in the array being the value of the corresponding column.
             * 
             * @default false
             */
            multipleColumns?: false,
            /**
             * Filters raw cell output. If an item of the array (case-insensitive) given is found within the cell output string, the string output becomes the array item that was found. 
             * 
             * If multiple array items are found, then the first one will be chosen.
             * 
             * The output of this is fed into the enumMapping if applicable.
             * ## Examples:
             * filter = `["male", "female"]`, cell output = `"I'm a MalE"` -> `"male"`
             * 
             * filter = `["male", "female"]`, cell output = `"Irrelevent text"` -> `undefined`
             * 
             * filter = `["male", "female"]`, cell output = `"I'm a mAlE and FEMale"` -> `"male"`
             */
            filter?: {
                /**
                 * Filters raw cell output.
                 * 
                 * ## Filter with array
                 * If an item of the array (case-insensitive) given is found within the cell output string, the string output becomes the array item that was found. 
                 * 
                 * If multiple array items are found, then the first one will be chosen.
                 * 
                 * ### Examples:
                 * filter params = `["male", "female"]`, cell output = `"I'm a MalE"` -> `"male"`
                 * 
                 * filter params= `["male", "female"]`, cell output = `"Irrelevent text"` -> `undefined`
                 * 
                 * ## Filter with object 
                 * Does the same thing as the filter array, but the string output is the object value to the corresponding object key that was found in the cell output string.
                 */
                params: string[] | Record<string, string | number | boolean>,
                /**
                 * If no matches are found with the filter params, this value will be returned.
                 * 
                 * @default undefined
                 */
                noMatchValue?: any,
                /**
                 * Uses strict equality to compare the cell output with the filter params. If set to true, the cell output must be the same (case-insensitive, trimmed) as the filter params to be considered a match.
                 * 
                 * Only implemented for type 'string', no multiple columns, and array params. 
                 * 
                 * @default false
                 */
                strictEquality?: boolean
            }
        } | {
            type: "string",
            /**
             * Method of how the value is retrieved
             * @param row_index Value retrieved is the row index (starting at 1)
             * @param cell_value Value retrieved is the value of the cell, without any processing and given the column index
             */
            getterType: "cell_value",
            columnIndex?: number[],
            /**
             * Uses .findIndex on the headers row to find the column index of the column with the given name (case-insensitive). If the column name is not found, an error will be thrown.
             * 
             * If there are multiple items in the array, it acts as a boolean AND operator. If an item in the array starts with a `!`, it will act as a boolean NOT operator.
             * 
             * ## Examples
             * 
             * `["tutor", "money", "!tutee"]` -> Finds a column with a name containing "tutor" AND "money" AND NOT "tutee"
             */
            columnKeywords: string[],
            /**
             * Get an aggregate of multiple columns. If set to true, the output will be an array of strings, with each item in the array being the value of the corresponding column.
             * 
             * Default is false.
             */
            multipleColumns: true,
            /**
             * Filters raw cell output. If an item of the array (case-insensitive) given is found within the cell output string, the string output becomes the array item that was found. 
             * 
             * If multiple array items are found, then the first one will be chosen.
             * 
             * The output of this is fed into the enumMapping if applicable.
             * ## Examples:
             * filter = `["male", "female"]`, cell output = `"I'm a MalE"` -> `"male"`
             * 
             * filter = `["male", "female"]`, cell output = `"Irrelevent text"` -> `undefined`
             * 
             * filter = `["male", "female"]`, cell output = `"I'm a mAlE and FEMale"` -> `"male"`
             */
            filter?: {
                /**
                 * Filters raw cell output.
                 * 
                 * ## Filter with array
                 * If an item of the array (case-insensitive) given is found within the cell output string, the string output becomes the array item that was found. 
                 * 
                 * If multiple array items are found, then the first one will be chosen.
                 * 
                 * ### Examples:
                 * filter params = `["male", "female"]`, cell output = `"I'm a MalE"` -> `"male"`
                 * 
                 * filter params= `["male", "female"]`, cell output = `"Irrelevent text"` -> `undefined`
                 * 
                 * ## Filter with object 
                 * Does the same thing as the filter array, but the string output is the object value to the corresponding object key that was found in the cell output string.
                 */
                params: string[] | Record<string, string | number | boolean>,
                /**
                 * If no matches are found with the filter params, this value will be returned. If not set, the default value is undefined.
                 */
                noMatchValue?: any
            }
        } 
        |
        {
            type: "number",
            /**
             * Method of how the value is retrieved
             * @param row_index Value retrieved is the row index (starting at 1)
             * @param cell_value Value retrieved is the value of the cell, without any processing and given the column index
             */
            getterType: "cell_value",
            columnIndex?: number,
            /**
             * Uses .findIndex on the headers row to find the column index of the column with the given name (case-insensitive). If the column name is not found, an error will be thrown.
             * 
             * If there are multiple items in the array, it acts as a boolean AND operator. If an item in the array starts with a `!`, it will act as a boolean NOT operator.
             * 
             * ## Examples
             * 
             * `["tutor", "money", "!tutee"]` -> Finds a column with a name containing "tutor" AND "money" AND NOT "tutee"
             */
            columnKeywords: string[],
            /**
             * Filters raw cell output. If an item of the array (case-insensitive) given is found within the cell output string, the string output becomes the array item that was found. 
             * 
             * If multiple array items are found, then the first one will be chosen.
             * 
             * The output of this is fed into the enumMapping if applicable.
             * ## Examples:
             * filter = `["male", "female"]`, cell output = `"I'm a MalE"` -> `"male"`
             * 
             * filter = `["male", "female"]`, cell output = `"Irrelevent text"` -> `undefined`
             * 
             * filter = `["male", "female"]`, cell output = `"I'm a mAlE and FEMale"` -> `"male"`
             */
            filter?: {
                /**
                 * Filters raw cell output.
                 * 
                 * ## Filter with object 
                 * The *string* output is the object value to the corresponding *number* object key that was equivalent to the cell output number.
                 */
                params: Record<number, string | number | boolean>,
                /**
                 * If no matches are found with the filter params, this value will be returned. If not set, the default value is undefined.
                 */
                noMatchValue?: any
            }
        } |
        {
            /**
             * Example of a valid CSV format:
             * `"Lorem, Ipsum, Dolor, sit, amet"`
             * Note that there are spaces after each comma.
             */
            type: "csv",
            getterType: "cell_value",
            columnIndex?: number,
            /**
             * Uses .findIndex on the headers row to find the column index of the column with the given name (case-insensitive). If the column name is not found, an error will be thrown.
             * 
             * If there are multiple items in the array, it acts as a boolean AND operator. If an item in the array starts with a `!`, it will act as a boolean NOT operator.
             * 
             * ## Examples
             * 
             * `["tutor", "money", "!tutee"]` -> Finds a column with a name containing "tutor" AND "money" AND NOT "tutee"
             */
            columnKeywords: string[],
            /**
             * Get an aggregate of multiple columns. If set to true, the output will be an array of an array of strings, with each array in the array being the value of the corresponding column.
             * 
             * Default is false.
             */
            multipleColumns?: false,
            /**
             * Acts similar to the filter with object. All array items that match exactly (case-sensitive) with the keys of the mapping 
             * object are added to the final output array as the corresponding value of the mapping object.
             */
            mapping?: Record<string, string>
        } |
        {
            /**
             * Example of a valid CSV format:
             * `"Lorem, Ipsum, Dolor, sit, amet"`
             * Note that there are spaces after each comma.
             */
            type: "csv",
            getterType: "cell_value",
            columnIndex?: number[],
            /**
             * Uses .findIndex on the headers row to find the column index of the column with the given name (case-insensitive). If the column name is not found, an error will be thrown.
             * 
             * If there are multiple items in the array, it acts as a boolean AND operator. If an item in the array starts with a `!`, it will act as a boolean NOT operator.
             * 
             * ## Examples
             * 
             * `["tutor", "money", "!tutee"]` -> Finds a column with a name containing "tutor" AND "money" AND NOT "tutee"
             */
            columnKeywords: string[],
            /**
             * Get an aggregate of multiple columns. If set to true, the output will be an array of an array of strings, with each array in the array being the value of the corresponding column.
             * 
             * Default is false.
             */
            multipleColumns: true,
            /**
             * Acts similar to the filter with object. All array items that are contained (case-insensitive) within the keys of the mapping 
             * object are added to the final output array as the corresponding value of the mapping object.
             */
            mapping?: Record<string, string> | Record<string, string>[]
        } | {
            type: "boolean",
            getterType: "cell_value",
            columnIndex?: number,
            /**
             * Uses .findIndex on the headers row to find the column index of the column with the given name (case-insensitive). If the column name is not found, an error will be thrown.
             * 
             * If there are multiple items in the array, it acts as a boolean AND operator. If an item in the array starts with a `!`, it will act as a boolean NOT operator.
             * 
             * ## Examples
             * 
             * `["tutor", "money", "!tutee"]` -> Finds a column with a name containing "tutor" AND "money" AND NOT "tutee"
             */
            columnKeywords: string[],
            
            filter: {
                /**
                 * boolParams has a different name than filter.params because in this case the key is the output and the value is the keyword. However, the searching acts the same as filter.params.
                 * 
                 * If an array of strings are used, it acts as a string of boolean AND operators unless an item in the array starts with a `|`, which will act as a boolean OR operator, but just for that item.
                 */
                boolParams: {
                    true: string | string[],
                    false: string | string[]
                },
                /**
                 * If no matches are found with the filter params, this value will be returned.
                 * 
                 * @default false
                 */
                noMatchValue?: any
            }
        }
    )
)[];

export type GenericRawOutputFormat = Record<string, string | string[] | number | boolean | (string|number)[] | (string|number)[][] | undefined>[];

export interface DataFormatter<OutputType extends Record<string, unknown>> {
    fromGSheetsData(): OutputType[];
}

/**
 * Generic format for getting tutor/tutee data from the DB. This class is intended to be extended to implement other formats.
 * 
 */

class GenericFormat {
    public format: DataFormat;
    public data: GSheetsData[];
    private columnsCompiled: boolean = false;
    private DEBUG: boolean = false;
 

    constructor (data: GSheetsData[], format: DataFormat) {
        this.data = data;

        this.format = format;

        this.compileColumns();

        if (this.DEBUG) console.log(this.format)

        
    }

    public compileColumns() {
        const headers = this.data[0];
        for (let [i, formatRule] of this.format.entries()) {
            if ("columnKeywords" in formatRule && formatRule.columnKeywords.length > 0 && formatRule.getterType == "cell_value") {
                if (!("multipleColumns" in formatRule) || !formatRule.multipleColumns) {
                    let headerIndex = (headers as string[]).findIndex((header) => {
                        let found = true;
                        if ("columnKeywords" in formatRule) {
                            for (let item of formatRule.columnKeywords) {
                                if (item.startsWith("!")) {
                                    found = found && !header.toLowerCase().includes(item.slice(1).toLowerCase());
                                } else {
                                    found = found && header.toLowerCase().includes(item.toLowerCase());
                                }
                            }
                        }
                        return found;
                    });

                    if (headerIndex == -1) {
                        throw new Error(`Column with keywords ${formatRule.columnKeywords} not found for format rule ${formatRule.fieldName}`);
                    }
                    formatRule.columnIndex = headerIndex;
                } else {
                    let headerIndices: number[] = [];
                    
                    for (let [i, header] of (headers as string[]).entries()) {
                        let found = true;
                        for (let item of formatRule.columnKeywords) {
                            if (item.startsWith("!")) {
                                found = found && !header.toLowerCase().includes(item.slice(1).toLowerCase());
                            } else {
                                found = found && header.toLowerCase().includes(item.toLowerCase());
                            }
                        }
                        if (found) {
                            headerIndices.push(i);
                        }
                    }
                    
                    if (headerIndices.length < 1) {
                        throw new Error(`Columns with keywords ${formatRule.columnKeywords} not found for format rule ${formatRule.fieldName}`);
                    } else {
                        formatRule.columnIndex = headerIndices;
                    }
                }
                
            }
        }
        this.columnsCompiled = true;
        return;
    }
    

    public rawFromGSheets(): GenericRawOutputFormat {
        if (!this.columnsCompiled) {
            throw new Error("Columns not compiled")
        }
        let output: GenericRawOutputFormat = [];
        let data = this.data.slice(1); // Remove first row (headers)
        for (const [i, row] of data.entries()) {
            let dataRow: GenericRawOutputFormat[number] = {};
            for (let formatRule of this.format) {
                if (formatRule.getterType == "row_index") {
                    if (formatRule.type !== "number") {
                        throw new TypeError("Row index can only be used in a number field", { cause: { code: "ROW_INDEX_NOT_NUMBER" } });
                    }
                    dataRow[formatRule.fieldName] = i + 2;
                }
                else if (formatRule.getterType == "cell_value") {
                    if (formatRule.type == "number") {
                        let raw = parseInt(row[formatRule.columnIndex!] as string);
                        if (isNaN(raw)) {
                            dataRow[formatRule.fieldName] = undefined;
                            continue;
                        }
                        if ("filter" in formatRule) {
                            if (formatRule.filter?.params instanceof Array) {
                                let filter = formatRule.filter.params;
                                let found = false;
                                for (let item of filter) {
                                    if (raw == item) {
                                        found = true;
                                        dataRow[formatRule.fieldName] = item;
                                        break;
                                    }
                                }
                                if (!found) {
                                    dataRow[formatRule.fieldName] = formatRule.filter?.noMatchValue;
                                }
                            } else if (formatRule.filter?.params.constructor.name === "Object") {
                                let filter = formatRule.filter.params;
                                let found = false;
                                for (let itemStr in filter) {
                                    let item = parseInt(itemStr);
                                    if (raw == item) {
                                        found = true;
                                        dataRow[formatRule.fieldName] = filter[item];
                                        break;
                                    }
                                }
                                if (!found) {
                                    dataRow[formatRule.fieldName] = formatRule.filter?.noMatchValue;
                                }
                            }
                        } else {
                            dataRow[formatRule.fieldName] = raw;
                        }
                    }
                    else if (formatRule.type == "string") {
                        if (formatRule.multipleColumns) {
                            let raw: string[] = formatRule.columnIndex!.map((index) => String(row[index]));
                            if ("filter" in formatRule) {
                                if (formatRule.filter?.params instanceof Array) {
                                    let filter = formatRule.filter.params;
                                    let found = false;
                                    let output: string[] = [];
                                    for (let item of filter) {
                                        for (let rawItem of raw) {
                                            if (rawItem.toLowerCase().includes(item.toLowerCase())) {
                                                found = true;
                                                output.push(String(item));
                                                break;
                                            }
                                        }
                                    }
                                    if (!found) {
                                        dataRow[formatRule.fieldName] = formatRule.filter?.noMatchValue;
                                    } else dataRow[formatRule.fieldName] = output;
                                } else if (formatRule.filter?.params.constructor.name === "Object") {
                                    let filter = formatRule.filter.params;
                                    let found = false;
                                    let output: string[] = [];
                                    for (let item in filter) {
                                        for (let rawItem of raw) {
                                            if (rawItem.toLowerCase().includes(item.toLowerCase())) {
                                                found = true;
                                                output.push(String(filter[item]));
                                                break;
                                            }
                                        }
                                    }
                                    if (!found) {
                                        dataRow[formatRule.fieldName] = formatRule.filter?.noMatchValue;
                                    } else dataRow[formatRule.fieldName] = output;
                                }
                            } else {
                                dataRow[formatRule.fieldName] = raw;
                            }
                        } else {
                            let raw = String(row[formatRule.columnIndex!]);
                            if ("filter" in formatRule) {
                                if (formatRule.filter?.params instanceof Array) {
                                    let filter = formatRule.filter.params;
                                    
                                    let found = false;
                                    for (let item of filter) {
                                        if (formatRule.filter?.strictEquality) {
                                            if (raw.toLowerCase().trim() == item.toLowerCase()) {
                                                found = true;
                                                dataRow[formatRule.fieldName] = item;
                                                break;
                                            }
                                        } else {
                                            if (raw.toLowerCase().includes(item.toLowerCase())) {
                                                found = true;
                                                dataRow[formatRule.fieldName] = item;
                                                break;
                                            }
                                        }
                                    }
                                    if (!found) {
                                        dataRow[formatRule.fieldName] = formatRule.filter?.noMatchValue;
                                    }
                                } else if (formatRule.filter?.params.constructor.name === "Object") {
                                    let filter = formatRule.filter.params;
                                    let found = false;
                                    for (let item in filter) {
                                        if (raw.toLowerCase().includes(item.toLowerCase())) {
                                            found = true;
                                            dataRow[formatRule.fieldName] = filter[item];
                                            break;
                                        }
                                    }
                                    if (!found) {
                                        dataRow[formatRule.fieldName] = formatRule.filter?.noMatchValue;
                                    }
                                }
                            } else {
                                dataRow[formatRule.fieldName] = raw;
                            }
                        }
                    }
                    else if (formatRule.type == "csv") {
                        if (formatRule.multipleColumns) {
                            let raw: string[][] = formatRule.columnIndex!.map((index) => String(row[index]).split(", "));
                            if ("mapping" in formatRule) {
                                if (!(formatRule.mapping instanceof Array)) {
                                    let mapped: (string|number)[][] = [];
                                    for (let arr of raw) {
                                        for (let item of arr) {
                                            let toPush: (string|number)[] = Object.keys(formatRule.mapping!)
                                                .filter(key => item.toLowerCase().trim().includes(key.toLowerCase()))
                                                .map(key => (formatRule as Extract<DataFormat[number], {type: "csv"}>).mapping![key]);
                                            mapped.push(toPush);
                                        }
                                    }
                                    dataRow[formatRule.fieldName] = mapped ?? [];
                                } else {
                                    let mapped: (string|number)[][] = [];
                                    for (let [i, arr] of raw.entries()) {
                                        for (let item of arr) {
                                            let toPush: (string|number)[] = Object.keys(formatRule.mapping![i]).filter(key => key.toLowerCase().includes(item.toLowerCase().trim())).map(key => (formatRule as Extract<DataFormat[number], {type: "csv"}>).mapping![i][key]);
                                            mapped.push(toPush);
                                        }
                                        
                                    }
                                    dataRow[formatRule.fieldName] = mapped ?? [];
                                }
                                
                            } else {
                                dataRow[formatRule.fieldName] = raw ?? [];
                            }
                        } else {
                            let raw: string[] = String(row[formatRule.columnIndex!]).split(", ");

                            if ("mapping" in formatRule) {
                                let mapped: (string|number)[] = [];
                                for (let item of raw) {
                                    for (let key in formatRule.mapping!) {
                                        if (item.toLowerCase().trim().includes(key.toLowerCase())) {
                                            mapped.push((formatRule as Extract<DataFormat[number], {type: "csv"}>).mapping![key]);
                                            break; // Possibly remove this break
                                        }
                                    }
                                }
                                dataRow[formatRule.fieldName] = mapped ?? [];
                            } else {
                                dataRow[formatRule.fieldName] = raw ?? [];
                            }
                        }
                    }
                    else if (formatRule.type == "boolean") {
                        let raw: string = String(row[formatRule.columnIndex!]);
                        const string2bool = {
                            "true": true,
                            "false": false
                        }
                        if ("filter" in formatRule) {
                            let matched = false;
                            Object.keys(formatRule.filter!.boolParams).every((item) => {
                                let value = (formatRule as Extract<DataFormat[number], {type: "boolean"}>).filter!.boolParams[item as "true" | "false"];
                                let key = string2bool[item as "true" | "false"];

                                if (value instanceof Array) {
                                    let found = true;
                                    for (let filterItem of value) {
                                        
                                        if (filterItem.startsWith("|")) {
                                            found = found || raw.toLowerCase().trim().includes(filterItem.slice(1).toLowerCase());
                                        } else {
                                            found = found && raw.toLowerCase().trim().includes(filterItem.toLowerCase());
                                        }
                                    }
                                    if (found) {
                                        dataRow[formatRule.fieldName] = key;
                                        matched = true;

                                        return false;
                                    }
                                } else {
                                    if (raw.toLowerCase().trim().includes(value.toLowerCase())) {
                                        dataRow[formatRule.fieldName] = key;
                                        matched = true;
                                        return false;
                                    }
                                }   
                                return true;
                            });
                            if (!matched) {
                                if (raw !== "" && this.DEBUG) console.log("no match", raw, formatRule.fieldName, formatRule.filter!.boolParams);
                                dataRow[formatRule.fieldName] = formatRule.filter!.noMatchValue ?? false;
                            }
                        } else {
                            throw new TypeError(`Boolean type requires a filter at ${(formatRule as DataFormat[number]).fieldName}`, { cause: { code: "BOOLEAN_NO_FILTER" } });
                        }
                    }
                }
            }
            output.push(dataRow);
        }

        return output;
    }
}

export default GenericFormat;
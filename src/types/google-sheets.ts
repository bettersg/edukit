/**
 * Response type from GSheets.
 */
export type GSheetsResponse = {
  content: MatrixData[]
}

/**
 * 2D array of strings and numbers, format that most data is given in.
 */
export type MatrixData = (string | number)[]

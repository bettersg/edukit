/**
 * Response type from GSheets.
 */
export type GSheetsResponse = {
  content: GSheetsData[]
}

/**
 * Raw data from GSheets.
 */
export type GSheetsData = (string | number)[]

import { GSheetsResponse, GSheetsData } from '@/types/google-sheets'

/**
 * Get data from GSheets. Optionally transform the data.
 *
 * @param sheetsURL location of the GSheets
 * @param dropHeaderRow whether to drop the header row
 * @param transformFn function to transform the data
 * @returns array of data
 */
export const getGSheetsData = async <T = GSheetsData>(
  sheetsURL: string,
  dropHeaderRow = true,
  transformFn?: (data: GSheetsData) => T
): Promise<T[]> => {
  const response = await fetch(sheetsURL)
  if (!response.ok) return []

  const data: GSheetsResponse = await response.json()
  const rawData = data.content

  if (dropHeaderRow) rawData.shift()
  if (transformFn) return rawData.map(transformFn)
  return rawData as unknown as T[]
}

// @ts-nocheck
import { GSheetsResponse, GSheetsData } from '@/types/google-sheets'

export const API_ENDPOINT_TUTOR =
  'https://script.google.com/macros/s/AKfycbypZfVGYR5yZGYKWGLf5xCDKraFlHM1auz9hsJpW2V5NVQ_RUWahVI-exb70AUDIZ_X/exec'

export const API_ENDPOINT_TUTEE =
  'https://script.google.com/macros/s/AKfycbw6A70Oga5e3802b2-RSB7eb7cranIzuv9_p86SuNmBzNb2j96J8vNn7jeTUrXuCSQkVg/exec'

// SSO DB
// export const API_ENDPOINT_TUTEE =
//   'https://script.google.com/macros/s/AKfycbx_wnDVIdqrR2TDA4r6s7fdF6Lxyby7bVY057ky-9B2FcEtI6wRgdwmF5LHZ_H4SJ8U/exec'  
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


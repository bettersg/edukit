// @ts-nocheck
/**
 *
 * @param rawInput
 * @param delimiter
 * @returns
 */
export const stringToArray = (rawInput: string, delimiter = ','): string[] => {
  if (!rawInput) return []
  return rawInput.split(delimiter).map((input: string) => input.trim())
}

export const uniqueArrayDate = <T>(array: T[], fieldToFilter: keyof T): T[] => {
  const setValues = new Set(array.map((item) => item[fieldToFilter]))
  return Array.from(setValues) as T[]
}

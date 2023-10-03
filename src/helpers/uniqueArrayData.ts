import { type ITodo } from '../interfaces/todo.interface'

export const uniqueArrayDate = (
  array: ITodo[],
  fieldToFilter: keyof ITodo
): unknown[] => {
  const setValues = new Set(array.map((item) => item[fieldToFilter]))
  return Array.from(setValues)
}

import { type ITodo } from '../interfaces/todo.interface'

export const uniqueArrayData = (
  array: ITodo[],
  fieldToFilter: keyof ITodo
): unknown[] => {
  const setValues = new Set(array.map((item) => item[fieldToFilter]))
  return Array.from(setValues)
}

export const getUniqueTagNames = (todos: ITodo[]): string[] => {
  const uniqueTagNames = new Set()
  todos.forEach((todo) => {
    todo.tags.forEach((tag) => {
      uniqueTagNames.add(tag.tagName)
    })
  })
  return Array.from(uniqueTagNames) as string[]
}

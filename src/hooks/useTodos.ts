import React from 'react'
import {
  type ITodo,
  type TodoContextType,
  type TodoId,
  type TodoIdAndCompleted,
  type TodoTitle
} from '../interfaces/todo.interface'

const initialState = [
  {
    id: '1',
    title: 'Ver el twitch de Midudev',
    completed: true
  },
  {
    id: '2',
    title: 'Estudiar Scrum Fundamentals',
    completed: false
  },
  {
    id: '3',
    title: 'LLamar a Wells Fargo',
    completed: false
  }
]

type Props = TodoContextType

const isNumberString = (str: string): boolean => /^[0-9]+$/.test(str)

export function useTodos(): Props {
  const [todos, setTodos] = React.useState<ITodo[]>(initialState)

  const saveTodo = ({ title }: TodoTitle): void => {
    if (title.length === 0) return
    if (isNumberString(title)) return

    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  const removeTodo = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const updateCompletedStatus = ({
    id,
    completed
  }: TodoIdAndCompleted): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const removeAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  return {
    removeAllCompleted,
    updateCompletedStatus,
    removeTodo,
    saveTodo,
    todos
  }
}

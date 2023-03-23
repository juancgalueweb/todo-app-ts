import React from 'react'
import {
  type ITodo,
  type TodoContextType,
  type TodoId,
  type TodoIdAndCompleted,
  type TodoTitle
} from '../interfaces/todo.interface'

export const TodoContext = React.createContext<TodoContextType | null>(null)

interface Props {
  children: React.ReactNode
}

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

const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = React.useState<ITodo[]>(initialState)

  const saveTodo = ({ title }: TodoTitle): void => {
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

  return (
    <TodoContext.Provider
      value={{
        todos,
        saveTodo,
        removeTodo,
        updateCompletedStatus,
        removeAllCompleted
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider

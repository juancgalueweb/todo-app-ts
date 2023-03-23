import React from 'react'
import { useTodos } from '../hooks/useTodos'
import { type TodoContextType } from '../interfaces/todo.interface'

export const TodoContext = React.createContext<TodoContextType | null>(null)

interface Props {
  children: React.ReactNode
}

const TodoProvider: React.FC<Props> = ({ children }) => {
  const {
    removeAllCompleted,
    updateCompletedStatus,
    removeTodo,
    saveTodo,
    todos
  } = useTodos()

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

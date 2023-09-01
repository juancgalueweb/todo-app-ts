import React from 'react'
import { useTodos } from '../hooks/useTodos'
import { type TodoContextType } from '../interfaces/todo.interface'

export const TodosContext = React.createContext<TodoContextType | null>(null)

interface Props {
  children: React.ReactNode
}

const TodoProvider: React.FC<Props> = ({ children }) => {
  const {
    todos,
    loading,
    getTodos,
    saveTodo,
    setTodos,
    removeTodo,
    updateTodo,
    removeAllCompleted,
    updateCompletedStatus
  } = useTodos()

  return (
    <TodosContext.Provider
      value={{
        todos,
        loading,
        getTodos,
        saveTodo,
        setTodos,
        removeTodo,
        updateTodo,
        removeAllCompleted,
        updateCompletedStatus
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export default TodoProvider

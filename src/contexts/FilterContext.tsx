import React from 'react'
import { useFilters } from '../hooks/useFilters'
import { type FiltersContextType } from '../interfaces/todo.interface'

export const FiltersContext = React.createContext<FiltersContextType | null>(
  null
)

interface Props {
  children: React.ReactNode
}

const FiltersProviders: React.FC<Props> = ({ children }) => {
  const {
    filterChange,
    activeCount,
    completedCount,
    filteredTodos,
    filterSelected
  } = useFilters()

  return (
    <FiltersContext.Provider
      value={{
        filterChange,
        activeCount,
        completedCount,
        filteredTodos,
        filterSelected
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export default FiltersProviders

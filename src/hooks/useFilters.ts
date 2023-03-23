import React from 'react'
import { TODO_FILTERS } from '../const'
import { TodosContext } from '../contexts/TodoContext'
import {
  type FiltersContextType,
  type FilterValue,
  type TodoContextType
} from '../interfaces/todo.interface'

type Props = FiltersContextType

export function useFilters(): Props {
  const { todos } = React.useContext(TodosContext) as TodoContextType

  const [filterSelected, setFilterSelected] = React.useState<FilterValue>(
    TODO_FILTERS.ALL
  )

  const filterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter(todo => !todo.completed).length

  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.PENDING) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return {
    filterChange,
    activeCount,
    completedCount,
    filteredTodos,
    filterSelected
  }
}

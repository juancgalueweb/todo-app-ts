import React from 'react'
import { TODO_FILTERS } from '../constants/const'
import { TodosContext } from '../contexts/TodoContext'
import {
  type FiltersContextType,
  type FilterValue,
  type TodoContextType
} from '../interfaces/todo.interface'

type Props = FiltersContextType

/**
 * A custom React hook for filtering todos based on completion status.
 *
 * @returns An object containing functions and values to be used in the component.
 */
export function useFilters(): Props {
  // Retrieve the todos from the TodosContext.
  const { todos } = React.useContext(TodosContext) as TodoContextType

  // Set the initial filter to show all todos.
  const [filterSelected, setFilterSelected] = React.useState<FilterValue>(
    TODO_FILTERS.ALL
  )

  /**
   * Update the selected filter.
   *
   * @param filter - The new filter to use.
   */
  const filterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  // Calculate the number of active todos.
  const activeCount = todos.filter(todo => !todo.completed).length

  // Calculate the number of completed todos.
  const completedCount = todos.length - activeCount

  // Filter the todos based on the selected filter.
  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.PENDING) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  // Return an object with the filtered todos and other relevant values and functions.
  return {
    filterChange,
    activeCount,
    completedCount,
    filteredTodos,
    filterSelected
  }
}

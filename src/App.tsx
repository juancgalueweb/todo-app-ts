import React, { useContext, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Todos from './components/Todos'
import { TODO_FILTERS } from './const'
import { TodoContext } from './contexts/todoContext'
import {
  type FilterValue,
  type TodoContextType
} from './interfaces/todo.interface'

const App: React.FC = () => {
  const { todos } = useContext(TodoContext) as TodoContextType
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  )

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter(todo => !todo.completed).length

  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return (
    <div className='todoapp'>
      <Header />
      <Todos todos={filteredTodos} />
      <Footer
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        activeCount={activeCount}
        completedCount={completedCount}
      />
    </div>
  )
}

export default App

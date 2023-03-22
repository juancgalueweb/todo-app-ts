import React, { useState } from 'react'
import Footer from './components/Footer'
import Todos from './components/Todos'
import { TODO_FILTERS } from './const'
import {
  type FilterValue,
  type TodoId,
  type TodoIdAndCompleted
} from './interfaces/todo.interface'

const mockTodos = [
  {
    id: '1',
    title: 'Ver el twitch de Midudev',
    completed: true
  },
  {
    id: '2',
    title: 'Estudiar Scrum essentials',
    completed: false
  },
  {
    id: '3',
    title: 'LLamar a Wells Fargo',
    completed: false
  }
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  )

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: TodoIdAndCompleted): void => {
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

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <Todos
        todos={filteredTodos}
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleCompleted}
      />
      <Footer
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        activeCount={activeCount}
        completedCount={completedCount}
        onClearCompleted={handleRemoveAllCompleted}
      />
    </div>
  )
}

export default App

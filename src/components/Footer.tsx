/**
 * The Footer component displays the number of active tasks, a list of filters,
 * and a button to remove all completed tasks.
 */

import { useContext } from 'react'
import { FiltersContext } from '../contexts/FilterContext'
import { TodosContext } from '../contexts/TodoContext'
import {
  type FiltersContextType,
  type TodoContextType
} from '../interfaces/todo.interface'
import Filters from './Filters'

const Footer: React.FC = () => {
  const { removeAllCompleted } = useContext(TodosContext) as TodoContextType
  const { activeCount = 0, completedCount = 0 } = useContext(
    FiltersContext
  ) as FiltersContextType

  return (
    <footer className='footer' id='custom-footer'>
      {activeCount === 1 ? (
        <span className='todo-count'>
          <strong>{activeCount}</strong> tarea pendiente
        </span>
      ) : (
        <span className='todo-count'>
          <strong>{activeCount}</strong> tareas pendientes
        </span>
      )}
      <Filters />
      {completedCount > 0 && (
        <button
          className='clear-completed'
          onClick={() => {
            removeAllCompleted()
          }}
        >
          Borrar completadas
        </button>
      )}
    </footer>
  )
}

export default Footer

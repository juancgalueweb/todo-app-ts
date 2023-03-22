import { type FilterValue } from '../interfaces/todo.interface'
import Filters from './Filters'

interface Props {
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
  filterSelected: FilterValue
  handleFilterChange: (filter: FilterValue) => void
}

const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  onClearCompleted,
  filterSelected,
  handleFilterChange
}) => {
  return (
    <footer className='footer'>
      {activeCount === 1 ? (
        <span className='todo-count'>
          <strong>{activeCount}</strong> tarea pendiente
        </span>
      ) : (
        <span className='todo-count'>
          <strong>{activeCount}</strong> tareas pendientes
        </span>
      )}
      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
      {completedCount > 0 && (
        <button className='clear-completed' onClick={onClearCompleted}>
          Borrar completadas
        </button>
      )}
    </footer>
  )
}

export default Footer

import { useContext } from 'react'
import { FiltersContext } from '../contexts/FilterContext'
import { type FiltersContextType } from '../interfaces/todo.interface'
import Todo from './Todo'

const Todos: React.FC = () => {
  const { filteredTodos } = useContext(FiltersContext) as FiltersContextType
  return (
    <ul className='todo-list'>
      {filteredTodos.length === 0 ? (
        <p
          style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px' }}
        >
          Póngase a trabajar 😒
        </p>
      ) : (
        filteredTodos.map(todo => (
          <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
            />
          </li>
        ))
      )}
    </ul>
  )
}

export default Todos

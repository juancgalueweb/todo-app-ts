/**
 * This component renders a list of todos based on the current filter settings.
 */
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useContext } from 'react'
import { FiltersContext } from '../contexts/FilterContext'
import { type FiltersContextType } from '../interfaces/todo.interface'
import Todo from './Todo'

/**
 * Renders a list of todos.
 * @returns The Todos component.
 */
const Todos: React.FC = () => {
  const { filteredTodos } = useContext(FiltersContext) as FiltersContextType
  const [animationParent] = useAutoAnimate()
  return (
    <ul className='todo-list' ref={animationParent}>
      {filteredTodos.length === 0 ? (
        <p
          style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}
        >
          ¿Seguro que no tienes más nada pendiente? 🧐
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

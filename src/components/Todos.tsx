import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useContext, useState } from 'react'
import { FiltersContext } from '../contexts/FilterContext'
import { type FiltersContextType } from '../interfaces/todo.interface'
import Todo from './Todo'

const Todos: React.FC = () => {
  // Get the filtered todos from the FiltersContext
  const { filteredTodos } = useContext(FiltersContext) as FiltersContextType

  // Create an auto-animating parent element to animate todo items
  const [animationParent] = useAutoAnimate()

  // State to keep track of which todo item is currently being edited
  const [isEditing, setIsEditing] = useState('')

  return (
    <ul className='todo-list' ref={animationParent}>
      {filteredTodos.length === 0 ? (
        <p className='nothing-pending'>
          ¿Seguro que no tienes más nada pendiente? 🧐
        </p>
      ) : (
        filteredTodos.map(todo => (
          <li
            key={todo._id}
            onDoubleClick={() => {
              setIsEditing(todo._id as string)
            }}
            // Set the class of the list item based on its completion and editing status
            className={`${todo.completed ? 'completed' : ''} 
          ${isEditing === todo._id ? 'editing' : ''}`}
          >
            <Todo
              key={todo._id}
              _id={todo._id}
              title={todo.title}
              completed={todo.completed}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </li>
        ))
      )}
    </ul>
  )
}

export default Todos

import { type ITodo } from '../interfaces/todo.interface'
import Todo from './Todo'

interface Props {
  todos: ITodo[]
}

const Todos: React.FC<Props> = ({ todos }) => {
  return (
    <ul className='todo-list'>
      {todos.map(todo => (
        <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          />
        </li>
      ))}
    </ul>
  )
}

export default Todos

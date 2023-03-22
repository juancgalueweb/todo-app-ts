import {
  type ITodo,
  type TodoId,
  type TodoIdAndCompleted
} from '../interfaces/todo.interface'
import Todo from './Todo'

interface Props {
  todos: ITodo[]
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleteTodo: ({ id, completed }: TodoIdAndCompleted) => void
}

const Todos: React.FC<Props> = ({
  todos,
  onRemoveTodo,
  onToggleCompleteTodo
}) => {
  return (
    <ul className='todo-list'>
      {todos.map(todo => (
        <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onToggleCompleteTodo={onToggleCompleteTodo}
          />
        </li>
      ))}
    </ul>
  )
}

export default Todos

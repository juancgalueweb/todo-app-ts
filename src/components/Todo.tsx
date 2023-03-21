import { useId } from 'react'
import {
  type ITodo as TodoType,
  type TodoId
} from '../interfaces/todo.interface'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
}

const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo }) => {
  const todoId = useId()

  return (
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={completed}
        onChange={() => {}}
        id={todoId}
      />
      <label htmlFor='todoId'>{title}</label>
      <button
        className='destroy'
        style={{ cursor: 'pointer' }}
        onClick={() => {
          onRemoveTodo({ id })
        }}
      />
    </div>
  )
}

export default Todo

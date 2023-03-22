import { useId } from 'react'
import {
  type ITodo as TodoType,
  type TodoId,
  type TodoIdAndCompleted
} from '../interfaces/todo.interface'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleteTodo: ({ id, completed }: TodoIdAndCompleted) => void
}

const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onToggleCompleteTodo
}) => {
  const todoId = useId()
  const handleChangeCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onToggleCompleteTodo({ id, completed: event.target.checked })
  }

  return (
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={completed}
        onChange={handleChangeCheckbox}
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

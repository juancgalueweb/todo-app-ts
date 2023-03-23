import { useContext, useId } from 'react'
import { TodoContext } from '../contexts/todoContext'
import { type ITodo, type TodoContextType } from '../interfaces/todo.interface'

type Props = ITodo

const Todo: React.FC<Props> = ({ id, title, completed }) => {
  const todoId = useId()
  const { removeTodo, updateCompletedStatus } = useContext(
    TodoContext
  ) as TodoContextType
  const handleChangeCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    updateCompletedStatus({ id, completed: event.target.checked })
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
          removeTodo({ id })
        }}
      />
    </div>
  )
}

export default Todo

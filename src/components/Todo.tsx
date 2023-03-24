import { useContext, useId } from 'react'
import { TodosContext } from '../contexts/TodoContext'
import { type ITodo, type TodoContextType } from '../interfaces/todo.interface'

/**
 * A single todo item in the list of todos.
 */
type Props = ITodo

const Todo: React.FC<Props> = ({ id, title, completed }) => {
  const todoId = useId()
  const { removeTodo, updateCompletedStatus } = useContext(
    TodosContext
  ) as TodoContextType

  /**
   * Event handler for when the user clicks the checkbox to mark a todo as completed.
   * Calls the updateCompletedStatus function from the TodosContext with the new completed value.
   * @param event - The event object from the onChange event of the checkbox.
   */
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

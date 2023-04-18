import { useContext, useId, useState } from 'react'
import { TodosContext } from '../contexts/TodoContext'
import { type ITodo, type TodoContextType } from '../interfaces/todo.interface'

/**
 * A single todo item in the list of todos.
 */
type Props = ITodo

const Todo: React.FC<Props> = ({ _id, title, completed }) => {
  // State to keep track of the editing mode
  const [isEditing, setIsEditing] = useState(false)
  // State to keep track of the new title value
  const [newTitle, setNewTitle] = useState(title)
  const todoId = useId()
  const { removeTodo, updateCompletedStatus, updateTodoTitle } = useContext(
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
    updateCompletedStatus({ _id, completed: event.target.checked })
  }

  /**
   * Event handler for when the user double clicks the label to enter editing mode.
   */
  const handleDoubleClickLabel = (): void => {
    setIsEditing(true)
  }

  /**
   * Event handler for when the user changes the value of the input field in editing mode.
   * @param event - The event object from the onChange event of the input field.
   */
  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewTitle(event.target.value)
  }

  /**
   * Event handler for when the user presses a key in the input field in editing mode.
   * If the key is "Enter", calls the updateTodoTitle function from the TodosContext with the new title value and sets isEditing to false.
   * If the key is "Escape", sets the newTitle state back to the original title and sets isEditing to false.
   * @param event - The event object from the onKeyDown event of the input field.
   */
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      updateTodoTitle({ _id, title: newTitle })
      setIsEditing(false)
    }
    if (event.key === 'Escape') {
      setNewTitle(title)
      setIsEditing(false)
    }
  }

  /**
   * Event handler for when the user clicks outside of the input field in editing mode.
   * Calls the updateTodoTitle function from the TodosContext with the new title value and sets isEditing to false.
   * @param event - The event object from the onBlur event of the input field.
   */
  const handleBlur = (event: React.FocusEvent<HTMLElement>): void => {
    if (event.type === 'blur') {
      updateTodoTitle({ _id, title: newTitle })
      setIsEditing(false)
    }
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
      {isEditing ? (
        <input
          className='my-own-editing'
          type='text'
          maxLength={38}
          value={newTitle}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <label onDoubleClick={handleDoubleClickLabel} htmlFor='todoId'>
          {title}
        </label>
      )}
      <button
        className='destroy'
        style={{ cursor: 'pointer' }}
        onClick={() => {
          removeTodo({ _id })
        }}
      />
    </div>
  )
}

export default Todo

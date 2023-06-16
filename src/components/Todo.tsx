import { useContext, useEffect, useRef, useState } from 'react'
import { TodosContext } from '../contexts/TodoContext'
import { type ITodo, type TodoContextType } from '../interfaces/todo.interface'
import { FormatTitle } from './FormatTitle'

// Define the props for a single todo item, including additional props for editing
type Props = ITodo
interface ExtendedProps extends Props {
  isEditing: string
  setIsEditing: (_id: string) => void
}

const Todo: React.FC<ExtendedProps> = ({
  _id,
  title,
  completed,
  isEditing,
  setIsEditing
}) => {
  // State to keep track of the new title value
  const [editedTitle, setEditedTitle] = useState(title)
  // Reference to the input element for editing the todo title
  const inputEditTitle = useRef<HTMLInputElement>(null)
  // Get the necessary todo-related methods from the TodosContext
  const { removeTodo, updateCompletedStatus, updateTodoTitle } = useContext(
    TodosContext
  ) as TodoContextType

  // Event handler for keyboard events when editing the todo title
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ): void => {
    if (event.key === 'Enter') {
      // Save the new title when the Enter key is pressed
      setEditedTitle(editedTitle.trim())

      // Update the todo title in the TodosContext if it has changed
      if (editedTitle !== title) {
        updateTodoTitle({ _id, title: editedTitle })
      }

      // Stop editing the todo title
      setIsEditing('')
    }

    if (event.key === 'Escape') {
      // Cancel editing the todo title if the Escape key is pressed
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  // Set the editedTitle state to the todo title whenever it changes
  useEffect(() => {
    setEditedTitle(title)
  }, [title])

  // Focus on the input element for editing the todo title whenever the isEditing prop changes
  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  return (
    <>
      <div className='view'>
        <input
          style={{ cursor: 'pointer' }}
          className='toggle'
          type='checkbox'
          checked={completed}
          onChange={event => {
            // Update the completed status of the todo in the TodosContext when the checkbox is toggled
            updateCompletedStatus({ _id, completed: event.target.checked })
          }}
        />
        <label style={{ whiteSpace: 'pre-wrap' }}>
          <FormatTitle title={title} />
        </label>
        <button
          className='destroy'
          style={{ cursor: 'pointer' }}
          onClick={() => {
            // Remove the todo when the "destroy" button is clicked
            removeTodo({ _id })
          }}
        />
      </div>

      <input
        className='edit'
        value={editedTitle}
        onChange={event => {
          // Update the editedTitle state whenever the input value changes
          setEditedTitle(event.target.value)
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          // Cancel editing the todo title when the input loses focus
          setEditedTitle(title)
          setIsEditing('')
        }}
        ref={inputEditTitle}
      />
    </>
  )
}

export default Todo

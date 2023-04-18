/**
 * The CreateTodo component is a React functional component that renders a form
 * with an input field for creating new todo items.
 */

import { useContext, useState } from 'react'
import { TodosContext } from '../contexts/TodoContext'
import { type TodoContextType } from '../interfaces/todo.interface'

const CreateTodo: React.FC = () => {
  const { saveTodo } = useContext(TodosContext) as TodoContextType
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    saveTodo({ title: inputValue })
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='new-todo'
        value={inputValue}
        maxLength={38}
        onChange={event => {
          setInputValue(event.target.value)
        }}
        placeholder='¿Qué quieres hacer?'
      />
    </form>
  )
}

export default CreateTodo

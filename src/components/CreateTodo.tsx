import { useState } from 'react'
import { type TodoTitle } from '../interfaces/todo.interface'

interface Props {
  saveTodo: ({ title }: TodoTitle) => void
}

const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
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
        onChange={event => {
          setInputValue(event.target.value)
        }}
        placeholder='¿Qué quieres hacer?'
      />
    </form>
  )
}

export default CreateTodo

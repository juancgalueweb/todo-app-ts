import { useContext, useState } from 'react'
import { TodoContext } from '../contexts/todoContext'
import { type TodoContextType } from '../interfaces/todo.interface'

const CreateTodo: React.FC = () => {
  const { saveTodo } = useContext(TodoContext) as TodoContextType
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

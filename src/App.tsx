import React, { useState } from 'react'
import Todos from './components/Todos'
import {
  type TodoId,
  type TodoIdAndCompleted
} from './interfaces/todo.interface'

const mockTodos = [
  {
    id: '1',
    title: 'Ver el twitch de Midudev',
    completed: true
  },
  {
    id: '2',
    title: 'Estudiar Scrum essentials',
    completed: false
  },
  {
    id: '3',
    title: 'LLamar a Wells Fargo',
    completed: false
  }
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: TodoIdAndCompleted): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <Todos
        todos={todos}
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleCompleted}
      />
    </div>
  )
}

export default App

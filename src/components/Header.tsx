import { type TodoTitle } from '../interfaces/todo.interface'
import CreateTodo from './CreateTodo'

interface Props {
  onAddTodo: ({ title }: TodoTitle) => void
}

const Header: React.FC<Props> = ({ onAddTodo }) => {
  return (
    <header className='header'>
      <h1>
        Todos{' '}
        <img
          src='public/ts-logo.png'
          alt='Imagen de Typescript'
          style={{ width: '80px', height: 'auto', display: 'inline' }}
        />
      </h1>
      <CreateTodo saveTodo={onAddTodo} />
    </header>
  )
}

export default Header

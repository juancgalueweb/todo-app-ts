import CreateTodo from './CreateTodo'

const Header: React.FC = () => {
  return (
    <header className='header'>
      <h1>
        Todos{' '}
        <img
          src='ts-logo.png'
          alt='Imagen de Typescript'
          className='header-picture'
        />
      </h1>
      <CreateTodo />
    </header>
  )
}

export default Header

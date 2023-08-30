const Header: React.FC = () => {
  return (
    <div className='header'>
      <h1 className='header-h1'>
        Todos{' '}
        <img
          src='ts-logo.png'
          alt='Imagen de Typescript'
          className='header-picture'
        />
      </h1>
    </div>
  )
}

export default Header

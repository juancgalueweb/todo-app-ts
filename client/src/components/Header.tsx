import { SHeader } from '../styled-components/Header'

const Header: React.FC = () => {
  return (
    <SHeader>
      <h1>
        Todos <img src='ts-logo.png' alt='Imagen de Typescript' />
      </h1>
    </SHeader>
  )
}

export default Header

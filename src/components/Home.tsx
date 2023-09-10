import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { APP_KEY } from '../constants/const'

const Home: React.FC = () => {
  const dataFromLocalStorage = JSON.parse(
    localStorage.getItem(APP_KEY) as string
  )
  const navigate = useNavigate()
  return (
    <div className='home-container'>
      <h1>App para administrar tus tareas pendientes</h1>
      <p>
        Con esta aplicación podrás crear, eliminar, editar y visualizar tus
        tareas pendientes, lo que te ayudará con tu planificación, organización
        y productividad.
      </p>
      <figure>
        <figcaption>
          Esto es una imagen de prueba de cómo se vería la aplicación
        </figcaption>
        <img src='todos_main.webp' alt='Foto de muestra de la app' />
      </figure>
      <footer>
        {dataFromLocalStorage === null ? (
          <Button
            type='primary'
            size='large'
            onClick={() => {
              navigate('/login')
            }}
          >
            Login
          </Button>
        ) : (
          <Button
            type='primary'
            size='large'
            onClick={() => {
              navigate('/todos')
            }}
          >
            Ver mis tareas
          </Button>
        )}
      </footer>
    </div>
  )
}

export default Home

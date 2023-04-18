import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='home-container'>
      <h1>App para administrar tus tareas pendientes</h1>
      <p>
        Con esta aplicación podrás crear, eliminar, editar y visualizar tus
        tareas pendientes, lo que te ayudará con tu planificación, organización
        y productividad.
      </p>
      <img src='app-preview1.png' alt='Foto de muestra de la app' />
      <footer>
        <button
          className='button-app'
          onClick={() => {
            navigate('/login')
          }}
        >
          Login
        </button>
      </footer>
    </div>
  )
}

export default Home

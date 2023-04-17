import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Todos from './components/Todos'
import { APP_KEY } from './constants/const'
import { TodosContext } from './contexts/TodoContext'
import { type TodoContextType } from './interfaces/todo.interface'

const App: React.FC = () => {
  const { getTodos } = useContext(TodosContext) as TodoContextType
  const navigate = useNavigate()
  const dataFromLocalStorage = JSON.parse(
    localStorage.getItem(APP_KEY) as string
  )

  const handleOnClick = (): void => {
    localStorage.removeItem(APP_KEY)
    navigate('/')
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <div className='wrapper-container'>
        <div className='inner-container'>
          <p>Bienvenid@, {dataFromLocalStorage?.userEmail}</p>
          <button
            className='button-app'
            onClick={() => {
              handleOnClick()
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className='todoapp'>
        <Header />
        <Todos />
        <Footer />
      </div>
    </>
  )
}

export default App

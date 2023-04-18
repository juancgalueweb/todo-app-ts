import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import InfoMessage from './components/InfoMessage'
import Todos from './components/Todos'
import { APP_KEY } from './constants/const'
import { TodosContext } from './contexts/TodoContext'
import { type TodoContextType } from './interfaces/todo.interface'

const App: React.FC = () => {
  const [isClosing, setIsClosing] = useState(false)
  const [showInfoMessage, setShowInfoMessage] = useState(true)
  const { getTodos } = useContext(TodosContext) as TodoContextType
  const navigate = useNavigate()
  const dataFromLocalStorage = JSON.parse(
    localStorage.getItem(APP_KEY) as string
  )

  const handleClose = (): void => {
    setIsClosing(true)
    setTimeout(() => {
      setShowInfoMessage(false)
    }, 300) // adjust the delay to match the CSS transition duration
  }

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
            Logout
          </button>
        </div>
      </div>
      {showInfoMessage && (
        <div
          className={`alert-container ${isClosing ? 'hidden' : ''}`}
          role='info'
        >
          <InfoMessage
            title='Instrucciones de uso e info importante:'
            message='para modificar una tarea debe darle doble click a la respectiva tarea. El texto de las tareas está truncado a 38 caracteres, recuerden que esto es una demo.'
            onClose={() => {
              handleClose()
            }}
          />
        </div>
      )}

      <div className='todoapp'>
        <Header />
        <Todos />
        <Footer />
      </div>
    </>
  )
}

export default App

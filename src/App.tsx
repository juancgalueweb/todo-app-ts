import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import CreateTodo from './components/CreateTodo'
import Footer from './components/Footer'
import Header from './components/Header'
import Todos from './components/Todos'
import WelcomeAndLogout from './components/WelcomeAndLogout'
import { TodosContext } from './contexts/TodoContext'
import { type TodoContextType } from './interfaces/todo.interface'

const App: React.FC = () => {
  const { getTodos } = useContext(TodosContext) as TodoContextType

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <WelcomeAndLogout />
      <Header />
      <CreateTodo />
      <Footer />
      <Todos />
      <ToastContainer />
    </>
  )
}

export default App

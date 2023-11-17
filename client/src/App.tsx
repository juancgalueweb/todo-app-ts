import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import CreateTodo from './components/CreateTodo'
import Footer from './components/Footer'
import Header from './components/Header'
import Todos from './components/Todos'
import WelcomeAndLogout from './components/WelcomeAndLogout'
import { useTodosStore } from './stores/todosStore'
import { SMainContainer } from './styled-components/Wrappers'

const App: React.FC = () => {
  const { getTodos } = useTodosStore()

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <SMainContainer>
      <WelcomeAndLogout />
      <Header />
      <CreateTodo />
      <Footer />
      <Todos />
      <ToastContainer />
    </SMainContainer>
  )
}

export default App

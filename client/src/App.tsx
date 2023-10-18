import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import CreateTodo from './components/CreateTodo'
import Footer from './components/Footer'
import Header from './components/Header'
import Todos from './components/Todos'
import WelcomeAndLogout from './components/WelcomeAndLogout'
import { useTagsStore } from './stores/tagsStore'
import { useTodosStore } from './stores/todosStore'

const App: React.FC = () => {
  const { getTodos } = useTodosStore()
  const { getTags } = useTagsStore()

  useEffect(() => {
    getTags()
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

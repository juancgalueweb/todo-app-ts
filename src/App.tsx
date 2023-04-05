import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { Loader } from './components/Loader'
import LogoutButton from './components/LogoutButton.jsx'
import Todos from './components/Todos'

const App: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {isAuthenticated && (
        <>
          <div className='wrapper-container'>
            <div className='inner-container'>
              <p>Hola, {user?.name}</p>
              <LogoutButton />
            </div>
          </div>
          <div className='todoapp'>
            <Header />
            <Todos />
            <Footer />
          </div>
        </>
      )}
    </>
  )
}

export default App

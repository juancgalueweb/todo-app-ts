import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Todos from './components/Todos'

const App: React.FC = () => {
  return (
    <>
      <div className='wrapper-container'>
        <div className='inner-container'></div>
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

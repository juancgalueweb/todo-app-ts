import React from 'react'
import ReactDOM from 'react-dom/client'
import 'todomvc-app-css/index.css'
import App from './App'
import FiltersProviders from './contexts/FilterContext'
import TodoProvider from './contexts/TodoContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoProvider>
      <FiltersProviders>
        <App />
      </FiltersProviders>
    </TodoProvider>
  </React.StrictMode>
)

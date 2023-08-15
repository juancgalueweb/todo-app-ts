import ReactDOM from 'react-dom/client'
import FiltersProviders from './contexts/FilterContext'
import TodoProvider from './contexts/TodoContext'
import AppRoutes from './routes/AppRoutes'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <TodoProvider>
    <FiltersProviders>
      <AppRoutes />
    </FiltersProviders>
  </TodoProvider>
  // </React.StrictMode>
)

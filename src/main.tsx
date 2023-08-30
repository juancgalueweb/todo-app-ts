import { ConfigProvider } from 'antd'
import es_ES from 'antd/es/locale/es_ES'
import ReactDOM from 'react-dom/client'
import FiltersProviders from './contexts/FilterContext'
import TodoProvider from './contexts/TodoContext'
import AppRoutes from './routes/AppRoutes'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={es_ES}>
    <TodoProvider>
      <FiltersProviders>
        <AppRoutes />
      </FiltersProviders>
    </TodoProvider>
  </ConfigProvider>
)

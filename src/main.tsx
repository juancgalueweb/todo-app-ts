import { ConfigProvider } from 'antd'
import es_ES from 'antd/es/locale/es_ES'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes/AppRoutes'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={es_ES}>
    <AppRoutes />
  </ConfigProvider>
)

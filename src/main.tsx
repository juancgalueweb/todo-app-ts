import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'todomvc-app-css/index.css'
import FiltersProviders from './contexts/FilterContext'
import TodoProvider from './contexts/TodoContext'
import AppRoutes from './routes/AppRoutes'
import './styles/index.css'

const DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN
const CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      authorizationParams={{ redirect_uri: window.location.origin + '/todos' }}
    >
      <TodoProvider>
        <FiltersProviders>
          <AppRoutes />
        </FiltersProviders>
      </TodoProvider>
    </Auth0Provider>
  </React.StrictMode>
)

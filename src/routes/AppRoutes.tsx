import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Home from '../components/Home'
import Login from '../components/Login'

const AppRoutes: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/todos',
      element: <App />
    },
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    }
  ])

  return <RouterProvider router={router} />
}

export default AppRoutes

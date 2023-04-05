import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Home from '../components/Home'

const AppRoutes: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/todos',
      element: <App />
    },
    {
      path: '/',
      element: <Home />
    }
  ])

  return <RouterProvider router={router} />
}

export default AppRoutes

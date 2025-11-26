import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Logout from './pages/Logout.jsx'
import TeamDetail from './pages/TeamDetail.jsx'
import NewTeam from './pages/NewTeam.jsx'
import EditTeam from './pages/EditTeam.jsx'
import DeleteTeam from './pages/DeleteTeam.jsx'
import Players from './pages/Players.jsx'
import PlayerDetail from './pages/PlayerDetail.jsx'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { SessionProvider } from './contexts/session.context.jsx'

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Home />} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/teams/:id",
        element: <ProtectedRoute element={<TeamDetail />} />,
      },
      {
        path: "/teams/new",
        element: <ProtectedRoute element={<NewTeam />} />,
      },
      {
        path: "/teams/edit/:id",
        element: <ProtectedRoute element={<EditTeam />} />,
      },
      {
        path: "/teams/delete/:id",
        element: <ProtectedRoute element={<DeleteTeam />} />,
      },
      {
        path: "/players",
        element: <ProtectedRoute element={<Players />} />,
      },
      {
        path: "/players/:id",
        element: <ProtectedRoute element={<PlayerDetail />} />,
      }
    ]
  },
  {
    path: "*",
    element: <div style={{textAlign: 'center', padding: '2rem'}}>404 - Página no encontrada</div>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
)

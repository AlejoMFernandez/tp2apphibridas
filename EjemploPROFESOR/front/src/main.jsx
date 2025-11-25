import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router"
import App from './App'
import './index.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import DetallePlanta from './pages/DetallePlanta.jsx'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin.jsx'
import { SessionProvider } from './contexts/session.context.jsx'
import Logout from './pages/Logout.jsx'
import { ProductosProvider } from './contexts/productos.context.jsx'
import Register from './pages/Register.jsx'
import DeleteProducto from './pages/DeleteProducto.jsx'
import RecuperarCuenta from './pages/RecuperarCuenta.jsx'
import ResetPassword from './pages/resetPassword.jsx'
import NuevoProducto from './pages/NuevoProducto.jsx'
import EditarProducto from './pages/EditarProducto.jsx'
import UploadFile from './pages/UploadFile.jsx'
import PruebaSockets from './pages/PruebaSockets.jsx'

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Home />} />,
        //loader: homeLoader,
        //errorElement: <div>Error</div>
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/detalle/:id",
        element: <ProtectedRoute element={<DetallePlanta />} />,
      },
      {
        path: "/delete/:id",
        element: <ProtectedRoute element={<DeleteProducto />} />,
      },
      {
        path: "/editar/:id",
        element: <ProtectedRoute element={<EditarProducto />} />,
      },
      {
        path: "/nuevo-producto",
        element: <ProtectedRoute element={<NuevoProducto />} />,
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/recuperar-cuenta",
        element: <RecuperarCuenta />
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />
      },
      {
        path: "/upload",
        element: <UploadFile />
      }     
    ]
  },
  {
    path: "/socket",
    element: <PruebaSockets />
  },
  {
    path: "*",
    element: <div>404</div>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <ProductosProvider>
        <RouterProvider router={router} />
      </ProductosProvider>
    </SessionProvider>
  </StrictMode >,
)

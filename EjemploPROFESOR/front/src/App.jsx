import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './components/Nav'
import DetallePlanta from './pages/DetallePlanta'

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/detalle/:id' element={<DetallePlanta />} />
      </Routes>
    </>
  )
}

export default App
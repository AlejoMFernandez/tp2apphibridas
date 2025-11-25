import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../contexts/session.context'

const Logout = () => {
  const navigate = useNavigate()
  const logout = useLogout()

  useEffect(() => {
    logout()
    navigate('/login')
  }, [])

  return <div>Cerrando sesión...</div>
}

export default Logout

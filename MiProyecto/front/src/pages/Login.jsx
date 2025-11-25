import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../contexts/session.context'
import { authLogin } from '../services/auth.services'
import './Auth.css'

const Login = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = useLogin()

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    authLogin({ email: email, password: pass })
      .then(async res => {
        if (!res.ok) {
          throw await res.json()
        }
        return res.json()
      })
      .then(usuario => {
        login(usuario.token, { ...usuario, token: undefined })
        navigate("/")
      })
      .catch((err) => {
        setError(err.message || "Error al iniciar sesión")
        setLoading(false)
      })
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h1>⚽ Iniciar Sesión</h1>
        <p className='auth-subtitle'>Bienvenido a GOALDEMY</p>
        
        {error.length > 0 && <p className='error'>{error}</p>}
        
        <form onSubmit={handleLogin} className='auth-form'>
          <div className='form-group'>
            <label>Email</label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder='ejemplo@mail.com'
              required
              disabled={loading}
            />
          </div>
          
          <div className='form-group'>
            <label>Contraseña</label>
            <input 
              onChange={(e) => setPass(e.target.value)} 
              type="password" 
              placeholder='********'
              required
              disabled={loading}
            />
          </div>
          
          <button type='submit' className='btn-primary' disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        
        <div className='auth-links'>
          <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login

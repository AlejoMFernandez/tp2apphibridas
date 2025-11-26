import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authRegister } from '../services/auth.services'
import './Auth.css'

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    authRegister({ email, password, passwordConfirm, username })
      .then(async res => {
        if (!res.ok) {
          throw await res.json()
        }
        return res.json()
      })
      .then(() => {
        alert("Usuario registrado exitosamente. Por favor inicia sesión.")
        navigate("/login")
      })
      .catch((err) => {
        setError(Array.isArray(err.message) ? err.message.join(', ') : err.message || "Error al registrar")
        setLoading(false)
      })
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h1>⚽ Registro</h1>
        <p className='auth-subtitle'>Únete a GOALDEMY</p>
        
        {error.length > 0 && <p className='error'>{error}</p>}
        
        <form onSubmit={handleRegister} className='auth-form'>
          <div className='form-group'>
            <label>Nombre de usuario (opcional)</label>
            <input 
              onChange={(e) => setUsername(e.target.value)} 
              type="text" 
              placeholder='Tu nombre'
              disabled={loading}
            />
          </div>

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
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder='Mínimo 8 caracteres, 1 número, 1 mayúscula, 1 especial'
              required
              disabled={loading}
            />
          </div>

          <div className='form-group'>
            <label>Confirmar contraseña</label>
            <input 
              onChange={(e) => setPasswordConfirm(e.target.value)} 
              type="password" 
              placeholder='Repite tu contraseña'
              required
              disabled={loading}
            />
          </div>
          
          <button type='submit' className='btn-primary' disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        
        <div className='auth-links'>
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register

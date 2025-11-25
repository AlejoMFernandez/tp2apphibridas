import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { uselogin } from '../contexts/session.context'
import { authLogin } from '../services/auth.services'

const Login = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const login = uselogin()

  const handleLogin = () => {
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
      .catch((err) => setError(err.message))
  }

  return (
    <div className='py-5' >
      {error.length > 0 && <p>{error}</p>}
      <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Ingresar email' />
      <input onChange={(e) => setPass(e.target.value)} type="password" placeholder='Ingresar Pass' />
      <button onClick={handleLogin} >Ingresar</button>
      <Link className='p-6' to="/recuperar-cuenta" >Olvidaste tu contraseña?</Link>
    </div>
  )
}

export default Login
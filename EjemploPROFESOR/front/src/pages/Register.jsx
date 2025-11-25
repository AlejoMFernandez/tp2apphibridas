import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uselogin } from '../contexts/session.context'
import { authRegister } from '../services/auth.services'

const Register = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [age, setAge] = useState("")

  const [error, setError] = useState([])

  const navigate = useNavigate()

  const validateForm = () => {
    console.log({
      email: email,
      password: pass,
      passwordConfirm: confirmPass,
      age: age || undefined
    })

    const errores = []
    if (email.length == 0) {
      errores.push("El mail es requerido")
    }
    if (pass.length == 0) {
      errores.push("La contraseña es requerida")
    }
    if (confirmPass.length == 0) {
      errores.push("Repetir la contraseña es requerido")
    }
    if (pass !== confirmPass) {
      errores.push("Las contraseñas deben ser iguales")
    }
    if (age && age < 1) {
      errores.push("La edad debe ser mayor a 1")
    }
    setError(errores)
    //error.length -> todavia no tenia los valores -> porque no es instantaneo sino que tarda un ms
    return errores.length === 0
  }

  const handleRegister = () => {
    const payload = {
      email: email,
      password: pass,
      passwordConfirm: confirmPass,
      age: age || undefined
    }

    if (!validateForm()) {
      return
    }

    authRegister(payload)
      .then(async res => {
        if (!res.ok) {
          const respuesta = await res.json()
          throw setError(respuesta.message)
        }
        return res.json()
      })
      .then(usuario => {
        navigate("/login")
      })
      .catch(() => console.error(error))
  }
  return (
    <div className='py-5' >
      <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Ingresar email' />
      <input onChange={(e) => setPass(e.target.value)} type="password" placeholder='Ingresar Pass' />
      <input onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder='Volver a ingresar pass' />
      <input onChange={(e) => setAge(e.target.value)} type="number" placeholder='Ingresar edad' />
      <button onClick={handleRegister} >Ingresar</button>
      {error.length > 0 && <div className='mt-5' >{error.map((err, i) => <p className='text-red-600 text-sm mt-1' key={i}>{err}</p>)}</div>}
    </div>
  )
}

export default Register
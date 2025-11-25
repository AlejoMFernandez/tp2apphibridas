import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../services/auth.services'

const ResetPassword = () => {
    const params = useParams()
    const tokenReset = params.token
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const pass = e.target.pass.value
        resetPassword(tokenReset, pass)
            .then( async(res) => {
                if(!res.ok) throw await res.json()
                navigate("/login")
            } )
            .catch( err => console.error(err) )

    }

    return (
        <div className='container'>
            <h2>Restablecer contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name='pass' />
                <button type='submit' >Restrablecer contraseña</button>
            </form>
        </div>
    )
}

export default ResetPassword
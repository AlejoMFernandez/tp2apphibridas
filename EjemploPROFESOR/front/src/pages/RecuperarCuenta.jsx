import React, { useState } from 'react'
import { recuperarCuenta } from '../services/auth.services'
import { Activity } from 'react'

const RecuperarCuenta = () => {
    const [ email, setEmail ] = useState()
    const [ correcto, setCorrecto ] = useState(false)
    const handleRecuperar = () => {
        recuperarCuenta({email})
            .then( async(res) => {
                if(!res.ok) throw await res.json()
                setCorrecto(true)
            } )
            .catch( (err) => console.error(err.message) )
    }

    return (
        <div>
            <Activity mode={ correcto ? 'visible' : 'hidden' } >
                Revisa tu correo, mensaje enviado correctamente.
            </Activity>
            <label>Ingresar el email de la cuenta que queres recuperar:</label>
            <input type="email" onChange={ (e) => setEmail(e.target.value) } />
            <button onClick={handleRecuperar} >Recuperar</button>
        </div>
    )
}

export default RecuperarCuenta
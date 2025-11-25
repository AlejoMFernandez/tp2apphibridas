import React, { useState } from 'react'

const Contacto = () => {
    const [ email, setEmail ] = useState("")
    const [ user, setUser ] = useState("")
    const [ pass, setPass ] = useState("")
    const handleEmail = (e) => {
        console.log(e.target.value)
        //variable = e.target.value
        setEmail(e.target.value)
    }
    const handleUser = (e) => {
        console.log(e.target.value)
        //variable = e.target.value
        setUser(e.target.value)
    }
    const handlePass = (e) => {
        console.log(e.target.value)
        //variable = e.target.value
        setPass(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.email.value)
        console.log(e.target.user.value)
        console.log(e.target.pass.value)
    }

    return (
        <div>
            Email: { email } <br></br>
            User: { user }  <br></br>
            Pass: { pass }  <br></br>
            <form onSubmit={handleSubmit}>
                <input className='form-control mt-3' onChange={handleEmail} type='text' name='email' />
                <input className='form-control mt-3' onChange={handleUser} type='text' name='user' />            
                <input className='form-control mt-3' onChange={handlePass} type='text' name='pass' />
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}

export default Contacto
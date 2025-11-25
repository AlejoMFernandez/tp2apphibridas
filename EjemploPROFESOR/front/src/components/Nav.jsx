import React, { useContext, Activity } from 'react'
import { NavLink } from 'react-router-dom'
import { useUsuario } from '../contexts/session.context'
const Nav = () => {
    const usuario = useUsuario()
    return (
        <nav className='bg-white shadow-sm' >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' >
                <div className='flex flex justify-between h-16' >
                    <div className='flex items-center' >
                        <span className='text-xl font-bold text-gray-800' >
                            {usuario?.email || "Logo"}
                        </span>
                    </div>
                    <div className='flex items-center space-x-4' >
                        <NavLink to="/" className='text-gray-600 hover:text-gray-900 py-2' >Home</NavLink>
                        <Activity mode={usuario?.email ? 'visible' : 'hidden'}>
                            <NavLink
                                to="/logout"
                                className='text-gray-600 hover:text-gray-900 py-2'>
                                Logout
                            </NavLink>
                        </Activity>
                        <Activity mode={usuario?.email ? 'hidden' : 'visible'}>
                            <NavLink
                                to="/login"
                                className='text-gray-600 hover:text-gray-900 p-2'>
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className='text-gray-600 hover:text-gray-900 p-2'>
                                Registro
                            </NavLink>
                        </Activity>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
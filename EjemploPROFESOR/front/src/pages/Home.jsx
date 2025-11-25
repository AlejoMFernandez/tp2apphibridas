import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link, NavLink, useLoaderData } from 'react-router-dom'
import { SessionContext, useToken } from '../contexts/session.context'
import { useProductos } from '../hooks/ProductosHook'


const Home = () => {

    const { productos, loading, errores } = useProductos()

    if (loading) return <div className='flex justify-center items-center min-h-screen' ><p className='text-gray-600 text-2xl font-medium' >Cargando...</p></div>
    if (errores) return <div className='flex justify-center items-center min-h-screen' ><p className='text-red-600 text-2xl font-medium' >{errores}</p></div>
    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='max-w-7xl mx-auto' >
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Lista de Productos</h1>
                <Link className="bg-blue-600 hover:bg-blue-700 m-2 text-white px-4 py-2 rounded-md text-sm font-medium" to={`/nuevo-producto`} >Agregar producto</Link>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                #
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Marca
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Modelo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Precio
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map(producto => (
                                <tr key={producto._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {producto._id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {producto.marca}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 italic">
                                        {producto.modelo}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {producto.precio}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link state={producto} to={`/detalle/${producto._id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                        >Ver detalle</Link>
                                        <Link className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium" to={`/editar/${producto._id}`} >Editar</Link>
                                        <Link className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium" to={`/delete/${producto._id}`} >Borrar</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useProductosById } from '../hooks/ProductosHook'
import { deleteProducto } from '../services/productos.service'

const DeleteProducto = () => {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id
  const { producto, loading, errores } = useProductosById(id)

  if( loading ) return <div className='flex justify-center items-center min-h-screen' ><p className='text-gray-600 text-2xl font-medium' >Cargando...</p></div>
  if( errores ) return <div className='flex justify-center items-center min-h-screen' ><p className='text-red-600 text-2xl font-medium' >{errores}</p></div>

  const handleDelete = () => {
    deleteProducto(id)
      .then( async(res) => {
        if( !res.ok ) throw await res.json()
        navigate('/')
      } )
      .catch( (err) => console.error(err.message) )
  }

  return (
    <div>
      <h2>Desea borrar { producto.modelo }</h2>
      <div className='flex justify-around gap-4' >
        <button className='bg-red-600 text-white py-6 px-6 rounded-lg hover:bg-red-700 transition duration-200' onClick={handleDelete} >Si</button>
        <Link className='bg-gray-300 text-gray-700 py-6 px-6 rounded-lg hover:bg-gray-400 transition duration-200' to="/" >No</Link>
      </div>
    </div>
  )
}

export default DeleteProducto
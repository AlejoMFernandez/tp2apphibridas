import { Link, useParams, } from 'react-router-dom'
import { useProductosById } from '../hooks/ProductosHook'

const DetallePlanta = () => {
  const params = useParams()  //saca los valores de la url
  const id = params.id

  const { producto, loading, errores } = useProductosById(id)

  if (loading) return <div className='flex justify-center items-center min-h-screen' ><p className='text-gray-600 text-2xl font-medium' >Cargando...</p></div>
  if (errores) return <div className='flex justify-center items-center min-h-screen' ><p className='text-red-600 text-2xl font-medium' >{errores}</p></div>

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-2' >{producto.nombre}</h1>
      <p className='text-xl text-gray-600 mb-6' >{producto.modelo}</p>
      <div className='space-y-3 mb-6'>
        <p><span className='font-semibold' >Familia: </span> {producto.precio}</p>
      </div>
      <Link className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium" to="/">Volver</Link>
    </div>
  )
}

export default DetallePlanta
import { useNavigate } from "react-router-dom"
import { createProducto } from "../services/productos.service"
import { useState } from "react"
import { Activity } from "react"

const NuevoProducto = () => {
    const [ errores, setErrores ] = useState()
    const navigate = useNavigate()

    const validateForm = (payload) => {
        const error = {}
        if( !payload.modelo ) error.modelo = "El modelo es requerido"  
        if( !payload.marca ) error.marca = "El marca es requerido"  
        if( !payload.precio ) error.precio = "El precio es requerido"  

        setErrores(error)

        return Object.keys(error).length == 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            modelo: e.target.modelo.value,
            marca: e.target.marca.value,
            precio: e.target.precio.value
        }

        if( !validateForm(payload) ) return
        const formData = new FormData()

        formData.append("modelo", payload.modelo)
        formData.append("marca", payload.marca)
        formData.append("precio", payload.precio)

        createProducto(formData)
            .then(async (res) => {
                if (!res.ok) throw await res.json()
                navigate('/')
            })
            .catch( (err) => console.log(err) )

    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md" >
            <form onSubmit={handleSubmit} >
                <div className="mb-4" >
                    <label className="block text-sm font-medium text-gray-700" >Modelo</label>
                    <input className="w-full mt-2 p-3 border border-gray-300 rounded-md" type="text" name="modelo" />
                    <Activity mode={ errores?.modelo ? 'visible' : 'hidden' } >
                        <p className="text-red-500" >{errores?.modelo}</p>
                    </Activity>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Marca</label>
                    <input className="w-full mt-2 p-3 border border-gray-300 rounded-md" type="text" name="marca" />
                    <Activity mode={ errores?.marca ? 'visible' : 'hidden' } >
                        <p className="text-red-500" >{errores?.marca}</p>
                    </Activity>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Precio</label>
                    <input className="w-full mt-2 p-3 border border-gray-300 rounded-md" type="number" name="precio" />
                    <Activity mode={ errores?.precio ? 'visible' : 'hidden' } >
                        <p className="text-red-500" >{errores?.precio}</p>
                    </Activity>
                </div>
                <button className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md" type="submit" >Guardar</button>
            </form>
        </div>)
}

export default NuevoProducto
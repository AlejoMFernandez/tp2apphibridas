import React, { Children, useEffect } from 'react'
import { useState } from 'react'
import Parrafo from './components/Parrafo'
import Layout from './components/Layout'
import ChildrenFix from './ChildrenFix'

const Listado = () => {

    const [lugares, setLugares] = useState([])
    const [seach, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {  //-> pueden tener mas de uno
        //1. ComponentDiDmount  -> inicializaciones - llamadas a api
        setLoading(true)
        fetch(`https://datosabiertos-catastro-apis.buenosaires.gob.ar/buscar?texto=${seach}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Error http: " + response.status())
            })
            .then(datos => {
                setLugares(datos.instancias || [])
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setError(err.message)
            })
        //2. ComponentDiDUpdate -> actualizaciones -> llamando a una api / cargando un dato
        //3. ComponentDiDunmont -> Limpiamos y devolvemos recursos -> setInterval -> api geolocalizacion
    }, [seach])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.nombreLugar.value)
        setSearch(e.target.nombreLugar.value)
    }
    // return <ChildrenFix component={ <Parrafo titulo="hola soy un titulo" /> } />
    return error.length == 0 ? (
        <Layout style={{}} className="" >
            <form onSubmit={handleSubmit} >
                <input type="text" name="nombreLugar" placeholder='ingresar el nombre del lugar a buscar' />
                <button type='submit' >Buscar</button>
            </form>
            {
                !loading ? lugares.map(lugar =>
                    <Parrafo key={lugar.id} 
                        nombre={lugar.nombre}
                        clase={lugar.clase}
                        className="text-danger text-center"
                        style={{ color: "red", fontSize: "20px" }} //camelCase
                    />
                )
                    : <div>Cargando....</div>
            }
        </Layout>
    ) : <div>{error}</div>
}

export default Listado
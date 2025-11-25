import { useEffect, useState } from "react"
import { getProductos, getProductosById } from "../services/productos.service"

export function useProductos() {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [errores, setErrores] = useState("")

    useEffect(() => {
        getProductos()
            .then(res => {
                if (!res.ok) {
                    throw new Error("No se puede obtener los productos")
                }
                return res.json()
            })
            .then(products => setProductos(products))
            .catch((err) => setErrores(err.message))
            .finally( () => setLoading(false) )
    }, [])

    return { productos, loading, errores }
}

export function useProductosById(id) {
    const [producto, setProducto] = useState([])
    const [loading, setLoading] = useState(true)
    const [errores, setErrores] = useState("")

    useEffect(() => {
        getProductosById(id)
            .then(res => {
                if (!res.ok) {
                    throw new Error("No se puede obtener los productos")
                }
                return res.json()
            })
            .then(product => setProducto(product))
            .catch((err) => setErrores(err.message))
            .finally( () => setLoading(false) )
    }, [])

    return { producto, loading, errores }
}
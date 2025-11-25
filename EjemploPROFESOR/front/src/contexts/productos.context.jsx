import { createContext, useContext, useEffect, useState } from "react";
import { useToken } from "./session.context";

const ProductosContext = createContext()

export function useProductosContext() {
    return useContext(ProductosContext)
}

export function useProductos() {
    const { productos } = useProductosContext()
    return productos
}

export async function useProductosById(id) {
    const token = useToken()
    try {            
        const res = await fetch("http://localhost:2025/api/productos/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const product = await res.json()
        return product
    } catch (error) {
        throw new Error(error.message)
    }
}

function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([])
    const token = useToken()

    useEffect(() => {
        fetch("http://localhost:2025/api/productos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("No se puede obtener los productos")
                }
                return res.json()
            })
            .then(products => setProductos(products))
            .catch((err) => console.error(err.message))
    }, [])

    return (
        <ProductosContext.Provider value={{ productos }}>
            {children}
        </ProductosContext.Provider>
    )
}

export { ProductosProvider }
import { call } from "./api.service"

export function getProductos(){
    return call({ uri: "productos" })
}

export function getProductosById(id){
    return call( {uri: `productos/${id}`})
}

export function createProducto(producto){
    return call({ uri:  'productos', method: "post", body: producto })
}

export function editProducto(id, producto){
    return call({ uri: 'productos/'+id, method: 'PUT', body: producto })
}

export function deleteProducto(id){
    return call( { uri: 'productos/'+id, method: "DELETE" } )
}

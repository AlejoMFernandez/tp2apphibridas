import { Navigate } from "react-router-dom"

const ProtectedRouteAdmin = ({element}) => {
    const session = JSON.parse(localStorage.getItem("session"))
    if( session && session.rol == "admin" ) return element
    
    return <Navigate to="/login" />
}

export default ProtectedRouteAdmin
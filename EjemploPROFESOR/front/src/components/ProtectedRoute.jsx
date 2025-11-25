import { Navigate } from "react-router-dom"
import { useToken } from "../contexts/session.context"

const ProtectedRoute = ({element}) => {
    const token = useToken() 
    if( token ) return element

    return <Navigate to="/login" />
}

export default ProtectedRoute
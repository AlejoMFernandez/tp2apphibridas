import { useEffect } from "react"
import { uselogout } from "../contexts/session.context"
import { Navigate } from "react-router-dom"

const Logout = () => {
    const logout = uselogout()
    
    useEffect( () => {
        logout()
    }, [] )

    return <Navigate to="/login" />
}

export default Logout
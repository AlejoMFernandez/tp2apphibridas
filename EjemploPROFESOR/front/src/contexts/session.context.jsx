import { createContext, useContext, useState } from "react";

const SessionContext = createContext() //creo el contexto

function useSession(){
    return useContext(SessionContext)
}

function useUsuario(){
    const { usuario } = useSession()
    return usuario
}

function useToken(){
    const { token } = useSession()
    return token
}

function uselogin(){
    const { onLogin } = useSession()
    return onLogin
}

function uselogout(){
    const { onLogout } = useSession()
    return onLogout
}


export function SessionProvider({ children }) {
    const [ usuario, setUsuario ] = useState( JSON.parse(localStorage.getItem("usuario")))
    const [ token, setToken ] = useState( localStorage.getItem("token") )

    const onLogin = (jwt, usuario) => {
        localStorage.setItem("token", jwt)
        localStorage.setItem( "usuario", JSON.stringify(usuario) )
        setToken(jwt)
        setUsuario(usuario)
    }

    const onLogout = () => {
        localStorage.clear()
        setToken(null)
        setUsuario(null)
    }

    return (
        <SessionContext.Provider value={{usuario, setUsuario, token, setToken, onLogin, onLogout}} >
            {children}
        </SessionContext.Provider>
    )
}

export { SessionContext, useSession, useUsuario, useToken, uselogin, uselogout }
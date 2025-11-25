import { call } from "./api.service";

export function authLogin(credenciales){
    console.log(credenciales)
    return call({uri: 'usuarios/login', method: 'POST', body: credenciales})
}

export function authRegister(credenciales){
    return call({uri: 'usuarios', method: 'POST', body: credenciales})
}

export function recuperarCuenta(email){
    return call({uri: 'usuarios/recuperar', method: 'POST', body: email})
}

export function resetPassword(token, pass){
    return call({ uri: 'usuarios/reset-password', method: 'POST', body: { token, password: pass } })
}
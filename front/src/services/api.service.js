const url = import.meta.env.VITE_URL_API

export async function call({ uri, method = "GET", body = undefined }) {
    const token = localStorage.getItem("token")
    
    const response = await fetch(url + uri, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: body ? JSON.stringify(body) : undefined
    })

    // Si el token es inválido o expiró, limpiar sesión y redirigir al login
    if (response.status === 401 || response.status === 403) {
        localStorage.clear()
        window.location.href = '/login'
    }

    return response
}

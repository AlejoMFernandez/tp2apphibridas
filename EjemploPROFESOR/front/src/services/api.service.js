const url = import.meta.env.VITE_URL_API//"https://dwn4ap-back.onrender.com/api/"
export function call({ uri, method = "GET", body = undefined }) {
    const token = localStorage.getItem("token")
    return fetch(url + uri, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
}
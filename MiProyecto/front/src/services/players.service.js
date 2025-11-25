import { call } from "./api.service.js"

export function getPlayers(filter = {}) {
    const queryString = new URLSearchParams(filter).toString()
    return call({ uri: `players${queryString ? '?' + queryString : ''}`, method: 'GET' })
}

export function getPlayerById(id) {
    return call({ uri: `players/${id}`, method: 'GET' })
}

export function createPlayer(player) {
    return call({ uri: 'players', method: 'POST', body: player })
}

export function updatePlayer(id, player) {
    return call({ uri: `players/${id}`, method: 'PATCH', body: player })
}

export function deletePlayer(id) {
    return call({ uri: `players/${id}`, method: 'DELETE' })
}

import { call } from "./api.service.js"

export function getTeams(filter = {}) {
    const queryString = new URLSearchParams(filter).toString()
    return call({ uri: `teams${queryString ? '?' + queryString : ''}`, method: 'GET' })
}

export function getTeamById(id) {
    return call({ uri: `teams/${id}`, method: 'GET' })
}

export function createTeam(team) {
    return call({ uri: 'teams', method: 'POST', body: team })
}

export function updateTeam(id, team) {
    return call({ uri: `teams/${id}`, method: 'PATCH', body: team })
}

export function deleteTeam(id) {
    return call({ uri: `teams/${id}`, method: 'DELETE' })
}

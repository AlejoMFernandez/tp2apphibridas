import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTeams } from '../services/teams.service'
import './Teams.css'

const Home = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadTeams()
  }, [])

  const loadTeams = () => {
    setLoading(true)
    getTeams()
      .then(async res => {
        if (!res.ok) throw await res.json()
        return res.json()
      })
      .then(data => {
        setTeams(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || "Error al cargar equipos")
        setLoading(false)
      })
  }

  if (loading) return <div className="loading">Cargando equipos...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="teams-container">
      <div className="teams-header">
        <h1>⚽ Champions League 2024 - Teams</h1>
        <Link to="/teams/new" className="btn-new">+ Nuevo Equipo</Link>
      </div>

      <div className="teams-grid">
        {teams.map(team => (
          <div key={team._id} className="team-card">
            <div className="team-logo">
              <img src={team.logo} alt={team.name} />
            </div>
            <h3>{team.name}</h3>
            <p className="team-short-name">{team.shortName}</p>
            {team.stadium && <p className="team-info">🏟️ {team.stadium}</p>}
            {team.country && <p className="team-info">🌍 {team.country}</p>}
            <div className="team-actions">
              <Link to={`/teams/${team._id}`} className="btn-view">Ver Detalle</Link>
              <Link to={`/teams/edit/${team._id}`} className="btn-edit">Editar</Link>
              <Link to={`/teams/delete/${team._id}`} className="btn-delete">Eliminar</Link>
            </div>
          </div>
        ))}
      </div>

      {teams.length === 0 && (
        <div className="no-data">
          <p>No hay equipos disponibles</p>
          <Link to="/teams/new" className="btn-primary">Crear primer equipo</Link>
        </div>
      )}
    </div>
  )
}

export default Home

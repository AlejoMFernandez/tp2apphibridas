import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTeamById } from '../services/teams.service'
import './Teams.css'

const TeamDetail = () => {
  const { id } = useParams()
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getTeamById(id)
      .then(async res => {
        if (!res.ok) throw await res.json()
        return res.json()
      })
      .then(data => {
        setTeam(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || "Error al cargar equipo")
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="loading">Cargando...</div>
  if (error) return <div className="error">{error}</div>
  if (!team) return <div className="error">Equipo no encontrado</div>

  return (
    <div className="team-detail-container">
      <Link to="/" className="btn-back">← Volver a Teams</Link>
      
      <div className="team-detail-header">
        <img src={team.logo} alt={team.name} className="team-detail-logo" />
        <div>
          <h1>{team.name}</h1>
          <h2>{team.shortName}</h2>
        </div>
      </div>

      <div className="team-detail-info">
        {team.stadium && <p><strong>Estadio:</strong> {team.stadium}</p>}
        {team.country && <p><strong>País:</strong> {team.country}</p>}
        {team.founded && <p><strong>Fundado:</strong> {team.founded}</p>}
      </div>

      {team.squad && team.squad.length > 0 && (
        <div className="team-squad">
          <h3>Plantilla</h3>
          {team.squad.map((position, idx) => (
            <div key={idx} className="position-group">
              <h4>{position.title}</h4>
              <div className="players-list">
                {position.members && position.members.map((player, pIdx) => (
                  <div key={pIdx} className="player-item">
                    <span>{player.name}</span>
                    {player.age && <span className="player-age">Edad: {player.age}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="team-actions">
        <Link to={`/teams/edit/${team._id}`} className="btn-edit">Editar</Link>
        <Link to={`/teams/delete/${team._id}`} className="btn-delete">Eliminar</Link>
      </div>
    </div>
  )
}

export default TeamDetail

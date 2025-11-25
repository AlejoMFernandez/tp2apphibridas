import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPlayerById } from '../services/players.service'
import './Players.css'

// Helper para renderizar valores de forma segura
const renderValue = (value, fallback = 'N/A') => {
  if (value === null || value === undefined) return fallback
  if (typeof value === 'object') return fallback
  return value
}

const PlayerDetail = () => {
  const { id } = useParams()
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getPlayerById(id)
      .then(async res => {
        if (!res.ok) throw await res.json()
        return res.json()
      })
      .then(data => {
        setPlayer(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || "Error al cargar jugador")
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="loading">Cargando...</div>
  if (error) return <div className="error">{error}</div>
  if (!player) return <div className="error">Jugador no encontrado</div>

  return (
    <div className="player-detail-container">
      <Link to="/players" className="btn-back">← Volver a Jugadores</Link>
      
      <div className="player-detail-card">
        <div className="player-detail-header">
          <img 
            src={player.imgUrl} 
            alt={player.name}
            onError={(e) => e.target.src = player.imgFallbackUrl}
            className="player-detail-image"
          />
          <div className="player-detail-info-main">
            <h1>{renderValue(player.name)}</h1>
            {player.cname && <h2>{renderValue(player.cname)}</h2>}
            <div className="player-club-info">
              <img src={player.clubLogo} alt={renderValue(player.club, 'Club')} />
              <div>
                <p className="club-name">{renderValue(player.club)}</p>
                <p className="club-short">{renderValue(player.clubShortName)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="player-detail-stats">
          <div className="stat-item">
            <span className="stat-label">Posición</span>
            <span className="stat-value">{renderValue(player.posicion)}</span>
          </div>
          
          {player.role && (
            <div className="stat-item">
              <span className="stat-label">Rol</span>
              <span className="stat-value">{renderValue(player.role)}</span>
            </div>
          )}
          
          {player.age && (
            <div className="stat-item">
              <span className="stat-label">Edad</span>
              <span className="stat-value">{renderValue(player.age)} años</span>
            </div>
          )}
          
          {player.height && (
            <div className="stat-item">
              <span className="stat-label">Altura</span>
              <span className="stat-value">{renderValue(player.height)}</span>
            </div>
          )}
          
          {player.foot && (
            <div className="stat-item">
              <span className="stat-label">Pie</span>
              <span className="stat-value">{renderValue(player.foot)}</span>
            </div>
          )}
          
          {player.nationality && (
            <div className="stat-item">
              <span className="stat-label">Nacionalidad</span>
              <span className="stat-value">{renderValue(player.nationality)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlayerDetail

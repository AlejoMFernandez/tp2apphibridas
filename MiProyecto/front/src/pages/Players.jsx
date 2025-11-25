import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPlayers } from '../services/players.service'
import ErrorMessage from '../components/ErrorMessage'
import './Players.css'

const Players = () => {
  const [players, setPlayers] = useState([])
  const [filteredPlayers, setFilteredPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    loadPlayers()
  }, [])

  const loadPlayers = () => {
    setLoading(true)
    
    getPlayers({})
      .then(async res => {
        if (!res.ok) throw await res.json()
        return res.json()
      })
      .then(data => {
        setPlayers(data)
        setFilteredPlayers(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || "Error al cargar jugadores")
        setLoading(false)
      })
  }

  const handleFilterChange = (e) => {
    const value = e.target.value
    setFilter(value)
    
    if (!value.trim()) {
      setFilteredPlayers(players)
    } else {
      const filtered = players.filter(player => 
        player.club?.toLowerCase().includes(value.toLowerCase()) ||
        player.clubShortName?.toLowerCase().includes(value.toLowerCase()) ||
        player.name?.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredPlayers(filtered)
    }
  }

  if (loading) return <div className="loading">Cargando jugadores...</div>
  if (error) return <ErrorMessage message={error} onRetry={loadPlayers} />

  return (
    <div className="players-container">
      <div className="players-header">
        <h1>👥 Jugadores Champions League 2024</h1>
      </div>

      <div className="filter-section">
        <label>🔍 Buscar:</label>
        <input
          type="text"
          placeholder="Buscar por equipo o jugador..."
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>

      <div className="players-grid">
        {filteredPlayers.map((player, idx) => (
          <Link 
            key={idx} 
            to={`/players/${player.id}`} 
            className="player-card"
          >
            <div className="player-image">
              <img 
                src={player.imgUrl} 
                alt={player.name}
                onError={(e) => e.target.src = player.imgFallbackUrl}
              />
            </div>
            <div className="player-info">
              <h3>{player.name}</h3>
              {player.cname && <p className="player-cname">{player.cname}</p>}
              <div className="player-details">
                <span className="player-team">
                  <img src={player.clubLogo} alt={player.club} className="club-mini-logo" />
                  {player.clubShortName}
                </span>
                <span className="player-position">{player.posicion}</span>
                {player.age && <span className="player-age">Edad: {player.age}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPlayers.length === 0 && !loading && (
        <div className="no-data">
          <p>No se encontraron jugadores{filter && ` para "${filter}"`}</p>
        </div>
      )}
    </div>
  )
}

export default Players

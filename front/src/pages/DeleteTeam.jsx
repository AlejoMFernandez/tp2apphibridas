import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getTeamById, deleteTeam } from '../services/teams.service'
import './Teams.css'

const DeleteTeam = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
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

  const handleDelete = () => {
    if (!confirm(`¿Estás seguro de eliminar el equipo ${team.name}?`)) return

    setDeleting(true)
    deleteTeam(id)
      .then(async res => {
        if (!res.ok) throw await res.json()
        return res.json()
      })
      .then(() => {
        alert("Equipo eliminado exitosamente")
        navigate("/")
      })
      .catch(err => {
        setError(err.message || "Error al eliminar equipo")
        setDeleting(false)
      })
  }

  if (loading) return <div className="loading">Cargando...</div>
  if (error) return <div className="error">{error}</div>
  if (!team) return <div className="error">Equipo no encontrado</div>

  return (
    <div className="delete-container">
      <Link to="/" className="btn-back">← Volver</Link>
      
      <div className="delete-card">
        <h1>⚠️ Eliminar Equipo</h1>
        
        <div className="team-info-card">
          <img src={team.logo} alt={team.name} />
          <h2>{team.name}</h2>
          <p>{team.shortName}</p>
        </div>

        <p className="warning">
          Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este equipo?
        </p>

        <div className="delete-actions">
          <button onClick={handleDelete} className="btn-delete" disabled={deleting}>
            {deleting ? 'Eliminando...' : 'Sí, Eliminar'}
          </button>
          <Link to="/" className="btn-cancel">Cancelar</Link>
        </div>
      </div>
    </div>
  )
}

export default DeleteTeam

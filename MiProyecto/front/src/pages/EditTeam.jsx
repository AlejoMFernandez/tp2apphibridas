import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getTeamById, updateTeam } from '../services/teams.service'
import './Teams.css'

const EditTeam = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    logo: '',
    stadium: '',
    country: '',
    founded: ''
  })

  useEffect(() => {
    getTeamById(id)
      .then(async res => {
        if (!res.ok) throw await res.json()
        return res.json()
      })
      .then(data => {
        setFormData({
          name: data.name || '',
          shortName: data.shortName || '',
          logo: data.logo || '',
          stadium: data.stadium || '',
          country: data.country || '',
          founded: data.founded || ''
        })
      })
      .catch(err => setError(err.message || "Error al cargar equipo"))
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    updateTeam(id, formData)
      .then(async res => {
        if (!res.ok) throw await res.json()
        return res.json()
      })
      .then(() => {
        alert("Equipo actualizado exitosamente")
        navigate("/")
      })
      .catch(err => {
        setError(err.message || "Error al actualizar equipo")
        setLoading(false)
      })
  }

  return (
    <div className="form-container">
      <Link to="/" className="btn-back">← Volver</Link>
      
      <h1>Editar Equipo</h1>
      
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit} className="team-form">
        <div className="form-group">
          <label>Nombre del Equipo *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Nombre Corto *</label>
          <input
            type="text"
            name="shortName"
            value={formData.shortName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>URL del Logo</label>
          <input
            type="url"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Estadio</label>
          <input
            type="text"
            name="stadium"
            value={formData.stadium}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>País</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Año de Fundación</label>
          <input
            type="number"
            name="founded"
            value={formData.founded}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar Equipo'}
        </button>
      </form>
    </div>
  )
}

export default EditTeam

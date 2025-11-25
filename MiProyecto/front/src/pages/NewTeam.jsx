import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createTeam } from '../services/teams.service'
import './Teams.css'

const NewTeam = () => {
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

    createTeam(formData)
      .then(async res => {
        if (!res.ok) throw await res.json()
        return res.json()
      })
      .then(() => {
        alert("Equipo creado exitosamente")
        navigate("/")
      })
      .catch(err => {
        setError(err.message || "Error al crear equipo")
        setLoading(false)
      })
  }

  return (
    <div className="form-container">
      <Link to="/" className="btn-back">← Volver</Link>
      
      <h1>Crear Nuevo Equipo</h1>
      
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
          {loading ? 'Creando...' : 'Crear Equipo'}
        </button>
      </form>
    </div>
  )
}

export default NewTeam

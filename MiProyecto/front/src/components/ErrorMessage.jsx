import './ErrorMessage.css'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon">⚠️</div>
        <h2>¡Oops! Algo salió mal</h2>
        <p className="error-message">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-retry">
            🔄 Reintentar
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage

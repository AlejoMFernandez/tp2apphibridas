import { Activity } from 'react'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_URL_SOCKET)

const PruebaSockets = () => {
    // socket.on("conexion", () => console.log("conectado") )
    const [conectado, setConectado] = useState(socket.connected)
    const [nombre, setNombre] = useState("")
    const [unido, setUnido] = useState(false)
    const [jugadores, setJugadores] = useState({})

    useEffect(() => {
        socket.on("connect", () => {
            console.log("conectado al servidor", socket.id)
            setConectado(true)
        })
        socket.on("disconnect", () => {
            console.log("Desconectado")
            setConectado(false)
            setUnido(false)
            setJugadores({})
        })
        socket.on("estado", (estado) => {
            console.log("Estado actual", estado)
            setJugadores({ ...estado.jugadores })
        })
        //desconecta
        return () => {
            socket.off("connect", () => {
                console.log("conectado al servidor", socket.id)
                setConectado(true)
            })
            socket.off("disconnect", () => {
                console.log("Desconectado")
                setConectado(false)
                setUnido(false)
                setJugadores({})
            })
            socket.off("estado", (estado) => {
                console.log("Estado actual", estado)
                setJugadores({ ...estado.jugadores })
            })
        }
    }, [])

    const handleUnirme = () => {
        if (!nombre) {
            alert("Se debe ingresar un nombre")
            return
        }
        socket.emit("unirme", { "nombre": nombre })
        setUnido(true)
    }
    const handleSumarPuntos = () => {
        socket.emit("sumar-puntos")
    }

    const listadoJugadores = Object.entries(jugadores) //id, {nombre, puntos}
    console.log(listadoJugadores)
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
          <div className="w-full max-w-lg bg-slate-800/80 backdrop-blur rounded-2xl shadow-xl p-6 space-y-6">
            <h1 className="text-2xl font-semibold text-slate-50 text-center">
              Juego de puntos en tiempo real ⚡
            </h1>
      
            {/* Nombre + botón de entrar / sumar */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-200">
                Tu nombre
                <input
                  type="text"
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingresá tu nombre"
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </label>
      
              <div className="flex gap-3">
                <Activity mode={unido ? "hidden" : "visible"} className="flex-1">
                  <button
                    onClick={handleUnirme}
                    className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 active:scale-[0.98] transition"
                  >
                    Entrar al juego
                  </button>
                </Activity>
      
                <Activity mode={unido ? "visible" : "hidden"} className="flex-1">
                  <button
                    onClick={handleSumarPuntos}
                    className="w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-blue-400 active:scale-[0.98] transition"
                  >
                    Sumar puntos
                  </button>
                </Activity>
              </div>
            </div>
      
            {/* Listado de jugadores */}
            <section>
              <h2 className="text-lg font-semibold text-slate-100 mb-2">
                Jugadores conectados
              </h2>
      
              {listadoJugadores.length === 0 ? (
                <p className="text-sm text-slate-400">
                  Todavía no hay jugadores. Ingresá tu nombre y entrá al juego 👇
                </p>
              ) : (
                <div className="mt-2 space-y-2">
                  {listadoJugadores.map(([id, jugador]) => (
                    <div
                      key={id}
                      className="flex items-center justify-between rounded-lg bg-slate-700/80 px-3 py-2"
                    >
                      <span className="font-medium text-slate-100">
                        {jugador.nombre}
                      </span>
                      <span className="text-sm font-semibold text-emerald-400">
                        {jugador.puntos} pts
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      )
}

export default PruebaSockets
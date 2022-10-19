import { useState, createContext } from 'react'
import axios from 'axios'

const LetrasContext = createContext()

const LetrasProvider = ({ children }) => {
  const [alerta, setAlerta] = useState('')
  const [letra, setLetra] = useState('')
  const [cargando, setCargando] = useState(false)

  const busquedaLetra = async busqueda => {
    const { artista, cancion } = busqueda
    setCargando(true)
    console.log('cargando:', cargando)
    try {
      const url = `${import.meta.env.VITE_API_URL}/${cancion}/${artista}`
      console.log(url)
      const config = {
        method: 'GET',
        url: `${url}`,
        headers: {
          'X-RapidAPI-Key': `${import.meta.env.VITE_API_KEY}`,
          'X-RapidAPI-Host': `${import.meta.env.VITE_API_HOST}`,
        },
      }
      console.log('config:', config)
      axios.request(config).then(function (response) {
        const { data } = response
        console.log('data:', data)
        setLetra(data.lyrics)
        setAlerta('')
      })
    } catch (error) {
      setLetra('')
      setAlerta('Canción no encontrada')
      console.log(error)
    }
    setCargando(false)
    console.log('cargando2:', cargando)
  }

  return (
    <LetrasContext.Provider
      value={{
        alerta,
        setAlerta,
        busquedaLetra,
        letra,
        cargando,
      }}
    >
      {children}
    </LetrasContext.Provider>
  )
}

export { LetrasProvider }

export default LetrasContext

// http://api.musixmatch.com/ws/1.1/track.search?apikey=23fe66aebd76696c023fac54057663d7&q_artist=metallica&q_track=Enter Sandman

// http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=23fe66aebd76696c023fac54057663d7&track_id=218747334

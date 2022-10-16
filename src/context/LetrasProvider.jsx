import { useState, createContext } from 'react'
import axios from 'axios'

const LetrasContext = createContext()

const LetrasProvider = ({ children }) => {
  const [alerta, setAlerta] = useState('')

  const busquedaLetra = async busqueda => {
    const { artista, cancion } = busqueda
    try {
      const baseURL = 'https://api.musixmatch.com/ws/1.1'
      const apiKey = '23fe66aebd76696c023fac54057663d7'
      const url = `${baseURL}/track.search?apikey=${apiKey}&q_artist=${artista}&q_track=${cancion}`
      console.log('url', url)

      const config = {
        // mode: 'no-cors',s
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Credentials': 'true',
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        },
      }
      const resultado = axios.get(url, config)

      console.log('resultado', resultado)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LetrasContext.Provider
      value={{
        alerta,
        setAlerta,
        busquedaLetra,
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

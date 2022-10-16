import Formulario from './Formulario'
import useLetras from '../hooks/useLetras'
import Alerta from './Alerta'

const AppLetras = () => {
  const { alerta } = useLetras()
  return (
    <>
      <header>Búsqueda de Letras de Canciones</header>
      <Formulario />
      <main>{alerta && <Alerta>{alerta}</Alerta>}</main>
    </>
  )
}

export default AppLetras

import { useState, useEffect } from 'react'
import Tarjeta from './componentes/tarjeta'
import Filtros from './componentes/filtros'
import Graficas from './componentes/grafica'

function App() {
  const [datos, setDatos] = useState([])
  const [filtros, setFiltros] = useState({ modalidad: "", programa: "", nivel: "" })
  const [femeninos, setFemeninos] = useState(0)
  const [masculinos, setMasculinos] = useState(0)
  const [noBinarios, setNoBinarios] = useState(0)
  const [activos, setActivos] = useState(0)

  useEffect(() => {
    fetch('/datos.json')
      .then(res => res.json())
      .then(data => setDatos(data))
  }, [])

  useEffect(() => {
    if(!filtros){
      setFemeninos(datos.total_femeninos || 0)
      setMasculinos(datos.total_masculinos || 0)
      setNoBinarios(datos.total_nobinarios || 0)
      setActivos(datos.total_activos || 0)
    }else{
      
    }
  }, [datos, filtros])

  // Aplica filtros dinámicos
  const datosFiltrados = datos.filter(d =>
    (filtros.modalidad === "" || d.MODALIDAD === filtros.modalidad) &&
    (filtros.programa === "" || d.NOMBRE_PROGRAMA_FORMACION === filtros.programa) &&
    (filtros.nivel === "" || d.NIVEL_FORMACION === filtros.nivel)
  )

  // Datos para tarjetas
  const total = datosFiltrados.length


  // Opciones de filtros
  const programas = [...new Set(datos.map(d => d.NOMBRE_PROGRAMA_FORMACION))]
  const modalidades = [...new Set(datos.map(d => d.MODALIDAD))]
  const niveles = [...new Set(datos.map(d => d.NIVEL_FORMACION))]

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard Aprendices</h1>

      <Filtros filtros={filtros} setFiltros={setFiltros}
        programas={programas} modalidades={modalidades} niveles={niveles} />

      {/* Tarjetas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        <Tarjeta titulo="Total Aprendices" valor={total} />
        <Tarjeta titulo="Femeninos" valor={femeninos} />
        <Tarjeta titulo="Masculinos" valor={masculinos} />
        <Tarjeta titulo="No Binarios" valor={noBinarios} />
        <Tarjeta titulo="Activos" valor={activos} />
      </div>

      {/* Gráficas */}
      {datosFiltrados.length > 0 ? (
        <Graficas datos={datosFiltrados} />
      ) : (
        <p className="mt-4 text-gray-500">No hay datos para mostrar.</p>
      )}
    </div>
  )
}

export default App

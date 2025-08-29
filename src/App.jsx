import { useState, useEffect } from 'react'
import Tarjeta from './componentes/tarjeta'
import Graficas from './componentes/grafica'

function App() {
  const [datos, setDatos] = useState([])
  const [filtros, setFiltros] = useState({ modalidad: "", programa: "", nivel: "" })
  
  const [femeninos, setFemeninos] = useState(0)
  const [masculinos, setMasculinos] = useState(0)
  const [noBinarios, setNoBinarios] = useState(0)
  const [totalAprendices, setTotal_aprendices] = useState(0)
  const [activos, setActivos] = useState(0)

  const [modalidades, setModalidades] = useState([])
  const [programas, setProgramas] = useState([])
  const [niveles, setNiveles] = useState([])
  
  useEffect(() => {
    fetch('/datos.json')
      .then(res => res.json())
      .then(data => setDatos(data))
  }, [])
  const datosFiltrados = datos.filter(d =>
    (filtros.modalidad === "" || d.modalidad === filtros.modalidad) &&
    (filtros.programa === "" || d.nombre_programa === filtros.programa) &&
    (filtros.nivel === "" || d.nivel_formacion === filtros.nivel)
  )
  useEffect(() => {
    setModalidades([...new Set(datos.map(d => d.modalidad))])
    setProgramas([...new Set(datos.map(d => d.nombre_programa))])
    setNiveles([...new Set(datos.map(d => d.nivel_formacion))])
  }, [datos])

  useEffect(() => {
    let fem = 0, masc = 0, nb = 0, tot = 0, act = 0

    datosFiltrados.forEach(dato => {
      fem += dato.total_femeninos || 0
      masc += dato.total_masculinos || 0
      nb  += dato.total_nobinario || 0
      act += dato.total_aprendices_activos || 0
      tot += dato.total_aprendices || 0
    })

    setFemeninos(fem)
    setMasculinos(masc)
    setNoBinarios(nb)
    setTotal_aprendices(tot)
    setActivos(act)

  }, [datosFiltrados])
  const totalCursos = datosFiltrados.length

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard Aprendices</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select className="p-2 border rounded"
          value={filtros.modalidad}
          onChange={e => setFiltros({ ...filtros, modalidad: e.target.value })}>
          <option value="">Todas las Modalidades</option>
          {modalidades.map(mod => (
            <option key={mod} value={mod}>{mod}</option>
          ))}
        </select>
        <select className="p-2 border rounded"
          value={filtros.programa}
          onChange={e => setFiltros({ ...filtros, programa: e.target.value })}>
          <option value="">Todos los Programas</option>
          {programas.map(prog => (
            <option key={prog} value={prog}>{prog}</option>
          ))}
        </select>
        <select className="p-2 border rounded"
          value={filtros.nivel}
          onChange={e => setFiltros({ ...filtros, nivel: e.target.value })}>
          <option value="">Todos los Niveles</option>
          {niveles.map(niv => (
            <option key={niv} value={niv}>{niv}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        <Tarjeta titulo="Total cursos" valor={totalCursos} />
        <Tarjeta titulo="Femeninos" valor={femeninos} />
        <Tarjeta titulo="Masculinos" valor={masculinos} />
        <Tarjeta titulo="No Binarios" valor={noBinarios} />
        <Tarjeta titulo="Total Aprendices" valor={totalAprendices} />
        <Tarjeta titulo="Activos" valor={activos} />
      </div>

      {datosFiltrados.length > 0 ? (
        <Graficas datos={datosFiltrados} />
      ) : (
        <p className="mt-4 text-gray-500">No hay datos para mostrar.</p>
      )}
    </div>
  )
}

export default App

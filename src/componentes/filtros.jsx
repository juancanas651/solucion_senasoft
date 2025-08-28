import React from "react";

function Filtros({ filtros, setFiltros, programas, niveles, modalidades }) {
  return (
    <div className="flex gap-4 bg-white shadow p-4 rounded-xl">
      <select
        value={filtros.modalidad}
        onChange={e => setFiltros({ ...filtros, modalidad: e.target.value })}
        className="border rounded p-2"
      >
        <option value="">Todas las modalidades</option>
        {modalidades.map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      <select
        value={filtros.programa}
        onChange={e => setFiltros({ ...filtros, programa: e.target.value })}
        className="border rounded p-2"
      >
        <option value="">Todos los programas</option>
        {programas.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      <select
        value={filtros.nivel}
        onChange={e => setFiltros({ ...filtros, nivel: e.target.value })}
        className="border rounded p-2"
      >
        <option value="">Todos los niveles</option>
        {niveles.map(n => <option key={n} value={n}>{n}</option>)}
      </select>
    </div>
  )
}

export default Filtros

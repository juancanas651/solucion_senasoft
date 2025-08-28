import React from "react";

// src/componentes/Graficas.jsx
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

function Graficas({ datos }) {
    // Distribución por programa
    const programas = Object.entries(
        datos.reduce((acc, d) => {
            acc[d.NOMBRE_PROGRAMA_FORMACION] = (acc[d.NOMBRE_PROGRAMA_FORMACION] || 0) + 1
            return acc
        }, {})
    ).map(([name, value]) => ({ name, value }))

    // Distribución por modalidad
    const modalidades = Object.entries(
        datos.reduce((acc, d) => {
            acc[d.MODALIDAD] = (acc[d.MODALIDAD] || 0) + 1
            return acc
        }, {})
    ).map(([name, value]) => ({ name, value }))

    // Distribución por nivel
    const niveles = Object.entries(
        datos.reduce((acc, d) => {
            acc[d.NIVEL_FORMACION] = (acc[d.NIVEL_FORMACION] || 0) + 1
            return acc
        }, {})
    ).map(([name, value]) => ({ name, value }))

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Programas */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-2">Grupos por Programa</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={programas}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#0088FE" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Modalidades */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-2">Modalidad</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={modalidades} dataKey="value" outerRadius={100} label>
                            {modalidades.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Niveles */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-2">Niveles</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={niveles} dataKey="value" outerRadius={100} label>
                            {niveles.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Graficas

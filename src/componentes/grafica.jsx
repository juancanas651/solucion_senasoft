import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Paleta más amplia de colores
const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#A569BD", "#5DADE2", "#45B39D", "#F1948A",
    "#52BE80", "#F7DC6F", "#DC7633", "#7F8C8D",
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#A569BD", "#5DADE2", "#45B39D", "#F1948A",
    "#52BE80", "#F7DC6F", "#DC7633", "#7F8C8D"
];

function Graficas({ datos }) {
    const programas = Object.entries(
        datos.reduce((acumulado, d) => {
            const key = d.nombre_programa;//{"adso":2,"turimso":3}
            acumulado[key] = (acumulado[key] || 0) + 1;
            return acumulado;
        }, {})
    ).map(([name, cantidad]) => ({ name: `${name}`, cantidad }))

    const modalidades = Object.entries(
        datos.reduce((acumulado, d) => {
            const key = d.modalidad;
            acumulado[key] = (acumulado[key] || 0) + 1;
            return acumulado;
        }, {})
    ).map(([name, cantidad]) => ({ name: `${name}`, cantidad }));

    const niveles = Object.entries(
        datos.reduce((acumulado, d) => {
            const key = d.nivel_formacion;
            acumulado[key] = (acumulado[key] || 0) + 1;
            return acumulado;
        }, {})
    ).map(([name, cantidad]) => ({ name: `${name}`, cantidad }));

    return (
        <div className="flex gap-4 mt-4">
            <div className="bg-white p-4 rounded-xl shadow w-8/12">
                <h2 className="text-lg font-semibold mb-2">Grupos por Programa</h2>
                <ResponsiveContainer >
                    <BarChart data={programas}>
                        <XAxis dataKey="name" hide />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="cantidad">
                            {programas.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="w-4/12 ">
                <div className="bg-white p-1 rounded-xl shadow mb-2">
                    <h2 className="text-lg font-semibold mb-2">Modalidad</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={modalidades} dataKey="cantidad" label>
                                {modalidades.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-1 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-2">Niveles</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={niveles} dataKey="cantidad" label>
                                {niveles.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Graficas;

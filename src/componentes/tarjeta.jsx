import React from "react";

function Tarjeta({ titulo, valor }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center w-full">
      <span className="text-gray-500 text-sm">{titulo}</span>
      <span className="text-2xl font-bold">{valor}</span>
    </div>
  )
}

export default Tarjeta
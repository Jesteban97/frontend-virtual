import React, { useState } from "react"

/**
 * Componente para mostrar una lista de vuelos y permitir la selección de uno.
 * @param {Object[]} flights - Lista de vuelos a mostrar.
 * @param {Function} handleFlightSelection - Función para manejar la selección de vuelo.
 * @returns {JSX.Element} Componente de React que muestra la lista de vuelos.
 */
export default function ListaDeVuelos({ flights, handleFlightSelection }) {
  const [selectedFlight, setSelectedFlight] = useState(null)

  /**
   * Maneja la selección de un vuelo.
   * @param {Object} flight - Vuelo seleccionado.
   */
  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight)
    handleFlightSelection(flight)
  }

  return (
    <div className="m-1 rounded p-2 ">
      {flights.map((flight, index) => (
        <div
          key={index}
          className={`m-5 border-b-2 border-neutral-400 ${selectedFlight === flight ? " text-black" : "bg-white"}`}
        >
          <div className="flex justify-between p-4">
            <div className="mx-2">{flight.departureTime}</div>
            <div className="mx-2">{flight.originAirport}</div>
            <div className="mx-2 text-neutral-600">
              <div>Duración</div>
              {flight.duration}
            </div>
            <div className="mx-2">{flight.arrivalTime}</div>
            <div className="mx-2">{flight.destinationAirport}</div>
            <div className="mx-5">COP {flight.price}</div>
          </div>

          <div className="m-2 flex justify-end">
            <button
              className={`btn-select m-2 bg-blue-500 text-white ${
                selectedFlight === flight ? "btn-selected border-2 border-blue-500 bg-white text-blue-600" : ""
              }`}
              onClick={() => handleSelectFlight(flight)}
            >
              {selectedFlight === flight ? "Seleccionado" : "Seleccionar"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

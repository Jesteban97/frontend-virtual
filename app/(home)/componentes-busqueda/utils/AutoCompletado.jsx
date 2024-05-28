"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Componente de autocompletado para aeropuertos.
 *
 * @param {string} value - El valor actual del campo de entrada.
 * @param {function} onChange - Función de devolución de llamada que se llama cuando cambia el valor del campo de entrada.
 * @param {Array} airports - La lista de aeropuertos disponibles para autocompletar.
 * @returns {JSX.Element} Componente de autocompletado para aeropuertos.
 */
function AutoCompletado({ value, onChange, airports }) {
  const [suggestions, setSuggestions] = useState([]) // Estado para almacenar sugerencias de aeropuertos.
  const wrapperRef = useRef(null) // Referencia al contenedor del componente.

  // Efecto para agregar y quitar el listener de clic fuera del componente.
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Manejador de eventos para cerrar las sugerencias cuando se hace clic fuera del componente.
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSuggestions([])
    }
  }

  // Manejador de eventos para cambiar el valor del campo de entrada y filtrar las sugerencias.
  const handleChange = (event) => {
    const inputValue = event.target.value
    const filteredSuggestions = airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        airport.CodeIATA.toLowerCase().includes(inputValue.toLowerCase())
    )
    setSuggestions(filteredSuggestions)
    onChange(inputValue)
  }

  // Manejador de eventos para seleccionar un aeropuerto de la lista de sugerencias.
  const handleSelect = (airportName) => {
    onChange(airportName)
    setSuggestions([])
  }

  return (
    <div ref={wrapperRef} className="rounded border-2 border-gray-400">
      <div className="flex">
        <input type="text" value={value} onChange={handleChange} className="h-10 w-full rounded-md px-4 py-2" />
      </div>

      {/* Renderizar las sugerencias si hay alguna */}
      {suggestions.length > 0 && (
        <ul className="absolute rounded-xl bg:white">
          {suggestions.map((airport, index) => (
            <li
              className="p-2 hover:bg-gray-300"
              key={index}
              onClick={() => handleSelect(airport.name + " - " + airport.CodeIATA)}
            >
              {airport.name} - {airport.CodeIATA}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AutoCompletado

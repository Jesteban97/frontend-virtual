"use client"

import React, { useEffect, useState } from "react"
import AutoCompletado from "./componentes-busqueda/utils/AutoCompletado"
import Pasajeros from "./componentes-busqueda/utils/Pasajeros"
import Confirmacion from "./componentes-busqueda/Confirmacion"
import ListaDeVuelos from "./componentes-busqueda/ListaDeVuelos"
import { searchFlights } from "./componentes-busqueda/utils/ValidacionDeVuelos"
import { useFetch, useFetch1 } from "./componentes-busqueda/utils/useFetch"
import "./componentes-busqueda/styles/styles.css"

function HomePage() {
  // Estado para almacenar los datos del formulario y la interfaz de usuario
  const { dataAeropuertos } = useFetch1("https://codefact.udea.edu.co/modulo-03/api/aeropuertos/listar")
  const { dataVuelos } = useFetch("https://codefact.udea.edu.co/modulo-03/api/vuelos/listar")
  const [formData, setFormData] = useState({
    origin: "", // Aeropuerto de origen
    destination: "", // Aeropuerto de destino
    departureDate: "", // Fecha de salida
    returnDate: "", // Fecha de regreso (solo para vuelos de ida y vuelta)
    adults: 1, // Número de adultos
    children: 0, // Número de niños
    selectedOutboundFlight: null, // Vuelo de ida seleccionado
    selectedReturnFlight: null, // Vuelo de regreso seleccionado (solo para vuelos de ida y vuelta)
    isRoundTrip: true, // Indica si el usuario ha seleccionado vuelo de ida y vuelta
    showModal: false, // Indica si se debe mostrar el modal de confirmación
    showFlights: false, // Indica si se deben mostrar los vuelos disponibles
    availableFlights: [], // Lista de vuelos disponibles de ida
    availableFlightsRound: [], // Lista de vuelos disponibles de vuelta (solo para vuelos de ida y vuelta)
    airports: [], // Lista de aeropuertos para la autocompletación
    isOneWay: false, // Indica si el usuario ha seleccionado solo vuelo de ida
  })

  // Cargar los aeropuertos disponibles al montar el componente
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      airports: dataAeropuertos,
    }))
  }, [dataAeropuertos])

  // Cargar los vuelos disponibles al montar el componente
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      availableFlights: dataVuelos,
    }))
  }, [dataVuelos])

  // Función para buscar vuelos según los criterios seleccionados por el usuario
  const handleSearch = () => {
    const { availableFlights, origin, destination, departureDate, returnDate, isRoundTrip } = formData

    const { validFlightsOneWay, validFlightsRoundWay } = searchFlights(
      availableFlights,
      origin,
      destination,
      departureDate,
      returnDate
    )

    if (origin && destination && departureDate && validFlightsOneWay.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        availableFlights: validFlightsOneWay,
        availableFlightsRound: validFlightsRoundWay,
        showFlights: true,
        isOneWay: !isRoundTrip,
      }))
    } else {
      alert("Por favor selecciona un origen, destino válidos y fechas válidas.")
    }
  }

  // Función para confirmar la selección y cerrar el modal
  const handleAccept = () => {
    console.log("Form Data:", formData) // Acción de aceptar, aquí se puede enviar el formulario
    setFormData((prevData) => ({
      ...prevData,
      showModal: false,
    }))
  }

  return (
    <div>
      <div className="m-4 rounded">
        <div className="m-4 flex justify-normal">
          <h1 className="m-5 pt-2 text-3xl font-semibold">Vuelos</h1>
          <div className="m-2 flex justify-between rounded-xl p-2">
            <div className="mr-4 rounded-xl p-2">
              <input
                type="radio"
                id="roundTrip"
                name="isRoundTrip"
                value="true"
                checked={formData.isRoundTrip}
                onChange={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    isRoundTrip: true,
                  }))
                }
                className="r-boton"
              />
              <label htmlFor="roundTrip" className="radio-custom ml-2 w-full">
                IDA Y VUELTA
              </label>
            </div>
            <div className="rounded-xl p-2 ">
              <input
                type="radio"
                id="oneWay"
                name="isRoundTrip"
                value="false"
                checked={!formData.isRoundTrip}
                onChange={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    isRoundTrip: false,
                  }))
                }
                className="r-boton"
              />
              <label htmlFor="oneWay" className="w-100 radio-custom ml-2">
                SOLO IDA
              </label>
            </div>
          </div>
        </div>
        <div className="m-5 flex justify-between p-4">
          <div className="relative mx-2 ">
            <label className="label mb-2 block">Origen</label>
            <AutoCompletado
              value={formData.origin}
              onChange={(value) => setFormData((prevData) => ({ ...prevData, origin: value }))}
              airports={formData.airports}
            />
          </div>
          <div className="mx-2">
            <label className="label mb-2 block">Destino</label>
            <div className="z-20">
              <AutoCompletado
                value={formData.destination}
                onChange={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    destination: value,
                  }))
                }
                airports={formData.airports}
              />
            </div>
          </div>
          <div className="mx-2">
            <label className="label mb-2 block">Fecha de ida</label>
            <input
              type="date"
              value={formData.departureDate}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  departureDate: e.target.value,
                }))
              }
              className="w-full rounded border-2 border-gray-400 px-4 py-2"
            />
          </div>
          <div className="mx-2">
            {formData.isRoundTrip && (
              <div className="mx-2">
                <label className="label mb-2 block">Fecha de vuelta</label>
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      returnDate: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border-2 border-gray-400 px-4 py-2"
                />
              </div>
            )}
          </div>
          <div className="pt-6">
            <Pasajeros
              onAdultsChange={(value) => setFormData((prevData) => ({ ...prevData, adults: value }))}
              onChildrenChange={(value) => setFormData((prevData) => ({ ...prevData, children: value }))}
            />
          </div>

          <div className="mx-5 pt-4">
            <button className="btn-search" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </div>
      {/* Modal para confirmar la selección */}
      {formData.showModal && (
        <Confirmacion
          {...formData}
          onClose={() => setFormData((prevData) => ({ ...prevData, showModal: false }))}
          onAccept={handleAccept}
        />
      )}

      {/* Mostrar lista de vuelos */}
      {formData.showFlights && (
        <div className="m-4 mt-8 rounded p-2">
          {formData.isOneWay ? (
            // Mostrar lista de vuelos de ida
            <ListaDeVuelos
              flights={formData.availableFlights}
              handleFlightSelection={(flight) =>
                setFormData((prevData) => ({
                  ...prevData,
                  selectedOutboundFlight: flight,
                }))
              }
            />
          ) : (
            // Mostrar lista de vuelos de ida y vuelta
            <div>
              <h3 className="mt-2 text-xl font-semibold">Vuelos de ida</h3>
              <ListaDeVuelos
                flights={formData.availableFlights}
                handleFlightSelection={(flight) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    selectedOutboundFlight: flight,
                  }))
                }
              />
              {formData.selectedOutboundFlight && (
                <div>
                  <h3 className="mt-4 text-xl font-semibold">Vuelos de vuelta</h3>
                  <ListaDeVuelos
                    flights={formData.availableFlightsRound}
                    handleFlightSelection={(flight) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        selectedReturnFlight: flight,
                      }))
                    }
                  />
                </div>
              )}
            </div>
          )}
          {/* Botón para aceptar la selección y mostrar el modal */}
          <button
            onClick={() => setFormData((prevData) => ({ ...prevData, showModal: true }))}
            className="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Aceptar
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage

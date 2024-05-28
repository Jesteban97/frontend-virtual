// Modal.tsx
import React from 'react';

interface ModalProps {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children: number;
    selectedOutboundFlight: { id: number; name: string; price: number } | null;
    selectedReturnFlight: { id: number; name: string; price: number } | null;
    onClose: () => void;
    onAccept: () => void;
}

const Confirmacion: React.FC<ModalProps> = ({ origin, destination, departureDate, returnDate, adults, children, selectedOutboundFlight, selectedReturnFlight, onClose, onAccept }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 z-10">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Selected Flights:</h2>
                <p>Origin: {origin}</p>
                <p>Destination: {destination}</p>
                <p>Departure Date: {departureDate}</p>
                {returnDate && <p>Return Date: {returnDate}</p>}
                <p>Adults: {adults}</p>
                <p>Children: {children}</p>
                <p>
                    {selectedOutboundFlight?.name}
                </p>
                <p>
                    {selectedReturnFlight?.name}
                </p>
                <button
                    onClick={onAccept}
                    className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Confirm and Print to Console
                </button>
                <button
                    onClick={onClose}
                    className="mt-4 ml-4 bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default Confirmacion;
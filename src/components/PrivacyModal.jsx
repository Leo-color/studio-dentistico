import React from 'react';
import { useStudio } from '../context/StudioContext';

export const PrivacyModal = ({ isOpen, onClose }) => {
  const { studio } = useStudio();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Chiudi"
          >
            ✕
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-grow p-6 text-gray-700 text-sm leading-relaxed">
          <h3 className="font-bold text-lg text-gray-900 mb-4">1. Introduzione</h3>
          <p className="mb-4">
            La presente Privacy Policy descrive come {studio?.nome || 'Clinica Veterinaria'} raccoglie, utilizza e protegge i dati personali degli utenti del sito web.
          </p>

          <h3 className="font-bold text-lg text-gray-900 mb-4">2. Dati Raccolti</h3>
          <p className="mb-4">
            Durante la prenotazione online, raccogliamo i seguenti dati:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Nome e cognome</li>
            <li>Numero di telefono</li>
            <li>Indirizzo email</li>
            <li>Informazioni relative all'appuntamento</li>
          </ul>

          <h3 className="font-bold text-lg text-gray-900 mb-4">3. Utilizzo dei Dati</h3>
          <p className="mb-4">
            I dati personali vengono utilizzati esclusivamente per:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Gestire le prenotazioni online</li>
            <li>Comunicazioni relative al servizio</li>
          </ul>

          <h3 className="font-bold text-lg text-gray-900 mb-4">4. Diritti dell'Utente</h3>
          <p className="mb-4">
            Avete il diritto di:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Accedere ai vostri dati personali</li>
            <li>Rettificare dati inesatti</li>
            <li>Richiedere la cancellazione dei dati</li>
            <li>Revocare il consenso in qualsiasi momento</li>
          </ul>

          <p className="text-gray-600 text-xs mt-6">
            Ultima modifica: {new Date().toLocaleDateString('it-IT')}
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="flex-1 bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition"
          >
            Ho Compreso
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;

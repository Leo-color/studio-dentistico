import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

export const PrenotazioneConfermata = () => {
  const { id } = useParams();
  const { prenotazioni, studio } = useStudio();
  const prenotazione = prenotazioni.find(p => p.id === id);

  if (!prenotazione) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-red-600 mb-4">❌ Prenotazione Non Trovata</h1>
          <Link to="/" className="inline-block bg-blue-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800">
            ← Torna alla Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-16 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Success Banner */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4 animate-bounce">✅</div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
            PRENOTAZIONE CONFERMATA!
          </h1>
          <p className="text-xl text-gray-600">La tua visita è stata prenotata con successo</p>
        </div>

        {/* Riepilogo */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Dettagli Prenotazione</h2>

          <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">📅 Data:</span>
              <span className="font-bold text-gray-900">{prenotazione.dataFormattata}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">⏰ Orario:</span>
              <span className="font-bold text-gray-900">{prenotazione.orario}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">⏱️ Durata:</span>
              <span className="font-bold text-gray-900">{prenotazione.durata} minuti</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">🦷 Servizio:</span>
              <span className="font-bold text-gray-900">{prenotazione.servizioNome}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">💰 Prezzo:</span>
              <span className="font-bold text-green-600 text-xl">€{prenotazione.prezzo}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-4">👤 Dati Paziente</h3>
          <div className="space-y-2 text-gray-600">
            <p><strong>Nome e Cognome:</strong> {prenotazione.nome}</p>
            <p><strong>Email:</strong> {prenotazione.email}</p>
            <p><strong>Telefono:</strong> {prenotazione.telefono}</p>
            {prenotazione.note && <p><strong>Note:</strong> {prenotazione.note}</p>}
          </div>
        </div>

        {/* Email Confirmation */}
        <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded mb-8">
          <p className="text-gray-700">
            🔔 <strong>Email di conferma inviata a:</strong> <br />
            <span className="font-mono text-blue-700">{prenotazione.email}</span>
          </p>
        </div>

        {/* Azioni rapide */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Contatti Rapidi</h3>

          <a
            href={`tel:${studio.telefono.replace(/\s/g, '')}`}
            className="w-full block text-center bg-blue-700 text-white font-bold py-4 px-4 rounded-lg hover:bg-blue-800 transition text-lg"
          >
            ☎️ Chiama Studio
          </a>

          <Link
            to="/"
            className="w-full block text-center bg-gray-300 text-gray-800 font-bold py-4 px-4 rounded-lg hover:bg-gray-400 transition text-lg"
          >
            ← Torna alla Home
          </Link>
        </div>

        {/* Info aggiuntive */}
        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-3">ℹ️ Informazioni Importanti</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>✓ La tua prenotazione è confermata</li>
            <li>✓ In caso di necessità, contattaci con il Nome e Cognome della prenotazione</li>
            <li>✓ Si prega di presentarsi 5 minuti prima dell'orario</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrenotazioneConfermata;

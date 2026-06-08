import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import Modal from '../components/Modal';

export const AnnullaPrenotazione = () => {
  const [searchParams] = useSearchParams();
  const { prenotazioni, deletePrenotazione, addToast } = useStudio();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const prenotazioneId = searchParams.get('id');
  const prenotazione = prenotazioni.find(p => p.id === prenotazioneId);

  const handleAnnulla = () => {
    if (!prenotazione) {
      addToast('Prenotazione non trovata', 'error');
      return;
    }

    deletePrenotazione(prenotazione.id);
    setShowConfirmModal(false);
  };

  if (!prenotazione) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Prenotazione Non Trovata</h1>
          <p className="text-gray-600 mb-8">
            Non riusciamo a trovare la prenotazione che stai cercando.
            Potrebbe essere già stata annullata o il link potrebbe essere errato.
          </p>
          <Link to="/" className="inline-block bg-blue-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800">
            Torna alla Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Annulla Prenotazione</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Dettagli Prenotazione */}
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dettagli Prenotazione</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Numero Prenotazione:</span>
                <span className="font-bold text-gray-900">{prenotazione.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Paziente:</span>
                <span className="font-bold text-gray-900">{prenotazione.nome}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data:</span>
                <span className="font-bold text-gray-900">{prenotazione.dataFormattata}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Orario:</span>
                <span className="font-bold text-gray-900">{prenotazione.orario}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Servizio:</span>
                <span className="font-bold text-gray-900">{prenotazione.servizioNome}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prezzo:</span>
                <span className="font-bold text-gray-900">€{prenotazione.prezzo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-bold ${prenotazione.status === 'annullata' ? 'text-red-600' : 'text-green-600'}`}>
                  {prenotazione.status === 'annullata' ? 'Annullata' : 'Attiva'}
                </span>
              </div>
            </div>
          </div>

          {/* Avviso */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
            <h3 className="text-lg font-bold text-red-900 mb-2">Attenzione</h3>
            <p className="text-red-700">
              Se annulli questa prenotazione, non potrai recuperarla. Se desideri spostare la visita,
              contatta direttamente lo studio telefonicamente.
            </p>
          </div>

          {/* Azioni */}
          <div className="space-y-3">
            {prenotazione.status === 'annullata' ? (
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-700 font-semibold">Questa prenotazione è già stata annullata.</p>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition"
                >
                  Annulla Prenotazione
                </button>

                <p className="text-center text-gray-600 text-sm">
                  O contatta lo studio: info@studiodentistico.it
                </p>
              </>
            )}
          </div>

          <Link to="/" className="block text-center text-blue-700 hover:underline font-semibold">
            ← Torna alla Home
          </Link>
        </div>
      </div>

      {/* Modal Conferma */}
      <Modal
        isOpen={showConfirmModal}
        title="Conferma Annullamento"
        message={`Sei sicuro di voler annullare la prenotazione del ${prenotazione.dataFormattata} alle ${prenotazione.orario}? Non potrai recuperarla.`}
        onConfirm={handleAnnulla}
        onCancel={() => setShowConfirmModal(false)}
        confirmText="Annulla"
        cancelText="Torna Indietro"
        isDangerous={true}
      />
    </div>
  );
};

export default AnnullaPrenotazione;

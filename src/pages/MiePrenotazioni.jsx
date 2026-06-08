import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import Modal from '../components/Modal';

export const MiePrenotazioni = () => {
  const { prenotazioni, deletePrenotazione } = useStudio();
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [risultati, setRisultati] = useState([]);
  const [cercato, setCercato] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [prenotazioneDaCancellare, setPrenotazioneDaCancellare] = useState(null);

  // Scroll in alto quando la pagina carica
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCerca = (e) => {
    e.preventDefault();

    if (!nome.trim() || !cognome.trim()) {
      setRisultati([]);
      setCercato(true);
      return;
    }

    const trovate = prenotazioni.filter(p =>
      p.nome.toLowerCase().includes(nome.toLowerCase()) &&
      p.cognome && p.cognome.toLowerCase().includes(cognome.toLowerCase())
    );

    setRisultati(trovate);
    setCercato(true);
  };

  const handleCancella = (prenotazione) => {
    setPrenotazioneDaCancellare(prenotazione);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (prenotazioneDaCancellare) {
      deletePrenotazione(prenotazioneDaCancellare.id);
      setShowDeleteModal(false);
      setRisultati(risultati.filter(p => p.id !== prenotazioneDaCancellare.id));
      setPrenotazioneDaCancellare(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Le Tue Prenotazioni</h1>
          <p className="text-gray-600">Accedi alle tue prenotazioni, modificale o cancellale</p>
        </div>

        {/* Form di ricerca */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <form onSubmit={handleCerca} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Es: Mario"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Cognome *
                </label>
                <input
                  type="text"
                  value={cognome}
                  onChange={(e) => setCognome(e.target.value)}
                  placeholder="Es: Rossi"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition text-lg"
            >
              Cerca Prenotazioni
            </button>
          </form>
        </div>

        {/* Risultati */}
        {cercato && risultati.length === 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
            <p className="text-gray-700 text-center">
              <strong>Nessuna prenotazione trovata.</strong> Controlla nome e cognome e riprova.
            </p>
          </div>
        )}

        {/* Lista prenotazioni */}
        {risultati.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Prenotazioni trovate ({risultati.length})
            </h2>

            {risultati.map(prenotazione => (
              <div key={prenotazione.id} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Dettagli Prenotazione</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Numero:</strong> {prenotazione.id}</p>
                      <p><strong>Data:</strong> {prenotazione.dataFormattata}</p>
                      <p><strong>Orario:</strong> {prenotazione.orario}</p>
                      <p><strong>Servizio:</strong> {prenotazione.servizioNome}</p>
                      <p><strong>Prezzo:</strong> €{prenotazione.prezzo}</p>
                      <p><strong>Durata:</strong> {prenotazione.durata} minuti</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tuoi Dati</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Nome:</strong> {prenotazione.nome}</p>
                      <p><strong>Email:</strong> {prenotazione.email}</p>
                      <p><strong>Telefono:</strong> {prenotazione.telefono}</p>
                      <p><strong>Nuovo Paziente:</strong> {prenotazione.isNuovoP ? 'Sì' : 'No'}</p>
                      {prenotazione.note && <p><strong>Note:</strong> {prenotazione.note}</p>}
                    </div>
                  </div>
                </div>

                {/* Azioni */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleCancella(prenotazione)}
                    className="flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition"
                  >
                    Cancella Prenotazione
                  </button>
                  <Link
                    to="/"
                    className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition text-center"
                  >
                    Torna alla Home
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Link Home */}
        {!cercato && (
          <div className="text-center">
            <Link
              to="/"
              className="inline-block bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-400 transition"
            >
              ← Torna alla Home
            </Link>
          </div>
        )}
      </div>

      {/* Modal Conferma Cancellazione */}
      <Modal
        isOpen={showDeleteModal}
        title="Conferma Cancellazione"
        message={`Sei sicuro di voler cancellare la prenotazione del ${prenotazioneDaCancellare?.dataFormattata} alle ${prenotazioneDaCancellare?.orario}? Questa azione non può essere annullata.`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        confirmText="Sì, Cancella"
        cancelText="Annulla"
        isDangerous={true}
      />
    </div>
  );
};

export default MiePrenotazioni;

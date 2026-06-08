import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import Modal from '../components/Modal';

export const AdminPrenotazioni = () => {
  const { prenotazioni, updatePrenotazione, deletePrenotazione } = useStudio();
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [notaModal, setNotaModal] = useState({ open: false, id: null, nota: '' });

  const filteredPrenotazioni = useMemo(() => {
    return prenotazioni.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [prenotazioni]);

  const handleElimina = (id) => {
    deletePrenotazione(id);
    setDeleteModal({ open: false, id: null });
  };

  const handleAddNota = (id) => {
    const prenotazione = prenotazioni.find(p => p.id === id);
    setNotaModal({ open: true, id, nota: prenotazione?.nota || '' });
  };

  const handleSaveNota = () => {
    updatePrenotazione(notaModal.id, { nota: notaModal.nota });
    setNotaModal({ open: false, id: null, nota: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestisci Prenotazioni</h1>
          <p className="text-gray-600">Total: {filteredPrenotazioni.length} prenotazioni</p>
        </div>


        {/* Lista Prenotazioni */}
        {filteredPrenotazioni.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 text-lg">Nessuna prenotazione trovata</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPrenotazioni.map(p => (
              <div key={p.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{p.nome}</h3>
                    <p className="text-gray-600 text-sm">
                      {p.data} alle {p.orario}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      <strong>Servizio:</strong> {p.servizioNome} (€{p.prezzo})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-4 py-2 rounded-full font-bold text-white mb-2 ${
                      p.status === 'confermata'
                        ? 'bg-green-600'
                        : 'bg-yellow-600'
                    }`}>
                      {p.status === 'confermata' ? '✓ Confermata' : '⏳ Sospesa'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-4 mb-4">
                  <p className="text-gray-700"><strong>📧 Email:</strong> {p.email}</p>
                  <p className="text-gray-700"><strong>📞 Telefono:</strong> {p.telefono}</p>
                  <p className="text-gray-700"><strong>🆕 Nuovo Paziente:</strong> {p.isNuovoP ? 'Sì' : 'No'}</p>
                  {p.note && <p className="text-gray-700 mt-2"><strong>📝 Note:</strong> {p.note}</p>}
                  {p.nota && <p className="text-gray-700 mt-2 bg-blue-50 p-3 rounded"><strong>📌 Nota Admin:</strong> {p.nota}</p>}
                </div>

                {/* Azioni */}
                <div className="flex flex-wrap gap-2">

                  <a
                    href={`tel:${p.telefono.replace(/\D/g, '')}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition"
                  >
                    ☎️ Chiama
                  </a>

                  <a
                    href={`mailto:${p.email}`}
                    className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 font-semibold transition"
                  >
                    ✉️ Email
                  </a>

                  <button
                    onClick={() => handleAddNota(p.id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 font-semibold transition"
                  >
                    📝 Nota
                  </button>

                  <button
                    onClick={() => setDeleteModal({ open: true, id: p.id })}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold transition"
                  >
                    ❌ Elimina
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <Link
          to="/admin/dashboard"
          className="block text-center mt-8 bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition"
        >
          ← Torna al Dashboard
        </Link>
      </div>

      {/* Modal Elimina */}
      <Modal
        isOpen={deleteModal.open}
        title="Elimina Prenotazione"
        message="Sei sicuro? Questa azione non può essere annullata."
        onConfirm={() => handleElimina(deleteModal.id)}
        onCancel={() => setDeleteModal({ open: false, id: null })}
        confirmText="Elimina"
        cancelText="Annulla"
        isDangerous={true}
      />

      {/* Modal Nota */}
      {notaModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9998] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📝 Aggiungi Nota Privata</h2>
              <textarea
                value={notaModal.nota}
                onChange={(e) => setNotaModal(prev => ({ ...prev, nota: e.target.value }))}
                placeholder="Scrivi una nota privata per questa prenotazione..."
                rows="6"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 mb-4"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setNotaModal({ open: false, id: null, nota: '' })}
                  className="flex-1 bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-400 transition"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSaveNota}
                  className="flex-1 bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-800 transition"
                >
                  Salva
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPrenotazioni;

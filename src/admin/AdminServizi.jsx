import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import Modal from '../components/Modal';

// Emoji list removed - using professional design instead

export const AdminServizi = () => {
  const { servizi, addServizio, updateServizio, deleteServizio } = useStudio();
  const [newServizio, setNewServizio] = useState({
    nome: '',
    prezzo: '',
    durata: '',
    descrizione: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  const handleAddServizio = () => {
    if (!newServizio.nome || !newServizio.prezzo || !newServizio.durata) {
      return;
    }

    addServizio({
      ...newServizio,
      prezzo: parseInt(newServizio.prezzo),
      durata: parseInt(newServizio.durata),
    });

    setNewServizio({ nome: '', prezzo: '', durata: '', descrizione: '' });
  };

  const startEdit = (servizio) => {
    setEditingId(servizio.id);
    setEditData({ ...servizio });
  };

  const handleSaveEdit = () => {
    if (!editData.nome || !editData.prezzo || !editData.durata) {
      return;
    }

    updateServizio(editingId, {
      ...editData,
      prezzo: parseInt(editData.prezzo),
      durata: parseInt(editData.durata),
    });

    setEditingId(null);
    setEditData(null);
  };

  const handleDeleteServizio = (id) => {
    deleteServizio(id);
    setDeleteModal({ open: false, id: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin/dashboard" className="text-blue-700 hover:underline mb-4 inline-block">
            ← Torna al Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Modifica Servizi</h1>
          <p className="text-gray-600">Total: {servizi.length} servizi</p>
        </div>

        {/* Sezione Aggiungi Nuovo Servizio */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Aggiungi Nuovo Servizio</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Nome Servizio *</label>
              <input
                type="text"
                value={newServizio.nome}
                onChange={(e) => setNewServizio(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Es: Pulizia Dentale"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Prezzo (€) *</label>
              <input
                type="number"
                value={newServizio.prezzo}
                onChange={(e) => setNewServizio(prev => ({ ...prev, prezzo: e.target.value }))}
                placeholder="50"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Durata (min) *</label>
              <input
                type="number"
                value={newServizio.durata}
                onChange={(e) => setNewServizio(prev => ({ ...prev, durata: e.target.value }))}
                placeholder="30"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
              />
            </div>


            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-900 mb-2">Descrizione</label>
              <textarea
                value={newServizio.descrizione}
                onChange={(e) => setNewServizio(prev => ({ ...prev, descrizione: e.target.value }))}
                placeholder="Descrizione breve del servizio..."
                rows="3"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
              />
            </div>
          </div>

          <button
            onClick={handleAddServizio}
            className="w-full bg-blue-700 text-white font-bold py-4 px-4 rounded-lg hover:bg-blue-800 transition text-lg"
          >
            AGGIUNGI SERVIZIO
          </button>
        </div>

        {/* Lista Servizi */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Servizi Esistenti</h2>

          {servizi.length === 0 ? (
            <div className="bg-white p-8 rounded-lg text-center text-gray-600">
              Nessun servizio. Aggiungine uno!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servizi.map(servizio => (
                editingId === servizio.id ? (
                  // Modalità Edit
                  <div key={servizio.id} className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-lg">
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-900 mb-2">Nome</label>
                      <input
                        type="text"
                        value={editData.nome}
                        onChange={(e) => setEditData(prev => ({ ...prev, nome: e.target.value }))}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Prezzo</label>
                        <input
                          type="number"
                          value={editData.prezzo}
                          onChange={(e) => setEditData(prev => ({ ...prev, prezzo: e.target.value }))}
                          className="w-full p-3 border-2 border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Durata</label>
                        <input
                          type="number"
                          value={editData.durata}
                          onChange={(e) => setEditData(prev => ({ ...prev, durata: e.target.value }))}
                          className="w-full p-3 border-2 border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-900 mb-2">Descrizione</label>
                      <textarea
                        value={editData.descrizione}
                        onChange={(e) => setEditData(prev => ({ ...prev, descrizione: e.target.value }))}
                        rows="2"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700"
                      >
                        Salva
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 bg-gray-400 text-white font-bold py-2 rounded hover:bg-gray-500"
                      >
                        Annulla
                      </button>
                    </div>
                  </div>
                ) : (
                  // Modalità Visualizzazione
                  <div key={servizio.id} className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{servizio.nome}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{servizio.descrizione}</p>
                    <div className="bg-gray-50 p-3 rounded mb-4 text-center">
                      <p className="text-lg font-bold text-blue-700">€{servizio.prezzo}</p>
                      <p className="text-sm text-gray-600">{servizio.durata} min</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(servizio)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
                      >
                        Modifica
                      </button>
                      <button
                        onClick={() => setDeleteModal({ open: true, id: servizio.id })}
                        className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold"
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Elimina */}
      <Modal
        isOpen={deleteModal.open}
        title="Elimina Servizio"
        message="Sei sicuro di voler eliminare questo servizio? Questa azione non può essere annullata."
        onConfirm={() => handleDeleteServizio(deleteModal.id)}
        onCancel={() => setDeleteModal({ open: false, id: null })}
        confirmText="Elimina"
        cancelText="Annulla"
        isDangerous={true}
      />
    </div>
  );
};

export default AdminServizi;

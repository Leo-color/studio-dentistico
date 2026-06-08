import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

export const AdminOrari = () => {
  const { orari, ferie, updateOrari, addFerie, removeFerie, addToast } = useStudio();
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedFerie, setExpandedFerie] = useState(false);
  const [newFeria, setNewFeria] = useState({ dal: '', al: '', motivo: '' });
  const [localOrari, setLocalOrari] = useState(orari);

  const giorni = [
    { key: 'lunedi', label: 'Lunedì' },
    { key: 'martedi', label: 'Martedì' },
    { key: 'mercoledi', label: 'Mercoledì' },
    { key: 'giovedi', label: 'Giovedì' },
    { key: 'venerdi', label: 'Venerdì' },
    { key: 'sabato', label: 'Sabato' },
    { key: 'domenica', label: 'Domenica' },
  ];

  const handleOraChange = (day, field, value) => {
    setLocalOrari(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleToggleAperto = (day) => {
    setLocalOrari(prev => ({
      ...prev,
      [day]: { ...prev[day], aperto: !prev[day].aperto }
    }));
  };

  const handleSalvaOrari = () => {
    updateOrari(localOrari);
  };

  const handleAddFeria = () => {
    if (!newFeria.dal || !newFeria.al) {
      addToast('Inserisci date valide', 'error');
      return;
    }
    addFerie(newFeria);
    setNewFeria({ dal: '', al: '', motivo: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin/dashboard" className="text-blue-700 hover:underline mb-4 inline-block">
            ← Torna al Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Modifica Orari</h1>
          <p className="text-gray-600">Gestisci gli orari di apertura e le ferie</p>
        </div>

        {/* Sezione Orari */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Orari di Apertura</h2>

          <div className="space-y-4">
            {giorni.map(giorno => (
              <div key={giorno.key} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Header accordion */}
                <button
                  onClick={() => setExpandedDay(expandedDay === giorno.key ? null : giorno.key)}
                  className="w-full bg-gradient-to-r from-blue-100 to-cyan-100 p-4 flex justify-between items-center hover:bg-blue-50 transition"
                >
                  <span className="font-bold text-gray-900">{giorno.label}</span>
                  <span className={`transform transition ${expandedDay === giorno.key ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {/* Content accordion */}
                {expandedDay === giorno.key && (
                  <div className="p-6 space-y-4 border-t border-gray-200 bg-gray-50">
                    {/* Toggle Aperto */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localOrari[giorno.key].aperto}
                        onChange={() => handleToggleAperto(giorno.key)}
                        className="w-5 h-5"
                      />
                      <span className="font-semibold text-gray-900">Studio Aperto</span>
                    </label>

                    {localOrari[giorno.key].aperto && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                              Apertura
                            </label>
                            <input
                              type="time"
                              value={localOrari[giorno.key].apertura || ''}
                              onChange={(e) => handleOraChange(giorno.key, 'apertura', e.target.value)}
                              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-700"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                              Chiusura
                            </label>
                            <input
                              type="time"
                              value={localOrari[giorno.key].chiusura || ''}
                              onChange={(e) => handleOraChange(giorno.key, 'chiusura', e.target.value)}
                              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-700"
                            />
                          </div>
                        </div>

                        <hr />

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                              Pausa dalle
                            </label>
                            <input
                              type="time"
                              value={localOrari[giorno.key].pausaDa || ''}
                              onChange={(e) => handleOraChange(giorno.key, 'pausaDa', e.target.value)}
                              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-700"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                              Pausa fino
                            </label>
                            <input
                              type="time"
                              value={localOrari[giorno.key].pausaA || ''}
                              onChange={(e) => handleOraChange(giorno.key, 'pausaA', e.target.value)}
                              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-700"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sezione Ferie */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Ferie e Chiusure</h2>

          {/* Toggle Ferie */}
          <button
            onClick={() => setExpandedFerie(!expandedFerie)}
            className="w-full bg-gradient-to-r from-yellow-100 to-orange-100 p-4 flex justify-between items-center hover:bg-yellow-50 transition rounded-lg mb-6"
          >
            <span className="font-bold text-gray-900">Aggiungi Ferie</span>
            <span className={`transform transition ${expandedFerie ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {expandedFerie && (
            <div className="p-6 space-y-4 border border-yellow-200 rounded-lg bg-yellow-50 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Dal
                  </label>
                  <input
                    type="date"
                    value={newFeria.dal}
                    onChange={(e) => setNewFeria(prev => ({ ...prev, dal: e.target.value }))}
                    className="w-full p-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Al
                  </label>
                  <input
                    type="date"
                    value={newFeria.al}
                    onChange={(e) => setNewFeria(prev => ({ ...prev, al: e.target.value }))}
                    className="w-full p-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Motivo (opzionale)
                </label>
                <input
                  type="text"
                  value={newFeria.motivo}
                  onChange={(e) => setNewFeria(prev => ({ ...prev, motivo: e.target.value }))}
                  placeholder="Es: Ferie, Corso, Evento"
                  className="w-full p-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-600"
                />
              </div>
              <button
                onClick={handleAddFeria}
                className="w-full bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-700 transition"
              >
                + AGGIUNGI FERIA
              </button>
            </div>
          )}

          {/* Lista Ferie */}
          {ferie.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900">Ferie Registrate:</h3>
              {ferie.map(feria => (
                <div key={feria.id} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">
                      📅 Da {feria.dal} a {feria.al}
                    </p>
                    {feria.motivo && <p className="text-sm text-gray-600">{feria.motivo}</p>}
                  </div>
                  <button
                    onClick={() => removeFerie(feria.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    ❌ Rimuovi
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Salva */}
        <button
          onClick={handleSalvaOrari}
          className="w-full bg-green-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-green-700 transition text-lg mb-4"
        >
          ✓ SALVA TUTTI GLI ORARI
        </button>
      </div>
    </div>
  );
};

export default AdminOrari;

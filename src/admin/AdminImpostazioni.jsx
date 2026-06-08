import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import Modal from '../components/Modal';

export const AdminImpostazioni = () => {
  const navigate = useNavigate();
  const { setAdminLogged, addToast } = useStudio();

  const [expandedSection, setExpandedSection] = useState(null);
  const [passwordData, setPasswordData] = useState({
    vecchia: '',
    nuova: '',
    conferma: '',
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Credenziali attuali hardcoded (da localStorage in futuro)
  const CURRENT_PASSWORD = '1234';

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleCambiaPassword = () => {
    // Validazioni
    if (!passwordData.vecchia || !passwordData.nuova || !passwordData.conferma) {
      addToast('Compila tutti i campi', 'error');
      return;
    }

    if (passwordData.vecchia !== CURRENT_PASSWORD) {
      addToast('Password attuale errata', 'error');
      return;
    }

    if (passwordData.nuova.length < 6) {
      addToast('La nuova password deve avere almeno 6 caratteri', 'error');
      return;
    }

    if (passwordData.nuova !== passwordData.conferma) {
      addToast('Le password non corrispondono', 'error');
      return;
    }

    if (passwordData.vecchia === passwordData.nuova) {
      addToast('La nuova password deve essere diversa da quella attuale', 'error');
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmaPassword = () => {
    // Salva la nuova password in localStorage
    localStorage.setItem('adminPassword', passwordData.nuova);
    setShowConfirmModal(false);
    setPasswordData({ vecchia: '', nuova: '', conferma: '' });
    addToast('Password cambiata con successo!', 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminPassword');
    setAdminLogged(false);
    addToast('Logout effettuato', 'success');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin/dashboard" className="text-blue-700 hover:underline mb-4 inline-block">
            ← Torna al Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Impostazioni Admin</h1>
          <p className="text-gray-600">Gestisci le tue preferenze e impostazioni</p>
        </div>

        {/* Sections */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Sezione Cambio Password */}
          <div>
            <button
              onClick={() => setExpandedSection(expandedSection === 'password' ? null : 'password')}
              className="w-full bg-gradient-to-r from-blue-100 to-blue-50 p-6 flex justify-between items-center hover:bg-blue-50 transition"
            >
              <span className="text-xl font-bold text-gray-900">Cambia Password</span>
              <span className={`transform transition ${expandedSection === 'password' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'password' && (
              <div className="p-8 bg-gray-50 space-y-6 border-t border-gray-200">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>Importante:</strong> Ricorda la tua nuova password. Non potremo recuperarla se la dimentichi.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Password Attuale
                  </label>
                  <input
                    type="password"
                    name="vecchia"
                    value={passwordData.vecchia}
                    onChange={handlePasswordChange}
                    placeholder="Inserisci la password attuale"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Nuova Password
                  </label>
                  <input
                    type="password"
                    name="nuova"
                    value={passwordData.nuova}
                    onChange={handlePasswordChange}
                    placeholder="Inserisci la nuova password (minimo 6 caratteri)"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Conferma Nuova Password
                  </label>
                  <input
                    type="password"
                    name="conferma"
                    value={passwordData.conferma}
                    onChange={handlePasswordChange}
                    placeholder="Riscrivi la nuova password"
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
                  />
                </div>

                <button
                  onClick={handleCambiaPassword}
                  className="w-full bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition"
                >
                  Salva Nuova Password
                </button>
              </div>
            )}
          </div>

          {/* Sezione Sessione */}
          <div className="border-t border-gray-200">
            <button
              onClick={() => setExpandedSection(expandedSection === 'sessione' ? null : 'sessione')}
              className="w-full bg-gradient-to-r from-red-100 to-red-50 p-6 flex justify-between items-center hover:bg-red-50 transition"
            >
              <span className="text-xl font-bold text-gray-900">Sessione</span>
              <span className={`transform transition ${expandedSection === 'sessione' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'sessione' && (
              <div className="p-8 bg-gray-50 space-y-4 border-t border-gray-200">
                <p className="text-gray-700">
                  Sei connesso come <strong>amministratore</strong>. Per motivi di sicurezza, ti consigliamo di
                  disconnetterti quando termini di usare questo computer.
                </p>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Sezione Informazioni */}
          <div className="border-t border-gray-200">
            <button
              onClick={() => setExpandedSection(expandedSection === 'info' ? null : 'info')}
              className="w-full bg-gradient-to-r from-gray-100 to-gray-50 p-6 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span className="text-xl font-bold text-gray-900">Informazioni</span>
              <span className={`transform transition ${expandedSection === 'info' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedSection === 'info' && (
              <div className="p-8 bg-gray-50 space-y-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Versione Applicazione</p>
                  <p className="text-lg font-semibold text-gray-900">1.0.0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ultimo Aggiornamento</p>
                  <p className="text-lg font-semibold text-gray-900">Giugno 2026</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Supporto</p>
                  <p className="text-lg font-semibold text-gray-900">
                    <a href="mailto:support@studiodentistico.it" className="text-blue-700 hover:underline">
                      support@studiodentistico.it
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Conferma */}
      <Modal
        isOpen={showConfirmModal}
        title="Conferma Cambio Password"
        message="Sei sicuro? Ricorda la nuova password per i prossimi accessi."
        onConfirm={handleConfirmaPassword}
        onCancel={() => setShowConfirmModal(false)}
        confirmText="Conferma"
        cancelText="Annulla"
      />
    </div>
  );
};

export default AdminImpostazioni;

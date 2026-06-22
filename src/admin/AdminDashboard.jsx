import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import { deleteAdminSessionFromFirebase, saveAdminPasswordToFirebase } from '../services/firebaseService';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { prenotazioni, studio, setAdminLogged, addToast } = useStudio();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // DEBUG: Auto-set admin token for testing
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      localStorage.setItem('adminToken', JSON.stringify({ username: 'dentista', loginTime: new Date().toISOString() }));
      console.log('✅ DEBUG: adminToken set in localStorage');
    }
  }, []);

  // Scroll in alto quando la pagina carica
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLogout = async () => {
    // Rimuovi da localStorage
    localStorage.removeItem('adminToken');

    // Rimuovi da Firebase
    await deleteAdminSessionFromFirebase();

    setAdminLogged(false);
    addToast('Logout effettuato', 'success');
    navigate('/admin');
  };

  const handleChangePassword = async () => {
    setPasswordError('');

    // Leggi password attuale dal localStorage
    const currentSavedPassword = localStorage.getItem('adminPassword') || '1234';

    if (passwordData.currentPassword !== currentSavedPassword) {
      setPasswordError('Password attuale errata');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Nuova password deve essere almeno 6 caratteri');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Le password non corrispondono');
      return;
    }

    try {
      // Salva la nuova password nel localStorage
      localStorage.setItem('adminPassword', passwordData.newPassword);

      // Salva la nuova password su Firebase
      await saveAdminPasswordToFirebase(passwordData.newPassword);

      addToast('Password aggiornata con successo!', 'success');
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setPasswordError('Errore nell\'aggiornamento della password: ' + error.message);
    }
  };

  // Stats
  const prenotazioniOggi = prenotazioni.filter(p => {
    const today = new Date().toISOString().split('T')[0];
    return p.data === today;
  }).length;

  const pazientiTotali = new Set(prenotazioni.map(p => p.email)).size;

  return (
    <>
      {/* Modal Cambia Password */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9998] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cambia Password</h2>

              {/* Messaggio Errore in Rosso */}
              {passwordError && (
                <div className="mb-4 p-3 bg-red-50 border-2 border-red-500 rounded-lg">
                  <p className="text-red-700 font-semibold text-sm">{passwordError}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Password Attuale</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
                    placeholder="Inserisci password attuale"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Nuova Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
                    placeholder="Min. 6 caratteri"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Conferma Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className={`w-full p-3 border-2 rounded-lg focus:border-blue-700 font-semibold ${
                      passwordError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ripeti password"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordError('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition"
                >
                  Annulla
                </button>
                <button
                  onClick={handleChangePassword}
                  className="flex-1 bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition"
                >
                  Salva Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    <div className="min-h-screen bg-gray-50">
      {/* Navbar Admin */}
      <nav className="bg-gradient-to-r from-blue-700 to-blue-800 text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-black text-white">Studio Dentistico</Link>

            <div className="hidden md:flex gap-6 items-center">
              <div className="text-right">
                <p className="text-sm text-blue-100">Benvenuto</p>
                <span className="font-bold text-lg">{studio.dottore}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-bold transition shadow-md"
              >
                Logout
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-sm font-semibold"
              aria-label="Toggle menu"
            >
              {menuOpen ? 'Chiudi' : 'Menu'}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 border-t border-blue-600 pt-4 space-y-3">
              <div className="text-sm text-blue-100 mb-4">
                <p>Benvenuto, <strong>{studio.dottore}</strong></p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intestazione */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard Amministrativo
          </h1>
          <p className="text-lg text-gray-600">Benvenuto! Gestisci il tuo studio dentistico</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <p className="text-gray-600 text-sm font-semibold mb-2">Visite Oggi</p>
            <p className="text-5xl font-bold text-blue-700">{prenotazioniOggi}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <p className="text-gray-600 text-sm font-semibold mb-2">Pazienti Totali</p>
            <p className="text-5xl font-bold text-blue-600">{pazientiTotali}</p>
          </div>
        </div>

        {/* Menu Rapido */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Gestione Studio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/admin/orari"
              className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center border border-blue-500/30 shadow-md"
            >
              <p className="font-bold text-lg mb-2">Orari & Ferie</p>
              <p className="text-sm text-blue-100">Gestisci disponibilità</p>
            </Link>

            <Link
              to="/admin/prenotazioni"
              className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center border border-green-500/30 shadow-md"
            >
              <p className="font-bold text-lg mb-2">Prenotazioni</p>
              <p className="text-sm text-green-100">Visualizza tutte le visite</p>
            </Link>

            <Link
              to="/admin/info-studio"
              className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center border border-purple-500/30 shadow-md"
            >
              <p className="font-bold text-lg mb-2">Info Studio</p>
              <p className="text-sm text-purple-100">Modifica contatti e dati</p>
            </Link>

            <Link
              to="/admin/servizi"
              className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center border border-orange-500/30 shadow-md"
            >
              <p className="font-bold text-lg mb-2">Servizi</p>
              <p className="text-sm text-orange-100">Gestisci listino prezzi</p>
            </Link>
          </div>
        </div>

        {/* Prenotazioni Oggi */}
        <div className="bg-white rounded-lg shadow-lg p-10 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Appuntamenti Oggi</h2>

          {prenotazioniOggi === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nessuna prenotazione per oggi</p>
            </div>
          ) : (
            <div className="space-y-4">
              {prenotazioni
                .filter(p => p.data === new Date().toISOString().split('T')[0])
                .map(p => (
                  <div key={p.id} className="border border-gray-200 p-6 rounded-lg hover:shadow-md hover:bg-gray-50 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-lg text-gray-900">{p.nome}</p>
                        <p className="text-gray-600 font-medium">{p.servizioNome}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                        p.status === 'confermata'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {p.status === 'confermata' ? 'Confermata' : 'Sospesa'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 font-medium">{p.orario} • €{p.prezzo}</p>
                    <div className="flex gap-3">
                      <a
                        href={`tel:${p.telefono.replace(/\D/g, '')}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      >
                        Chiama
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          )}

          <Link
            to="/admin/prenotazioni"
            className="block text-center mt-8 bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Vedi Tutte le Prenotazioni
          </Link>
        </div>

        {/* Cambia Password Section */}
        <div className="bg-white rounded-lg shadow-lg p-10 border border-gray-100 mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sicurezza Account</h2>
          <p className="text-gray-600 mb-6">Modifica la password del tuo account amministrativo</p>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-md"
          >
            Cambia Password
          </button>
        </div>
      </div>

    </div>
    </>
  );
};

export default AdminDashboard;

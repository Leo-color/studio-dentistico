import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import { saveAdminSessionToFirebase } from '../services/firebaseService';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { setAdminLogged, addToast, studio } = useStudio();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: code
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotCode, setForgotCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Scroll in alto quando la pagina carica
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('📝 Input changed:', { name, value });
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    console.log('🔐 LOGIN ATTEMPT:', { username: credentials.username, passwordLength: credentials.password.length });

    try {
      // Leggi password dal localStorage (quella salvata nel cambio password)
      const savedPassword = localStorage.getItem('adminPassword') || '1234';
      console.log('🔑 Saved password check:', { saved: savedPassword, entered: credentials.password, match: credentials.password === savedPassword });

      if (credentials.username === 'admin.dentistico@studio.it' && credentials.password === savedPassword) {
        console.log('✅ LOGIN SUCCESSFUL - Setting adminLogged and navigating...');
        const sessionData = { username: credentials.username, loginTime: new Date().toISOString() };

        // Salva su localStorage
        localStorage.setItem('adminToken', JSON.stringify(sessionData));

        // Salva su Firebase
        try {
          await saveAdminSessionToFirebase(sessionData);
        } catch (firebaseError) {
          console.warn('Firebase non disponibile, ma login salvato in localStorage:', firebaseError);
        }

        setAdminLogged(true);
        navigate('/admin/dashboard');
      } else {
        setLoginError('Username o password errati');
      }
    } catch (error) {
      setLoginError('Errore durante il login: ' + error.message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendForgotCode = async () => {
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      addToast('Email non valida', 'error');
      return;
    }

    setLoading(true);

    // Genera codice casuale a 6 cifre
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(randomCode);

    // Email disabilitata: copia il codice negli appunti
    try {
      navigator.clipboard.writeText(randomCode);
      addToast('✅ Codice copiato negli appunti (6 cifre)', 'success');
    } catch (err) {
      // Fallback: mostra il codice in una nota che scompare dopo 15 secondi
      addToast(`⚠️ Codice: ${randomCode} (scompare tra 15 secondi)`, 'info');
      setTimeout(() => setSentCode(''), 15000);
    }
    setForgotStep(2);

    setLoading(false);
  };

  const handleVerifyForgotCode = async () => {
    if (forgotCode !== sentCode) {
      addToast('Codice errato', 'error');
      return;
    }

    // Codice corretto, accedi
    const sessionData = { email: forgotEmail, loginTime: new Date().toISOString() };

    // Salva su localStorage
    localStorage.setItem('adminToken', JSON.stringify(sessionData));

    // Salva su Firebase
    await saveAdminSessionToFirebase(sessionData);

    setAdminLogged(true);
    addToast('Accesso riuscito!', 'success');
    setShowForgotPassword(false);
    navigate('/admin/dashboard');
  };

  return (
    <>
      {/* Modal Password Dimenticata */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9998] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <div className="p-6">
        <div className="max-w-sm mx-auto">
          {forgotStep === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Dimenticata</h2>
              <p className="text-gray-600 mb-6">Genera un codice di accesso per l'account:</p>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <p className="text-center font-bold text-blue-700 text-lg">{studio.email}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotStep(1);
                    setForgotEmail('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition"
                >
                  Annulla
                </button>
                <button
                  onClick={() => {
                    setForgotEmail(studio.email);
                    handleSendForgotCode();
                  }}
                  disabled={loading}
                  className="flex-1 bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
                >
                  {loading ? 'Generazione...' : 'Genera Codice'}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Immetti Codice di Accesso</h2>
              <p className="text-gray-600 mb-4 text-sm">Inserisci il codice mostrato a schermo per {forgotEmail}</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Codice</label>
                  <input
                    type="text"
                    value={forgotCode}
                    onChange={(e) => setForgotCode(e.target.value.toUpperCase())}
                    placeholder="000000"
                    maxLength="6"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold text-center text-2xl font-bold tracking-widest"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setForgotStep(1);
                    setForgotCode('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition"
                >
                  Indietro
                </button>
                <button
                  onClick={handleVerifyForgotCode}
                  className="flex-1 bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition"
                >
                  Verifica
                </button>
              </div>
            </>
          )}
        </div>
            </div>
          </div>
        </div>
      )}

    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Clinica Veterinaria</h1>
          <p className="text-gray-600 text-base font-medium">Pannello Amministrazione</p>
        </div>

        {/* Card Login */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Accesso</h2>
            <p className="text-blue-100">Pannello di controllo</p>
          </div>

          {/* Form */}
          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="studio@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 text-base transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 text-base transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg text-base disabled:opacity-50"
              >
                {loading ? 'Accesso in corso...' : 'ACCEDI'}
              </button>

              {loginError && (
                <div className="mt-4 p-3 bg-red-50 border-2 border-red-500 rounded-lg">
                  <p className="text-red-700 font-semibold text-center">{loginError}</p>
                </div>
              )}
            </form>

            <div className="space-y-3 mt-8">
              <Link
                to="/"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition"
              >
                ← Torna al Sito Pubblico
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Solo amministratori autorizzati</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminLogin;

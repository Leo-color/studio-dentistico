import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

export const AdminLoginCode = () => {
  const navigate = useNavigate();
  const { setAdminLogged, addToast } = useStudio();
  const [step, setStep] = useState(1); // 1: email, 2: code
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
      // Fallback: mostra il codice in un modal che scompare dopo 15 secondi
      addToast(`⚠️ Codice: ${randomCode} (scompare tra 15 secondi)`, 'info');
      setTimeout(() => setSentCode(''), 15000);
    }
    setStep(2);

    setLoading(false);
  };

  const handleVerifyCode = () => {
    if (code !== sentCode) {
      addToast('Codice errato', 'error');
      return;
    }

    // Codice corretto, accedi
    localStorage.setItem('adminToken', JSON.stringify({ email }));
    setAdminLogged(true);
    addToast('Accesso riuscito!', 'success');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Clinica Veterinaria</h1>
          <p className="text-gray-600 text-base font-medium">Accedi tramite Codice</p>
        </div>

        {/* Card Login */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Accesso Sicuro</h2>
            <p className="text-blue-100">
              {step === 1 ? 'Inserisci la tua email' : 'Inserisci il codice generato'}
            </p>
          </div>

          {/* Form */}
          <div className="p-10">
            {step === 1 ? (
              // STEP 1: Email
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Email Studio
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="info@clinicaveterinaria.it"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 text-base transition"
                    required
                  />
                </div>

                <button
                  onClick={handleSendCode}
                  disabled={loading}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg text-base disabled:opacity-50"
                >
                  {loading ? 'Generazione...' : 'Genera Codice'}
                </button>
              </div>
            ) : (
              // STEP 2: Code
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    Inserisci il codice di 6 cifre mostrato a schermo per l'account:
                  </p>
                  <p className="font-bold text-gray-900">{email}</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Codice di Accesso
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="000000"
                    maxLength="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 text-base transition text-center text-2xl font-bold tracking-widest"
                    required
                  />
                </div>

                <button
                  onClick={handleVerifyCode}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg text-base"
                >
                  Verifica Codice
                </button>

                <button
                  onClick={() => {
                    setStep(1);
                    setCode('');
                    setSentCode('');
                  }}
                  className="w-full text-center text-blue-700 hover:text-blue-800 font-semibold py-2 transition"
                >
                  ← Torna Indietro
                </button>
              </div>
            )}

            <div className="my-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
            </div>

            <Link
              to="/admin"
              className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition"
            >
              ← Login Tradizionale
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Accesso riservato ai dentisti</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginCode;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import GoogleMap from '../components/GoogleMap';

export const Contatti = () => {
  const { studio, addToast } = useStudio();
  const [formData, setFormData] = useState({ nome: '', email: '', messaggio: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.messaggio) {
      addToast('Compila tutti i campi', 'error');
      return;
    }
    addToast(`Messaggio ricevuto! Ti contatteremo presto.`, 'success');
    setFormData({ nome: '', email: '', messaggio: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Contattaci
        </h1>
        <p className="text-center text-gray-600 text-lg mb-12">
          Siamo qui per rispondere a tutte le tue domande
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Colonna sinistra: Info */}
          <div className="space-y-8">
            {/* Indirizzo */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Indirizzo</h3>
              <p className="text-gray-600 mb-2">{studio.indirizzo}</p>
              <p className="text-gray-600 mb-4">
                {studio.cap} {studio.citta} ({studio.provincia})
              </p>
              <a
                href={`https://maps.google.com/?q=${studio.indirizzo}+${studio.citta}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition"
              >
                Apri Mappa
              </a>
            </div>

            {/* Telefono */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Telefono</h3>
              <p className="text-gray-600 mb-4 text-lg font-semibold">{studio.telefono}</p>
              <a
                href={`tel:${studio.telefono.replace(/\s/g, '')}`}
                className="inline-block w-full text-center bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition"
              >
                Chiama
              </a>
            </div>

            {/* Email */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Email</h3>
              <p className="text-gray-600 mb-4 text-lg font-semibold">{studio.email}</p>
              <a
                href={`mailto:${studio.email}`}
                className="inline-block w-full text-center bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 transition"
              >
                Invia Email
              </a>
            </div>

            {/* Orari */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Orari</h3>
              <div className="space-y-2 text-gray-600">
                <p>Lunedì - Venerdì: <strong>09:00 - 19:00</strong></p>
                <p>Sabato: <strong>10:00 - 13:00</strong></p>
                <p>Domenica: <strong>Chiuso</strong></p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Contattaci su WhatsApp per una risposta veloce</p>
              <a
                href={`https://wa.me/${studio.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition"
              >
                Scrivi su WhatsApp
              </a>
            </div>

          </div>

          {/* Colonna destra: CTA */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Preferisci Prenotare?</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Usa i metodi di contatto a sinistra per raggiungerci direttamente, oppure prenota una visita online!
              </p>

              <Link
                to="/prenotazioni"
                className="block w-full bg-green-500 text-white font-bold py-4 px-4 rounded-lg hover:bg-green-600 transition text-lg text-center mb-4"
              >
                📅 Prenota Ora
              </Link>

              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3">Contattaci Direttamente:</h4>
                <ul className="space-y-3 text-sm text-blue-800">
                  <li>☎️ <strong>Telefono:</strong> Chiama il numero a sinistra</li>
                  <li>📧 <strong>Email:</strong> Invia un'email direttamente</li>
                  <li>💬 <strong>WhatsApp:</strong> Scrivici per una risposta veloce</li>
                </ul>
              </div>
            </div>

            {/* Mappa Google Maps */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dove Siamo</h3>
              <GoogleMap indirizzo={studio.indirizzo} citta={studio.citta} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contatti;

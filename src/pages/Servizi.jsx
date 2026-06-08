import React from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

export const Servizi = () => {
  const { servizi } = useStudio();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">I Nostri Servizi</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-6"></div>
          <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
            Scopri tutti i servizi che offriamo con prezzi trasparenti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servizi.map((servizio, idx) => (
            <div
              key={servizio.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {servizio.nome}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {servizio.descrizione}
                </p>

                {/* Prezzo e durata */}
                <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Prezzo</p>
                    <p className="text-3xl font-bold text-blue-700">€{servizio.prezzo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Durata</p>
                    <p className="text-3xl font-bold text-cyan-600">{servizio.durata}'</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info contatti */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Hai Domande sui Nostri Servizi?</h2>
          <p className="text-gray-600 mb-6">Contattaci per più informazioni o per prenotare la tua visita</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="tel:+39021234567"
              className="bg-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
            >
              Chiama
            </a>
            <Link
              to="/contatti"
              className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition"
            >
              Contatti
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servizi;

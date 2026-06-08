import React from 'react';
import { useStudio } from '../context/StudioContext';

export const ChiSiamo = () => {
  const { studio } = useStudio();

  const team = [
    { nome: studio.dottore, ruolo: 'Dentista', emoji: '👨‍⚕️' },
    { nome: 'Anna Rossi', ruolo: 'Igienista Dentale', emoji: '👩‍⚕️' },
    { nome: 'Marco Bianchi', ruolo: 'Assistente Dentale', emoji: '👨‍💼' },
  ];

  const values = [
    { title: 'Professionalità', emoji: '⭐', desc: 'Servizi di altissima qualità' },
    { title: 'Ascolto', emoji: '👂', desc: 'Partiamo dalle tue esigenze' },
    { title: 'Innovazione', emoji: '🔬', desc: 'Tecnologie all\'avanguardia' },
    { title: 'Serenità', emoji: '😊', desc: 'Ambiente accogliente' },
  ];

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Intestazione */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900">
          Chi Siamo
        </h1>
        <p className="text-center text-gray-600 text-base mb-8">
          Scopri il team dietro il tuo sorriso
        </p>

        {/* Sezione principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-center">
          <div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 h-96 rounded-lg flex items-center justify-center">
              <div className="text-9xl">🏥</div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Studio Dentistico {studio.nome}
            </h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              Da oltre 20 anni siamo al servizio della comunità locale, offrendo servizi dentistici
              di eccellenza. La nostra missione è garantire a ogni paziente un sorriso sano e
              bellissimo.
            </p>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Utilizziamo tecnologie innovative e seguiamo i più alti standard di igiene e sicurezza.
              Il benessere e la soddisfazione dei nostri pazienti è la nostra priorità.
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="text-2xl">✓</span>
                <span><strong>Tecnologie moderne</strong> per diagnosi precise</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="text-2xl">✓</span>
                <span><strong>Team esperto</strong> altamente specializzato</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="text-2xl">✓</span>
                <span><strong>Ambiente sereno</strong> e accogliente</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Team */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Il Nostro Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white p-5 rounded-lg text-center border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">{member.nome.charAt(0)}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.nome}</h3>
                <p className="text-gray-600 font-semibold">{member.ruolo}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specializzazioni */}
        <section className="mb-10 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
            Specializzazioni
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            {studio.specializzazioni}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="font-bold text-blue-600">A</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Implantologia</h3>
                <p className="text-gray-600">Impianti dentali fissi e sicuri</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="font-bold text-blue-600">B</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Estetica Dentale</h3>
                <p className="text-gray-600">Sbiancamenti e sorrisi più belli</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="font-bold text-blue-600">C</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Ortodonzia</h3>
                <p className="text-gray-600">Allineamento perfetto dei denti</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="font-bold text-blue-600">D</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Prevenzione</h3>
                <p className="text-gray-600">Igiene e controlli regolari</p>
              </div>
            </div>
          </div>
        </section>

        {/* Valori */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            I Nostri Valori
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg text-center border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">{String.fromCharCode(65 + idx)}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-blue-700 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">Vuoi Conoscerci Meglio?</h2>
          <p className="text-base mb-5">Contattaci per fissare una visita di consulenza gratuita</p>
          <a
            href="tel:+39021234567"
            className="inline-block bg-white text-blue-700 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition text-lg"
          >
            Chiama Ora
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChiSiamo;

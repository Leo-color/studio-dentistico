import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import Hero from '../components/Hero';
import GoogleMap from '../components/GoogleMap';

export const Home = () => {
  const { servizi, studio } = useStudio();

  // Scroll to top quando la pagina si carica
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const testimonials = [
    { nome: 'Marco Rossi', text: 'Ottimo servizio, gentilissimi!', rating: 5 },
    { nome: 'Anna Bianchi', text: 'Studio pulito e moderno', rating: 5 },
    { nome: 'Luca Verdi', text: 'Prenota online è comodissimo', rating: 5 },
  ];

  return (
    <div>
      {/* Hero */}
      <section id="home">
        <Hero />
      </section>

      {/* Divider */}
      <div className="bg-gradient-to-r from-transparent via-blue-600 to-transparent" style={{ height: '2px' }}></div>

      {/* Perché sceglierci */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Perché Sceglierci
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border-2 border-blue-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:border-blue-400">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-5">
                <span className="text-white text-2xl font-bold">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Esperienza</h3>
              <p className="text-gray-600 leading-relaxed">
                {studio.dottore} con specializzazioni in {studio.specializzazioni}. La competenza al servizio della vostra salute.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-white p-8 rounded-2xl shadow-lg border-2 border-cyan-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:border-cyan-400">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center mb-5">
                <span className="text-white text-2xl font-bold">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Prenota Online</h3>
              <p className="text-gray-600 leading-relaxed">
                Semplice, rapido e intuitivo. Prenota quando vuoi, 24 ore su 24, da qualsiasi dispositivo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg border-2 border-green-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:border-green-400">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mb-5">
                <span className="text-white text-2xl font-bold">♥</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Accoglienza</h3>
              <p className="text-gray-600 leading-relaxed">
                Un ambiente sereno e un team attento. Perché la vostra tranquillità è la nostra priorità.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-gradient-to-r from-transparent via-blue-600 to-transparent" style={{ height: '2px' }}></div>

      {/* Servizi */}
      <section id="servizi" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">I Nostri Servizi</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-6"></div>
            <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
              Scopri tutti i servizi che offriamo con prezzi trasparenti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servizi.map((servizio) => (
              <div
                key={servizio.id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {servizio.nome}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {servizio.descrizione}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Prezzo</span>
                      <span className="text-2xl font-bold text-blue-600">€{servizio.prezzo}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Durata</span>
                      <span className="text-lg font-semibold text-cyan-500">{servizio.durata}'</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-gradient-to-r from-transparent via-blue-600 to-transparent" style={{ height: '2px' }}></div>

      {/* Testimonial */}
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Cosa Dicono i Nostri Pazienti
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-amber-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-amber-400 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full opacity-50 -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-base leading-relaxed">"{testimonial.text}"</p>
                  <p className="font-bold text-gray-900">{testimonial.nome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-gradient-to-r from-transparent via-blue-600 to-transparent" style={{ height: '2px' }}></div>

      {/* Chi Siamo */}
      <section id="chi-siamo" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-4 text-gray-900">Chi Siamo</h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Scopri il team dietro il tuo sorriso
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 h-96 rounded-2xl flex items-center justify-center">
              <div className="text-9xl">🏥</div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">
                Studio Dentistico {studio.nome}
              </h3>
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


          {/* Specializzazioni */}
          <div className="mb-16 bg-gradient-to-br from-purple-50 to-white p-10 rounded-3xl shadow-lg border-2 border-purple-200">
            <h3 className="text-4xl font-bold text-center mb-2 text-gray-900">
              Specializzazioni
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 text-center mb-10 font-medium">
              {studio.specializzazioni}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border-l-4 border-purple-500 hover:shadow-lg transition">
                <h4 className="font-bold text-gray-900 text-lg text-purple-700">Implantologia</h4>
                <p className="text-gray-600 mt-2">Impianti dentali fissi e sicuri</p>
              </div>
              <div className="bg-white p-6 rounded-xl border-l-4 border-pink-500 hover:shadow-lg transition">
                <h4 className="font-bold text-gray-900 text-lg text-pink-700">Estetica Dentale</h4>
                <p className="text-gray-600 mt-2">Sbiancamenti e sorrisi più belli</p>
              </div>
              <div className="bg-white p-6 rounded-xl border-l-4 border-cyan-500 hover:shadow-lg transition">
                <h4 className="font-bold text-gray-900 text-lg text-cyan-700">Ortodonzia</h4>
                <p className="text-gray-600 mt-2">Allineamento perfetto dei denti</p>
              </div>
              <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 hover:shadow-lg transition">
                <h4 className="font-bold text-gray-900 text-lg text-green-700">Prevenzione</h4>
                <p className="text-gray-600 mt-2">Igiene e controlli regolari</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-gradient-to-r from-transparent via-blue-600 to-transparent" style={{ height: '2px' }}></div>

      {/* Contatti */}
      <section id="contatti" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-4 text-gray-900">Contattaci</h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Siamo qui per rispondere a tutte le tue domande
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Colonna sinistra: Info */}
            <div className="space-y-8">
              {/* Indirizzo - Mappa */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Indirizzo</h3>
                <p className="text-gray-600 mb-6 text-base font-semibold leading-relaxed">
                  {studio.indirizzo}<br />
                  {studio.cap} {studio.citta} ({studio.provincia})
                </p>
                <GoogleMap indirizzo={studio.indirizzo} citta={studio.citta} />
              </div>

              {/* Telefono */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Telefono</h3>
                <p className="text-gray-600 mb-6 text-lg font-semibold">{studio.telefono}</p>
                <a
                  href={`tel:${studio.telefono.replace(/\s/g, '')}`}
                  className="inline-block w-full text-center bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all"
                >
                  Chiama
                </a>
              </div>


              {/* Orari */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Orari</h3>
                <div className="space-y-3 text-gray-600">
                  <p>Lunedì - Venerdì: <strong>09:00 - 19:00</strong></p>
                  <p>Sabato: <strong>10:00 - 13:00</strong></p>
                  <p>Domenica: <strong>Chiuso</strong></p>
                </div>
              </div>

            </div>

            {/* Colonna destra: CTA + Contatti diretti */}
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vuoi Prenotare?</h3>
                <p className="text-gray-600 mb-6">
                  Prenota una visita online in pochi secondi, oppure contattaci direttamente.
                </p>
                <Link
                  to="/prenotazioni"
                  className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-4 rounded-xl hover:shadow-lg transition-all text-lg text-center mb-6"
                >
                  📅 Prenota Ora
                </Link>

                <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-3">Contattaci Direttamente:</h4>
                  <div className="space-y-3 text-sm">
                    <a
                      href={`tel:${studio.telefono?.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-blue-800 hover:underline"
                    >
                      ☎️ <strong>Telefono:</strong> {studio.telefono}
                    </a>
                    <a
                      href={`mailto:${studio.email}`}
                      className="flex items-center gap-2 text-blue-800 hover:underline"
                    >
                      📧 <strong>Email:</strong> {studio.email}
                    </a>
                    <a
                      href={`https://wa.me/${studio.whatsapp?.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-800 hover:underline"
                    >
                      💬 <strong>WhatsApp:</strong> Scrivici subito
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Pronto per il tuo appuntamento?</h2>
          <p className="text-lg text-blue-100 mb-8">Prenota adesso e ricevi subito la conferma online</p>
          <Link
            to="/prenotazioni"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition"
          >
            Prenota Ora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

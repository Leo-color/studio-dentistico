import React from 'react';
import { useStudio } from '../context/StudioContext';
import PrivacyModal from './PrivacyModal';

export const Footer = () => {
  const { studio, privacyModalOpen, setPrivacyModalOpen } = useStudio();

  return (
    <>
      <PrivacyModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-10 md:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600 opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14 px-8">
          {/* Info Studio */}
          <div>
            <h3 className="text-2xl font-black mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{studio.nome}</h3>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm leading-relaxed">
                <span className="block font-semibold text-white mb-2">Ubicazione</span>
                {studio.indirizzo}
              </p>
              <p className="text-gray-300 text-sm">
                {studio.cap} {studio.citta} ({studio.provincia})
              </p>
            </div>
          </div>

          {/* Orari */}
          <div>
            <h3 className="text-2xl font-black mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Orari di Apertura</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p><span className="font-semibold text-white">Lunedì - Venerdì:</span> 09:00 - 19:00</p>
              <p><span className="font-semibold text-white">Sabato:</span> 10:00 - 13:00</p>
              <p><span className="font-semibold text-white">Domenica:</span> Chiuso</p>
            </div>
          </div>

          {/* Contatti */}
          <div>
            <h3 className="text-2xl font-black mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Contatti</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-300 text-sm">
                  <span className="block font-semibold text-white mb-2">Telefono</span>
                  <a href={`tel:${studio.telefono.replace(/\s/g, '')}`} className="hover:text-blue-400 transition">
                    {studio.telefono}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">
                  <span className="block font-semibold text-white mb-2">Email</span>
                  <a href={`mailto:${studio.email}`} className="hover:text-blue-400 transition break-all">
                    {studio.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent mb-6"></div>

        {/* Links Legali */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <button
            onClick={() => setPrivacyModalOpen(true)}
            className="text-gray-400 hover:text-blue-400 transition text-sm font-medium cursor-pointer"
          >
            Privacy Policy
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} <span className="font-semibold text-gray-500">{studio.nome}</span>. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;

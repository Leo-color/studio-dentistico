import React from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

export const Hero = () => {
  const { studio } = useStudio();

  return (
    <div className="w-full bg-gradient-to-b from-white via-blue-50 to-white pt-12 pb-12 md:pt-20 md:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        {/* Subtitle */}
        <p className="text-blue-600 font-semibold text-sm md:text-base mb-3 uppercase tracking-widest letter-spacing-1">
          Sistema Prenotazioni Dentali Professionali
        </p>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 leading-tight md:leading-tight" style={{letterSpacing: '-0.02em'}}>
          {studio.nome}
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
          Prenota la tua visita dentale online in <span className="font-semibold text-blue-700">pochi secondi</span>. Tecnologia moderna, attenzione personale.
        </p>

        {/* Main CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 flex-wrap">
          <Link
            to="/prenotazioni"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-10 rounded-xl text-lg hover:shadow-xl transition-all transform hover:scale-105 shadow-lg"
          >
            Prenota Subito
          </Link>

          <a
            href={`tel:${studio.telefono.replace(/\s/g, '')}`}
            className="border-2 border-blue-600 text-blue-600 font-bold py-4 px-10 rounded-xl text-lg hover:bg-blue-50 transition-all"
          >
            Chiama Studio
          </a>
        </div>

      </div>
    </div>
  );
};

export default Hero;

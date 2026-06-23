import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { darkMode } = useStudio();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // 5 click → vai a admin
    if (newCount === 5) {
      navigate('/admin');
      setClickCount(0);
      return;
    }

    // Reset dopo 1500ms (1.5 secondi)
    setTimeout(() => {
      setClickCount(0);
    }, 1500);
  };

  const scrollToSection = (sectionId) => {
    // Se non sei sulla home, torna alla home prima
    if (location.pathname !== '/') {
      navigate('/');
      // Scroll dopo un piccolo delay per permettere al DOM di aggiornare
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setMenuOpen(false);
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
      }
    }
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-900/95 text-white' : 'bg-white/95'} backdrop-blur-md border-b ${darkMode ? 'border-gray-800' : 'border-gray-200/30'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={handleLogoClick}
            className="flex-shrink-0 cursor-pointer"
          >
            <div className="text-2xl font-bold text-blue-700 hover:opacity-80 transition select-none">Clinica Veterinaria</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" onClick={scrollToHome} className={`transition cursor-pointer ${location.pathname === '/' ? 'font-bold' : ''} hover:text-blue-700`}>Home</Link>
            <button onClick={() => scrollToSection('servizi')} className="hover:text-blue-700 transition cursor-pointer">Servizi</button>
            <button onClick={() => scrollToSection('chi-siamo')} className="hover:text-blue-700 transition cursor-pointer">Chi Siamo</button>
            <button onClick={() => scrollToSection('contatti')} className="hover:text-blue-700 transition cursor-pointer">Contatti</button>
            <Link to="/mie-prenotazioni" className="hover:text-blue-700 transition cursor-pointer text-sm">Accedi Prenotazioni</Link>
            <Link
              to="/prenotazioni"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-7 py-2.5 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 font-bold transition-all transform hover:scale-105 shadow-md"
            >
              Prenota
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm font-semibold"
              aria-label="Toggle menu"
            >
              {menuOpen ? 'Chiudi' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden pb-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <Link to="/" className={`block w-full text-left py-2 transition cursor-pointer ${location.pathname === '/' ? 'font-bold' : ''} hover:text-blue-700`} onClick={scrollToHome}>Home</Link>
            <button onClick={() => scrollToSection('servizi')} className="block w-full text-left py-2 hover:text-blue-700 transition cursor-pointer">Servizi</button>
            <button onClick={() => scrollToSection('chi-siamo')} className="block w-full text-left py-2 hover:text-blue-700 transition cursor-pointer">Chi Siamo</button>
            <button onClick={() => scrollToSection('contatti')} className="block w-full text-left py-2 hover:text-blue-700 transition cursor-pointer">Contatti</button>
            <Link
              to="/mie-prenotazioni"
              className="block w-full text-left py-2 hover:text-blue-700 transition cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Accedi Prenotazioni
            </Link>
            <Link
              to="/prenotazioni"
              className="block mt-4 bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-center hover:bg-blue-800 transition"
              onClick={() => setMenuOpen(false)}
            >
              Prenota Subito
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

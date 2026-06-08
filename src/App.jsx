import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudioProvider } from './context/StudioContext';
import ToastContainer from './components/Toast';
import PrivateRoute from './admin/PrivateRoute';

// Componenti pubblici
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pagine pubbliche
import Home from './pages/Home';
import Prenotazioni from './pages/Prenotazioni';
import PrenotazioneConfermata from './pages/PrenotazioneConfermata';
import AnnullaPrenotazione from './pages/AnnullaPrenotazione';
import MiePrenotazioni from './pages/MiePrenotazioni';

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminLoginCode from './admin/AdminLoginCode';
import AdminDashboard from './admin/AdminDashboard';
import AdminOrari from './admin/AdminOrari';
import AdminPrenotazioni from './admin/AdminPrenotazioni';
import AdminInfoStudio from './admin/AdminInfoStudio';
import AdminServizi from './admin/AdminServizi';
import AdminImpostazioni from './admin/AdminImpostazioni';

function App() {
  return (
    <StudioProvider>
      <BrowserRouter>
        <ToastContainer />

        {/* Routes */}
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login-code" element={<AdminLoginCode />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/orari"
            element={
              <PrivateRoute>
                <AdminOrari />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/prenotazioni"
            element={
              <PrivateRoute>
                <AdminPrenotazioni />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/info-studio"
            element={
              <PrivateRoute>
                <AdminInfoStudio />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/servizi"
            element={
              <PrivateRoute>
                <AdminServizi />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/impostazioni"
            element={
              <PrivateRoute>
                <AdminImpostazioni />
              </PrivateRoute>
            }
          />

          {/* Public Routes with Layout */}
          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/prenotazioni" element={<Prenotazioni />} />
                    <Route path="/prenotazione-confermata/:id" element={<PrenotazioneConfermata />} />
                    <Route path="/mie-prenotazioni" element={<MiePrenotazioni />} />
                    <Route path="/annulla-prenotazione" element={<AnnullaPrenotazione />} />
                    {/* Redirect vecchie rotte alla home */}
                    <Route path="/servizi" element={<Navigate to="/" />} />
                    <Route path="/chi-siamo" element={<Navigate to="/" />} />
                    <Route path="/contatti" element={<Navigate to="/" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </StudioProvider>
  );
}

export default App;

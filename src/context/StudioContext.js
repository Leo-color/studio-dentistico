import React, { createContext, useState, useEffect } from 'react';
import { sendConfirmationEmail, sendAdminNotificationEmail } from '../services/emailService';
import { scheduleReminderSMS } from '../services/smsService';
import { addToGoogleCalendar } from '../services/calendarService';
import { savePrenotazioneToFirebase, updatePrenotazioneInFirebase, deletePrenotazioneFromFirebase, subscribeToPrenotazioni, subscribeToStudio, subscribeToOrari, subscribeToServizi, subscribeToFerie, saveStudioToFirebase, saveOrariToFirebase, saveServiziToFirebase } from '../services/firebaseService';

export const StudioContext = createContext();

const defaultStudio = {
  nome: 'Studio Dentistico Dr. Rossi',
  indirizzo: 'Via Roma 123',
  cap: '20100',
  citta: 'Milano',
  provincia: 'MI',
  telefono: '02 1234567',
  email: 'info@studiodentistico.it',
  whatsapp: '+39 333 1234567',
  dottore: 'Dr. Marco Rossi',
  specializzazioni: 'Implantologia, Protesi, Estetica',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
};

const defaultOrari = {
  lunedi: { aperto: true, apertura: '09:00', chiusura: '19:00', pausaDa: '13:00', pausaA: '14:30' },
  martedi: { aperto: true, apertura: '09:00', chiusura: '19:00', pausaDa: '13:00', pausaA: '14:30' },
  mercoledi: { aperto: true, apertura: '09:00', chiusura: '19:00', pausaDa: '13:00', pausaA: '14:30' },
  giovedi: { aperto: true, apertura: '09:00', chiusura: '19:00', pausaDa: '13:00', pausaA: '14:30' },
  venerdi: { aperto: true, apertura: '09:00', chiusura: '19:00', pausaDa: '13:00', pausaA: '14:30' },
  sabato: { aperto: true, apertura: '10:00', chiusura: '13:00', pausaDa: null, pausaA: null },
  domenica: { aperto: false, apertura: null, chiusura: null, pausaDa: null, pausaA: null },
};

const defaultServizi = [
  { id: 1, nome: 'Visita Dentale', prezzo: 30, durata: 20, descrizione: 'Visita completa e consulenza' },
  { id: 2, nome: 'Pulizia Dentale', prezzo: 50, durata: 30, descrizione: 'Igiene e pulizia professionale' },
  { id: 3, nome: 'Otturazione', prezzo: 100, durata: 45, descrizione: 'Riempimento cavità dentale' },
  { id: 4, nome: 'Sbiancamento', prezzo: 200, durata: 60, descrizione: 'Sbiancamento dentale professionale' },
  { id: 5, nome: 'Endodonzia', prezzo: 300, durata: 90, descrizione: 'Devitalizzazione e trattamento canalare' },
  { id: 6, nome: 'Implantologia', prezzo: 2000, durata: 120, descrizione: 'Consulenza impianti dentali' },
  { id: 7, nome: 'Ortodonzia', prezzo: 2000, durata: 120, descrizione: 'Consulenza ortodontica' },
  { id: 8, nome: 'Igiene Dentale', prezzo: 60, durata: 30, descrizione: 'Seduta di igiene avanzata' },
];

const defaultFerie = [];

export const StudioProvider = ({ children }) => {
  const [studio, setStudio] = useState(defaultStudio);
  const [orari, setOrari] = useState(defaultOrari);
  const [servizi, setServizi] = useState(defaultServizi);
  const [ferie, setFerie] = useState(defaultFerie);
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [adminLogged, setAdminLogged] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Load da localStorage
  useEffect(() => {
    const savedStudio = localStorage.getItem('studio');
    const savedOrari = localStorage.getItem('orari');
    const savedServizi = localStorage.getItem('servizi');
    const savedFerie = localStorage.getItem('ferie');
    const savedPrenotazioni = localStorage.getItem('prenotazioni');
    const savedDarkMode = localStorage.getItem('darkMode');
    const adminToken = localStorage.getItem('adminToken');

    if (savedStudio) setStudio(JSON.parse(savedStudio));
    if (savedOrari) setOrari(JSON.parse(savedOrari));
    if (savedServizi) setServizi(JSON.parse(savedServizi));
    if (savedFerie) setFerie(JSON.parse(savedFerie));
    if (savedPrenotazioni) setPrenotazioni(JSON.parse(savedPrenotazioni));
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    if (adminToken) setAdminLogged(true);

    // Sincronizza prenotazioni da Firebase
    const unsubscribePrenotazioni = subscribeToPrenotazioni((firebasePrenotazioni) => {
      if (firebasePrenotazioni.length > 0) {
        setPrenotazioni(firebasePrenotazioni);
      }
    });

    // Sincronizza Studio da Firebase
    const unsubscribeStudio = subscribeToStudio((firebaseStudio) => {
      setStudio(firebaseStudio);
    });

    // Sincronizza Orari da Firebase
    const unsubscribeOrari = subscribeToOrari((firebaseOrari) => {
      setOrari(firebaseOrari);
    });

    // Sincronizza Servizi da Firebase
    const unsubscribeServizi = subscribeToServizi((firebaseServizi) => {
      if (firebaseServizi.length > 0) {
        setServizi(firebaseServizi);
      }
    });

    // Sincronizza Ferie da Firebase
    const unsubscribeFerie = subscribeToFerie((firebaseFerie) => {
      if (firebaseFerie.length > 0) {
        setFerie(firebaseFerie);
      }
    });

    return () => {
      unsubscribePrenotazioni();
      unsubscribeStudio();
      unsubscribeOrari();
      unsubscribeServizi();
      unsubscribeFerie();
    };
  }, []);

  // Save a localStorage
  useEffect(() => {
    localStorage.setItem('studio', JSON.stringify(studio));
  }, [studio]);

  useEffect(() => {
    localStorage.setItem('orari', JSON.stringify(orari));
  }, [orari]);

  useEffect(() => {
    localStorage.setItem('servizi', JSON.stringify(servizi));
  }, [servizi]);

  useEffect(() => {
    localStorage.setItem('ferie', JSON.stringify(ferie));
  }, [ferie]);

  useEffect(() => {
    localStorage.setItem('prenotazioni', JSON.stringify(prenotazioni));
  }, [prenotazioni]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const addPrenotazione = async (prenotazione) => {
    const id = `PRE-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`;
    const newPrenotazione = {
      ...prenotazione,
      id,
      status: 'confermata',
      createdAt: new Date().toISOString(),
      reminderSent: false,
    };
    setPrenotazioni(prev => [...prev, newPrenotazione]);

    // Salva su Firebase
    try {
      await savePrenotazioneToFirebase(newPrenotazione);
    } catch (error) {
      console.warn('Errore salvataggio Firebase:', error);
    }

    // Invia email di conferma al paziente
    if (process.env.REACT_APP_SENDGRID_API_KEY) {
      try {
        await sendConfirmationEmail(newPrenotazione, studio);
        addToast('Email di conferma inviata!', 'success');
      } catch (error) {
        console.warn('Email non inviata:', error);
        addToast('Prenotazione confermata (email non disponibile)', 'info');
      }

      // Invia notifica all'admin
      try {
        await sendAdminNotificationEmail(newPrenotazione, studio);
      } catch (error) {
        console.warn('Notifica admin non inviata:', error);
      }
    } else {
      addToast('Prenotazione creata (email non configurata)', 'info');
    }

    // Programma SMS reminder 24h prima
    try {
      scheduleReminderSMS({ ...newPrenotazione, studioNome: studio.nome });
    } catch (error) {
      console.warn('SMS reminder non programmato:', error);
    }

    // Aggiungi a Google Calendar
    try {
      if (process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY) {
        await addToGoogleCalendar(newPrenotazione, studio);
      }
    } catch (error) {
      console.warn('Google Calendar non sincronizzato:', error);
    }

    return id;
  };

  const updatePrenotazione = (id, updates) => {
    setPrenotazioni(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );

    // Aggiorna su Firebase
    const prenotazione = prenotazioni.find(p => p.id === id);
    if (prenotazione?.firebaseId) {
      updatePrenotazioneInFirebase(prenotazione.firebaseId, updates);
    }

    addToast('Prenotazione aggiornata', 'success');
  };

  const deletePrenotazione = (id) => {
    const prenotazione = prenotazioni.find(p => p.id === id);

    setPrenotazioni(prev => prev.filter(p => p.id !== id));

    // Elimina da Firebase
    if (prenotazione?.firebaseId) {
      deletePrenotazioneFromFirebase(prenotazione.firebaseId);
    }

    addToast('Prenotazione eliminata', 'success');
  };

  const updateStudio = async (updates) => {
    const newStudio = { ...studio, ...updates };
    setStudio(newStudio);

    // Salva su Firebase
    try {
      await saveStudioToFirebase(newStudio);
    } catch (error) {
      console.warn('Errore salvataggio studio su Firebase:', error);
    }

    addToast('Dati studio aggiornati', 'success');
  };

  const updateOrari = async (updates) => {
    const newOrari = { ...orari, ...updates };
    setOrari(newOrari);

    // Salva su Firebase
    try {
      await saveOrariToFirebase(newOrari);
    } catch (error) {
      console.warn('Errore salvataggio orari su Firebase:', error);
    }

    addToast('Orari aggiornati', 'success');
  };

  const addFerie = (feria) => {
    setFerie(prev => [...prev, { ...feria, id: Date.now() }]);
    addToast('Ferie aggiunte', 'success');
  };

  const removeFerie = (id) => {
    setFerie(prev => prev.filter(f => f.id !== id));
    addToast('Ferie rimosse', 'success');
  };

  const addServizio = async (servizio) => {
    const newServizio = {
      ...servizio,
      id: Math.max(...servizi.map(s => s.id), 0) + 1,
    };
    const updatedServizi = [...servizi, newServizio];
    setServizi(updatedServizi);

    // Salva su Firebase
    try {
      await saveServiziToFirebase(updatedServizi);
    } catch (error) {
      console.warn('Errore salvataggio servizi su Firebase:', error);
    }

    addToast('Servizio aggiunto', 'success');
    return newServizio;
  };

  const updateServizio = async (id, updates) => {
    const updatedServizi = servizi.map(s => (s.id === id ? { ...s, ...updates } : s));
    setServizi(updatedServizi);

    // Salva su Firebase
    try {
      await saveServiziToFirebase(updatedServizi);
    } catch (error) {
      console.warn('Errore salvataggio servizi su Firebase:', error);
    }

    addToast('Servizio aggiornato', 'success');
  };

  const deleteServizio = async (id) => {
    const updatedServizi = servizi.filter(s => s.id !== id);
    setServizi(updatedServizi);

    // Salva su Firebase
    try {
      await saveServiziToFirebase(updatedServizi);
    } catch (error) {
      console.warn('Errore salvataggio servizi su Firebase:', error);
    }

    addToast('Servizio eliminato', 'success');
  };

  const value = {
    studio,
    orari,
    servizi,
    ferie,
    prenotazioni,
    adminLogged,
    darkMode,
    toasts,
    privacyModalOpen,
    setAdminLogged,
    setDarkMode,
    setStudio,
    setPrivacyModalOpen,
    addPrenotazione,
    updatePrenotazione,
    deletePrenotazione,
    updateStudio,
    updateOrari,
    addFerie,
    removeFerie,
    addServizio,
    updateServizio,
    deleteServizio,
    addToast,
  };

  return (
    <StudioContext.Provider value={value}>
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = React.useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio deve essere usato dentro StudioProvider');
  }
  return context;
};

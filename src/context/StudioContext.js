import React, { createContext, useState, useEffect } from 'react';
import { savePrenotazioneToFirebase, updatePrenotazioneInFirebase, deletePrenotazioneFromFirebase, subscribeToPrenotazioni, subscribeToStudio, subscribeToOrari, subscribeToServizi, subscribeToFerie, saveStudioToFirebase, saveOrariToFirebase, saveServiziToFirebase, saveFerieToFirebase, subscribeToAdminSession } from '../services/firebaseService';

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
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Track last saved data to prevent infinite loops

  // Firebase è l'UNICA fonte di verità per tutti i dati principali
  // localStorage viene usato SOLO per impostazioni UI (darkMode) e token admin
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const adminToken = localStorage.getItem('adminToken');

    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    if (adminToken) setAdminLogged(true);

    // Sincronizza prenotazioni da Firebase
    const unsubscribePrenotazioni = subscribeToPrenotazioni((firebasePrenotazioni) => {
      setPrenotazioni(firebasePrenotazioni);
    });

    // Sincronizza Studio da Firebase
    const unsubscribeStudio = subscribeToStudio((firebaseStudio) => {
      console.log('Listener Studio ricevuto:', firebaseStudio);
      setStudio(firebaseStudio);
    });

    // Sincronizza Orari da Firebase
    const unsubscribeOrari = subscribeToOrari((firebaseOrari) => {
      console.log('Listener Orari ricevuto:', firebaseOrari);
      setOrari(firebaseOrari);
    });

    // Sincronizza Servizi da Firebase
    const unsubscribeServizi = subscribeToServizi((firebaseServizi) => {
      console.log('Listener Servizi ricevuto:', firebaseServizi);
      setServizi(firebaseServizi);
    });

    // Sincronizza Ferie da Firebase
    const unsubscribeFerie = subscribeToFerie((firebaseFerie) => {
      console.log('Listener Ferie ricevuto:', firebaseFerie);
      setFerie(firebaseFerie);
    });

    // Sincronizza sessione admin da Firebase
    const unsubscribeAdminSession = subscribeToAdminSession((sessionData) => {
      console.log('Sessione admin ricevuta:', sessionData);
      if (sessionData) {
        setAdminLogged(true);
      }
    });

    // Caricamento completato
    setIsLoading(false);

    return () => {
      unsubscribePrenotazioni();
      unsubscribeStudio();
      unsubscribeOrari();
      unsubscribeServizi();
      unsubscribeFerie();
      unsubscribeAdminSession();
    };
  }, []);

  // Save solo darkMode a localStorage (impostazione UI, non dato principale)
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // NOTA: le scritture su Firebase avvengono SOLO nelle funzioni update esplicite
  // (updateStudio, updateOrari, addServizio, addFerie, ecc.). Non usiamo più
  // useEffect automatici che facevano eco ai listener causando race condition.

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

    addToast('Prenotazione confermata!', 'success');

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
    const newFerie = [...ferie, { ...feria, id: Date.now() }];
    setFerie(newFerie);
    // Salva su Firebase
    try {
      saveFerieToFirebase(newFerie).catch(err => console.error('Errore salvataggio ferie:', err));
    } catch (error) {
      console.error('Errore salvataggio ferie:', error);
    }
    addToast('Ferie aggiunte', 'success');
  };

  const removeFerie = (id) => {
    const newFerie = ferie.filter(f => f.id !== id);
    setFerie(newFerie);
    // Salva su Firebase
    try {
      saveFerieToFirebase(newFerie).catch(err => console.error('Errore salvataggio ferie:', err));
    } catch (error) {
      console.error('Errore salvataggio ferie:', error);
    }
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
    isLoading,
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

// Firebase Service - Sincronizzazione Prenotazioni
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configurazione Firebase (da environment variables)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

let db = null;
let auth = null;
let isInitialized = false;

// Inizializza Firebase
const initFirebase = () => {
  if (!isInitialized && firebaseConfig.projectId) {
    try {
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
      auth = getAuth(app);
      isInitialized = true;
      console.log('Firebase inizializzato');
      return true;
    } catch (error) {
      console.error('Errore inizializzazione Firebase:', error);
      return false;
    }
  }
  return isInitialized;
};

// Salva prenotazione su Firebase
export const savePrenotazioneToFirebase = async (prenotazione) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato, salvo solo in localStorage');
    return prenotazione.id;
  }

  try {
    const docRef = await addDoc(collection(db, 'prenotazioni'), {
      ...prenotazione,
      createdAt: new Date().toISOString(),
    });
    console.log('Prenotazione salvata su Firebase:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Errore salvataggio prenotazione:', error);
    return prenotazione.id;
  }
};

// Aggiorna prenotazione su Firebase
export const updatePrenotazioneInFirebase = async (id, updates) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return;
  }

  try {
    const docRef = doc(db, 'prenotazioni', id);
    await updateDoc(docRef, updates);
    console.log('Prenotazione aggiornata su Firebase:', id);
  } catch (error) {
    console.error('Errore aggiornamento prenotazione:', error);
  }
};

// Elimina prenotazione da Firebase
export const deletePrenotazioneFromFirebase = async (id) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return;
  }

  try {
    await deleteDoc(doc(db, 'prenotazioni', id));
    console.log('Prenotazione eliminata da Firebase:', id);
  } catch (error) {
    console.error('Errore eliminazione prenotazione:', error);
  }
};

// Sincronizza prenotazioni in tempo reale
export const subscribeToPrenotazioni = (callback) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato, sincronizzazione non disponibile');
    return () => {};
  }

  try {
    const q = query(collection(db, 'prenotazioni'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prenotazioni = [];
      snapshot.forEach((doc) => {
        prenotazioni.push({
          ...doc.data(),
          firebaseId: doc.id,
        });
      });
      console.log('Prenotazioni sincronizzate da Firebase:', prenotazioni.length);
      callback(prenotazioni);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Errore sincronizzazione prenotazioni:', error);
    return () => {};
  }
};

// Salva dati Studio su Firebase
export const saveStudioToFirebase = async (studio) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return;
  }

  try {
    const docRef = doc(db, 'studio', 'info');
    await updateDoc(docRef);
  } catch (error) {
    // Se non esiste, crealo
    try {
      await addDoc(collection(db, 'studio'), {
        ...studio,
        docId: 'info',
      });
    } catch (addError) {
      console.error('Errore salvataggio studio:', addError);
    }
  }
};

// Salva Orari su Firebase
export const saveOrariToFirebase = async (orari) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return;
  }

  try {
    const docRef = doc(db, 'config', 'orari');
    await updateDoc(docRef, orari);
    console.log('Orari salvati su Firebase');
  } catch (error) {
    // Se non esiste, crealo
    try {
      await addDoc(collection(db, 'config'), {
        ...orari,
        docId: 'orari',
      });
    } catch (addError) {
      console.error('Errore salvataggio orari:', addError);
    }
  }
};

// Salva Servizi su Firebase
export const saveServiziToFirebase = async (servizi) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return;
  }

  try {
    const docRef = doc(db, 'config', 'servizi');
    await updateDoc(docRef, { lista: servizi, updatedAt: new Date().toISOString() });
    console.log('Servizi salvati su Firebase');
  } catch (error) {
    // Se non esiste, crealo
    try {
      await addDoc(collection(db, 'config'), {
        docId: 'servizi',
        lista: servizi,
        updatedAt: new Date().toISOString(),
      });
    } catch (addError) {
      console.error('Errore salvataggio servizi:', addError);
    }
  }
};

// Sincronizza Studio in tempo reale
export const subscribeToStudio = (callback) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return () => {};
  }

  try {
    const unsubscribe = onSnapshot(doc(db, 'studio', 'info'), (docSnapshot) => {
      if (docSnapshot.exists()) {
        console.log('Studio sincronizzato da Firebase');
        callback(docSnapshot.data());
      }
    });

    return unsubscribe;
  } catch (error) {
    console.error('Errore sincronizzazione studio:', error);
    return () => {};
  }
};

// Sincronizza Orari in tempo reale
export const subscribeToOrari = (callback) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return () => {};
  }

  try {
    const unsubscribe = onSnapshot(doc(db, 'config', 'orari'), (docSnapshot) => {
      if (docSnapshot.exists()) {
        console.log('Orari sincronizzati da Firebase');
        callback(docSnapshot.data());
      }
    });

    return unsubscribe;
  } catch (error) {
    console.error('Errore sincronizzazione orari:', error);
    return () => {};
  }
};

// Sincronizza Servizi in tempo reale
export const subscribeToServizi = (callback) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return () => {};
  }

  try {
    const unsubscribe = onSnapshot(doc(db, 'config', 'servizi'), (docSnapshot) => {
      if (docSnapshot.exists()) {
        console.log('Servizi sincronizzati da Firebase');
        callback(docSnapshot.data().lista || []);
      }
    });

    return unsubscribe;
  } catch (error) {
    console.error('Errore sincronizzazione servizi:', error);
    return () => {};
  }
};

// Sincronizza Ferie in tempo reale
export const subscribeToFerie = (callback) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return () => {};
  }

  try {
    const unsubscribe = onSnapshot(doc(db, 'config', 'ferie'), (docSnapshot) => {
      if (docSnapshot.exists()) {
        console.log('Ferie sincronizzate da Firebase');
        callback(docSnapshot.data().lista || []);
      }
    });

    return unsubscribe;
  } catch (error) {
    console.error('Errore sincronizzazione ferie:', error);
    return () => {};
  }
};

export const getFirebaseInstance = () => {
  initFirebase();
  return db;
};

// Inizializza Firebase per ottenere auth
initFirebase();

export { auth };

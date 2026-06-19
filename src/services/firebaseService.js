// Firebase Service - Sincronizzazione Prenotazioni
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, setDoc, getDoc } from 'firebase/firestore';
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
    // Usa l'ID della prenotazione come document ID in Firebase
    const docRef = doc(db, 'prenotazioni', prenotazione.id);
    await setDoc(docRef, {
      ...prenotazione,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    console.log('Prenotazione salvata su Firebase:', prenotazione.id);
    return prenotazione.id;
  } catch (error) {
    console.error('Errore salvataggio prenotazione:', error);
    throw error;
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
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
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
    await updateDoc(docRef, { data: studio, updatedAt: new Date().toISOString() });
    console.log('Studio salvato su Firebase');
  } catch (error) {
    try {
      await setDoc(doc(db, 'studio', 'info'), { data: studio, updatedAt: new Date().toISOString() });
      console.log('Studio creato su Firebase');
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
    await updateDoc(docRef, { data: orari, updatedAt: new Date().toISOString() });
    console.log('Orari salvati su Firebase');
  } catch (error) {
    try {
      await setDoc(doc(db, 'config', 'orari'), { data: orari, updatedAt: new Date().toISOString() });
      console.log('Orari creati su Firebase');
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
    await updateDoc(docRef, { data: servizi, updatedAt: new Date().toISOString() });
    console.log('Servizi salvati su Firebase');
  } catch (error) {
    try {
      await setDoc(doc(db, 'config', 'servizi'), { data: servizi, updatedAt: new Date().toISOString() });
      console.log('Servizi creati su Firebase');
    } catch (addError) {
      console.error('Errore salvataggio servizi:', addError);
    }
  }
};

// Salva Ferie su Firebase
export const saveFerieToFirebase = async (ferie) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return;
  }

  try {
    const docRef = doc(db, 'config', 'ferie');
    await updateDoc(docRef, { data: ferie, updatedAt: new Date().toISOString() });
    console.log('Ferie salvate su Firebase');
  } catch (error) {
    try {
      await setDoc(doc(db, 'config', 'ferie'), { data: ferie, updatedAt: new Date().toISOString() });
      console.log('Ferie create su Firebase');
    } catch (addError) {
      console.error('Errore salvataggio ferie:', addError);
    }
  }
};

// Helper per subscribere con polling fallback
const subscribeWithPolling = (collectionPath, docName, callback, pollIntervalMs = 3000) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return () => {};
  }

  let lastData = null;
  let unsubscribe = null;

  try {
    unsubscribe = onSnapshot(doc(db, collectionPath, docName), (docSnapshot) => {
      let newData = null;
      if (docSnapshot.exists()) {
        const docData = docSnapshot.data();
        newData = docData.data || docData;
      }
      // Chiama sempre il callback, anche se il documento non esiste
      if (newData && JSON.stringify(newData) !== JSON.stringify(lastData)) {
        console.log(`Listener ${docName} aggiornato:`, newData);
        lastData = newData;
        callback(newData);
      }
    }, (error) => {
      console.error(`Errore listener ${docName}:`, error);
    });
  } catch (error) {
    console.error(`Errore setup listener ${docName}:`, error);
  }

  // Polling fallback
  const pollInterval = setInterval(async () => {
    try {
      const docSnapshot = await getDoc(doc(db, collectionPath, docName));
      if (docSnapshot.exists()) {
        const docData = docSnapshot.data();
        const newData = docData.data || docData;
        if (JSON.stringify(newData) !== JSON.stringify(lastData)) {
          console.log(`Polling ${docName} aggiornato:`, newData);
          lastData = newData;
          callback(newData);
        }
      }
    } catch (error) {
      console.error(`Errore polling ${docName}:`, error);
    }
  }, pollIntervalMs);

  return () => {
    if (unsubscribe) unsubscribe();
    clearInterval(pollInterval);
  };
};

// Sincronizza Studio in tempo reale
export const subscribeToStudio = (callback) => {
  return subscribeWithPolling('studio', 'info', callback);
};

// Sincronizza Orari in tempo reale
export const subscribeToOrari = (callback) => {
  return subscribeWithPolling('config', 'orari', callback);
};

// Sincronizza Servizi in tempo reale
export const subscribeToServizi = (callback) => {
  return subscribeWithPolling('config', 'servizi', callback);
};

// Sincronizza Ferie in tempo reale
export const subscribeToFerie = (callback) => {
  return subscribeWithPolling('config', 'ferie', callback);
};

// Salva sessione admin su Firebase
export const saveAdminSessionToFirebase = async (sessionData) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato, salvo solo in localStorage');
    return;
  }

  try {
    const docRef = doc(db, 'admin', 'session');
    await setDoc(docRef, {
      data: sessionData,
      updatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 giorni
    });
    console.log('Sessione admin salvata su Firebase');
    return true;
  } catch (error) {
    console.error('Errore salvataggio sessione admin:', error);
    return false;
  }
};

// Sottoscrive alla sessione admin
export const subscribeToAdminSession = (callback) => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return () => {};
  }

  try {
    const unsubscribe = onSnapshot(doc(db, 'admin', 'session'), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const docData = docSnapshot.data();
        const sessionData = docData.data || docData;
        console.log('Sessione admin ricevuta:', sessionData);
        callback(sessionData);
      } else {
        console.log('Sessione admin non trovata');
        callback(null);
      }
    }, (error) => {
      console.error('Errore listener sessione admin:', error);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Errore setup listener sessione admin:', error);
    return () => {};
  }
};

// Elimina sessione admin da Firebase
export const deleteAdminSessionFromFirebase = async () => {
  if (!initFirebase()) {
    console.warn('Firebase non configurato');
    return;
  }

  try {
    const docRef = doc(db, 'admin', 'session');
    await deleteDoc(docRef);
    console.log('Sessione admin eliminata da Firebase');
    return true;
  } catch (error) {
    console.error('Errore eliminazione sessione admin:', error);
    return false;
  }
};

export const getFirebaseInstance = () => {
  initFirebase();
  return db;
};

// Inizializza Firebase per ottenere auth
initFirebase();

export { auth };

# 🔧 Migrazione da localStorage a Firebase - Guida Sviluppatore

Questa guida è per TE (sviluppatore) per integrare Firebase nel progetto.

## 📋 Riepilogo

Attualmente: **localStorage** (locale)  
Dopo migrazione: **Firestore** (cloud)

Tempo stimato: **2-3 ore**  
Difficoltà: **Facile** (99% della logica è già pronta)

---

## STEP 1: Installa Firebase

```bash
npm install firebase
```

---

## STEP 2: Setup Credenziali

### 2.1 Crea `.env.local`

Nella cartella root del progetto:

```
REACT_APP_FIREBASE_API_KEY=AIzaSyDxxx...
REACT_APP_FIREBASE_AUTH_DOMAIN=studio-xxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=studio-xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=studio-xxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456...
REACT_APP_FIREBASE_APP_ID=1:123456:web:abcdef...
```

(Questi valori vengono da Firebase Console → Impostazioni progetto → Credenziali app)

### 2.2 Aggiungi a .gitignore

```
.env.local
```

(Già fatto nel .gitignore - non condividere credenziali!)

---

## STEP 3: Usa firebaseService.js

Ho già creato `src/services/firebaseService.js` con tutte le funzioni.

**Funzioni disponibili:**

```javascript
// Prenotazioni
addPrenotazione(prenotazione)     // Crea nuova prenotazione
getPrenotazioni()                  // Leggi tutte le prenotazioni
updatePrenotazione(id, updates)    // Modifica prenotazione
deletePrenotazione(id)             // Elimina prenotazione

// Servizi
addServizio(servizio)              // Crea servizio
getServizi()                       // Leggi servizi
updateServizio(id, updates)        // Modifica servizio
deleteServizio(id)                 // Elimina servizio

// Studio Info
updateStudioInfo(data)             // Aggiorna info studio
getStudioInfo()                    // Leggi info studio

// Orari
updateOrari(orari)                 // Aggiorna orari
getOrari()                         // Leggi orari

// Utility
isFirebaseConnected()              // Controlla se Firebase è connesso
```

---

## STEP 4: Modificare StudioContext.js

Nel context, sostituisci la logica localStorage con Firebase.

### Attuale (localStorage):
```javascript
useEffect(() => {
  const savedPrenotazioni = localStorage.getItem('prenotazioni');
  if (savedPrenotazioni) setPrenotazioni(JSON.parse(savedPrenotazioni));
}, []);
```

### Nuovo (Firebase):
```javascript
import firebaseService from '../services/firebaseService';

useEffect(() => {
  const loadData = async () => {
    const prenotazioni = await firebaseService.getPrenotazioni();
    setPrenotazioni(prenotazioni);
  };
  
  loadData();
}, []);
```

### Salvataggio:

**Attuale (localStorage):**
```javascript
useEffect(() => {
  localStorage.setItem('prenotazioni', JSON.stringify(prenotazioni));
}, [prenotazioni]);
```

**Nuovo (Firebase):**
```javascript
const addPrenotazione = async (prenotazione) => {
  const id = await firebaseService.addPrenotazione(prenotazione);
  setPrenotazioni(prev => [...prev, { ...prenotazione, id }]);
  addToast('Prenotazione salvata!', 'success');
  return id;
};
```

---

## STEP 5: Punti di Integrazione

Questi file usano localStorage e devono cambiare:

1. **StudioContext.js** - Principale (load/save dati)
2. **Prenotazioni.jsx** - Aggiunge prenotazioni
3. **AdminOrari.jsx** - Salva orari
4. **AdminPrenotazioni.jsx** - Gestisce prenotazioni
5. **AdminInfoStudio.jsx** - Salva dati studio
6. **AdminServizi.jsx** - CRUD servizi

### Per ogni file, il pattern è:

**Prima (localStorage):**
```javascript
setPrenotazioni(prev => [...prev, nuova]);
```

**Dopo (Firebase):**
```javascript
await firebaseService.addPrenotazione(nuova);
const updated = await firebaseService.getPrenotazioni();
setPrenotazioni(updated);
```

---

## STEP 6: Creare Collezioni su Firestore

Firebase crea le collezioni automaticamente al primo documento salvato.

Ma puoi crearle manualmente in Firebase Console per clarezza:

1. **Firestore Database** → **Crea collezione**
2. Crea queste collezioni:
   - `prenotazioni`
   - `servizi`
   - `studio` (con documenti: "info", "orari")

3. Prima collezione vuota? Scrivi un documento di prova:
   ```
   Collezione: prenotazioni
   Documento: test
   Campi: { test: true }
   ```

4. Poi cancellalo

---

## STEP 7: Setup Regole di Sicurezza

In Firestore, vai su scheda **Regole** e incolla:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lettura pubblica
    match /{document=**} {
      allow read: if true;
    }
    
    // Scrittura solo autenticati
    match /prenotazioni/{document=**} {
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    
    match /servizi/{document=**} {
      allow write: if request.auth != null;
    }
    
    match /studio/{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

---

## STEP 8: Testing

### 8.1 Ambiente Sviluppo

```bash
npm start
```

1. Vai a /prenotazioni
2. Fai una prenotazione di test
3. Apri DevTools (F12 → Console)
4. Non dovrebbero esserci errori rossi
5. Vai a Firebase Console → Firestore
6. Dovresti vedere un documento in `prenotazioni`

### 8.2 Admin Panel

1. Vai a /admin → Accedi (dentista/1234)
2. Vai a /admin/servizi
3. Aggiungi un nuovo servizio
4. Controlla che appaia su Firestore

### 8.3 Sincronizzazione

1. Apri il sito su due device diversi
2. Prenota su uno
3. Ricarica l'altro
4. La prenotazione dovrebbe apparire (sync)

---

## STEP 9: Passare da Demo a Produzione

### 9.1 Fallback se Firebase non disponibile

Mantieni localStorage come fallback:

```javascript
const addPrenotazione = async (prenotazione) => {
  try {
    const id = await firebaseService.addPrenotazione(prenotazione);
    return id;
  } catch (error) {
    console.warn('Firebase offline, uso localStorage');
    return saveLocalStorage('prenotazioni', prenotazione);
  }
};
```

### 9.2 Backup Automatico

In Firebase Console → Backups:
- Abilita backup giornalieri automatici

### 9.3 Monitoraggio

Aggiungi Google Analytics per tracciare:
- Numero prenotazioni/giorno
- Pagina più vista
- Tempo medio su sito

---

## 🐛 Troubleshooting

### Errore: "Firebase is not defined"
```bash
npm install firebase
npm start
```

### Errore: "Missing CORS header"
- Assicurati che `.env.local` sia nella cartella giusta
- Riavvia il server

### Niente appare su Firestore
- Controlla credenziali in `.env.local`
- Verifica che il database sia stato creato
- Controlla regole di sicurezza

### Prenotazioni non sincronizzate tra device
- Verifica che le regole permettano lettura pubblica
- Controlla che il database sia il corretto
- Attendi 2-3 secondi per la sincronizzazione

### Performance lenta
- Aggiungi indici (Firestore suggerisce automaticamente)
- Usa `limit()` per query big
- Cache locale con localStorage

---

## 📊 Schema Firestore Consigliato

```
prenotazioni/
├── {prenotazioneId}/
│   ├── nome: string
│   ├── email: string
│   ├── telefono: string
│   ├── data: string (YYYY-MM-DD)
│   ├── orario: string (HH:MM)
│   ├── servizioId: number
│   ├── servizioNome: string
│   ├── prezzo: number
│   ├── status: string (sospesa/confermata/annullata)
│   ├── nota: string (note admin private)
│   └── createdAt: timestamp

servizi/
├── {servizioId}/
│   ├── nome: string
│   ├── prezzo: number
│   ├── durata: number
│   ├── descrizione: string
│   └── emoji: string

studio/
├── info/
│   ├── nome: string
│   ├── indirizzo: string
│   ├── telefono: string
│   ├── email: string
│   └── ... (altri campi)
├── orari/
│   ├── lunedi: { aperto, apertura, chiusura, ... }
│   ├── martedi: { ... }
│   └── ... (altri giorni)
```

---

## 🚀 Checklist Migrazione

- [ ] `npm install firebase`
- [ ] Crea `.env.local` con credenziali Firebase
- [ ] Modifica StudioContext.js per usare Firebase
- [ ] Modifica Prenotazioni.jsx per Firebase
- [ ] Modifica admin pages per Firebase
- [ ] Crea collezioni su Firestore
- [ ] Aggiungi regole di sicurezza
- [ ] Testa prenotazione su dev
- [ ] Testa admin panel
- [ ] Testa sincronizzazione multi-device
- [ ] Test load/performance
- [ ] Deploy su Vercel
- [ ] Attiva Firestore backups

---

## ⏱️ Timeline Realistica

| Task | Tempo |
|------|-------|
| Setup Firebase + credenziali | 15 min |
| Modificare Context | 30 min |
| Modificare Prenotazioni | 20 min |
| Modificare Admin Pages | 45 min |
| Testing completo | 30 min |
| Troubleshooting | 15 min |
| **Totale** | **~2.5 ore** |

---

## 📚 Risorse Utili

- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Firebase SDK React](https://firebase.google.com/docs/database/start)
- [Regole Firestore](https://firebase.google.com/docs/firestore/security/get-started)

---

## 💬 Note Finali

- **Mantieni localStorage come fallback** - User offline mode
- **Aggiungi error handling** - Network failures
- **Log tutto** - Per debugging
- **Monitora performance** - Cloud cost
- **Backup regolari** - Non perdere dati

---

**Buona migrazione!** 🚀

# 🔥 Guida Firebase per il Dentista

Questa guida ti spiega come configurare Firebase autonomamente. **Tempo: 30 minuti**

## 📚 Indice
1. Creare progetto Firebase
2. Configurare Firestore
3. Aggiungere credenziali al sito
4. Testare tutto

---

## STEP 1: Creare Progetto Firebase (5 minuti)

### 1.1 Vai a Firebase Console
- Apri: https://console.firebase.google.com/
- Accedi con Gmail

### 1.2 Crea Nuovo Progetto
1. Click su **"Aggiungi progetto"**
2. Nome: `Studio Dentistico` (o il tuo nome)
3. Accetta termini
4. Click **"Continua"**

### 1.3 Abilita Google Analytics (opzionale)
- Seleziona account Google Analytics
- O salta questo step

### 1.4 Aspetta creazione
Attendere 1-2 minuti...

---

## STEP 2: Configurare Firestore Database (5 minuti)

### 2.1 Apri la tua App
Nella console Firebase, dovresti vedere il tuo progetto. Click su di esso.

### 2.2 Vai a Firestore
Nel menu a sinistra:
```
Build → Firestore Database
```

### 2.3 Crea Database
1. Click **"Crea database"**
2. Seleziona: **"Modalità di prova"** (per sviluppo)
3. Location: **"eur3"** (Europa)
4. Click **"Abilita"**

⏳ Attendere 1-2 minuti...

### 2.4 Dovresti Vedere
Una pagina vuota con scritto:
```
Inizia a scrivere il tuo primo documento
```

✅ **Perfetto! Firestore è pronto**

---

## STEP 3: Ottenere Credenziali (5 minuti)

### 3.1 Vai alle Impostazioni Progetto
1. Click su **⚙️ Icona ingranaggio** in alto a sinistra
2. Seleziona **"Impostazioni progetto"**

### 3.2 Aggiungi App Web
1. Scroll down fino a **"Le tue app"**
2. Click sull'icona **`</>`** per aggiungere app web
3. Nickname: `Studio Web` (qualsiasi nome)
4. Click **"Registra app"**

### 3.3 Copia le Credenziali
Vedrai un codice JavaScript come questo:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxxx...",
  authDomain: "studio-xxx.firebaseapp.com",
  projectId: "studio-xxx",
  storageBucket: "studio-xxx.appspot.com",
  messagingSenderId: "123456...",
  appId: "1:123456:web:abcdef..."
};
```

📋 **COPIA TUTTO E SALVA IN UN FILE DI TESTO**

### 3.4 Crea File `.env.local`
Nella cartella del progetto (`C:\Users\Utente\Desktop\app medico\`), crea un file:

**Nome file:** `.env.local`

**Contenuto:**
```
REACT_APP_FIREBASE_API_KEY=AIzaSyDxxx...
REACT_APP_FIREBASE_AUTH_DOMAIN=studio-xxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=studio-xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=studio-xxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456...
REACT_APP_FIREBASE_APP_ID=1:123456:web:abcdef...
```

(Sostituisci i valori con i tuoi)

### 3.5 Salva e Chiudi Editor
File salvato? Continua...

---

## STEP 4: Configurare Regole di Sicurezza (3 minuti)

### 4.1 Torna a Firestore
```
Build → Firestore Database → Scheda "Regole"
```

### 4.2 Sostituisci le Regole
Cancella tutto e incolla:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permetti lettura a tutti (pagine pubbliche)
    match /{document=**} {
      allow read: if true;
    }
    
    // Admin solo con password
    match /admin/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Prenotazioni: chiunque può leggere/scrivere
    match /prenotazioni/{document=**} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
  }
}
```

### 4.3 Click "Pubblica"
In basso a destra.

✅ **Regole applicate!**

---

## STEP 5: Testare Connessione (5 minuti)

### 5.1 Riavvia il Sito
```powershell
# Nel terminale
npm start
```

### 5.2 Vai su http://localhost:3000/
- Se vedi la home normale → ✅ Connessione ok
- Se vedi errore in console → Controlla credenziali

### 5.3 Controlla Console Browser
Apri DevTools (F12) → Console:
- Non dovrebbero esserci errori Firebase rossi
- Potrebbe avere warning gialli (ignorali)

### 5.4 Prova a Prenotare
1. Vai a /prenotazioni
2. Completa un booking
3. Vai a Admin Panel
4. Vedi la prenotazione?

✅ **Se appare: Firebase funziona!**

---

## 📊 Verificare Dati su Firebase

### Visualizzare Prenotazioni Salvate
1. Firebase Console → Firestore
2. Dovresti vedere una collezione: `prenotazioni`
3. Click per espandere
4. Vedrai i documenti con i dati

---

## ⚠️ Troubleshooting

### Errore: "Firebase is not defined"
**Soluzione:**
```powershell
npm install firebase
npm start
```

### Errore: "Missing CORS header"
**Soluzione:**
- Assicurati che `.env.local` sia nella cartella giusta
- Riavvia il server: `npm start`

### Niente appare su Firestore
**Soluzione:**
- Controlla se le regole sono pubblicate
- Controlla credenziali in `.env.local`
- Apri Console Browser (F12) per errori rossi

### Le Prenotazioni Non si Salvano
**Soluzione:**
1. Apri Firebase Console
2. Firestore → Firestore Debug Rules
3. Cerca errori di permesso
4. Verifica regole di sicurezza sopra

---

## 🔒 Passare da Sviluppo a Produzione

### Quando sei pronto:

1. **Cambia le Regole** (modalità più restrittiva):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if false; // Niente scritture
    }
  }
}
```

2. **Disabilita Email Anonime** (più sicuro)
   - Firebase Console → Authentication → Providers
   - Disabilita "Anonymous"

3. **Abilita Backups Automatici**
   - Firebase Console → Backup e ripristino
   - Abilita backup giornalieri

---

## 📞 Supporto

Se hai problemi:

1. **Controlla la Console del Browser** (F12 → Console)
2. **Leggi i messaggi di errore** (sono descrittivi)
3. **Riavvia il server** (`npm start`)
4. **Svuota cache** (Ctrl+Shift+Del)

---

## ✅ Checklist Finale

- [ ] Progetto Firebase creato
- [ ] Firestore Database abilitato
- [ ] Credenziali copiate
- [ ] File `.env.local` creato
- [ ] Regole di sicurezza pubblicate
- [ ] Sito riavviato (`npm start`)
- [ ] Prenotazione di test creata
- [ ] Dati visibili su Firebase Console
- [ ] Admin panel funziona

**Se tutto è ✅, sei pronto!** 🎉

---

**Fatto tutto? Scrivi "Fatto!" quando Firebase è online** 📱

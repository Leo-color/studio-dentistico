# 🔥 FIREBASE SETUP - Sincronizzazione Prenotazioni

Il sito usa **Firebase Firestore** per sincronizzare le prenotazioni in tempo reale tra tutti i browser/dispositivi.

---

## 🎯 COSA FUNZIONA CON FIREBASE:

```
✅ Paziente prenota → Salvato su Firebase Cloud
✅ Admin apre dashboard → Vede prenotazioni sincronizzate
✅ In tempo reale → Niente refresh, niente cache
✅ Multi-device → Stesso dato su tutti i dispositivi
```

---

## ⚙️ SETUP (5 minuti)

### 1. Ottieni Credenziali da Firebase Console

1. **Vai a:** https://console.firebase.google.com/
2. **Clicca:** [Crea Progetto]
3. **Nome:** "Studio Dentistico"
4. **Click:** [Continua]
5. **Disabilita Analytics** (toggle OFF)
6. **Click:** [Crea Progetto]

### 2. Attiva Firestore

1. **Left menu → Firestore Database**
2. **Click:** [Crea database]
3. **Modalità:** "Produzione" ✅
4. **Posizione:** "europe-west1" (Europa)
5. **Click:** [Abilita]

### 3. Ottieni Credenziali

1. **Left menu → [Project Settings]** (⚙️ in basso)
2. **Scorri a:** "Le tue app"
3. **Click:** [</> Web]
4. **Nickname:** "Studio Web"
5. **Click:** [Registra app]

**VEDRAI QUESTO:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "studio-xxxxx.firebaseapp.com",
  projectId: "studio-xxxxx",
  storageBucket: "studio-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### 4. Configura `.env.local`

Copia `.env.local.example` a `.env.local`:

```bash
cp .env.local.example .env.local
```

Riempi i valori Firebase:

```env
REACT_APP_FIREBASE_API_KEY=AIzaSyD...
REACT_APP_FIREBASE_AUTH_DOMAIN=studio-xxxxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=studio-xxxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=studio-xxxxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

### 5. Installa Firebase

```bash
npm install firebase
```

### 6. Testa

```bash
npm start
```

**Test:**
1. Apri http://localhost:3000
2. Prenota un appuntamento
3. Controlla **Firebase Console → Firestore** 
4. Dovresti veder la nuova prenotazione in tempo reale!

---

## 📋 FIRESTORE SECURITY RULES (Produzione)

**NON usare in produzione le regole di default!**

Vai a: **Firestore → Rules**

Cambia con:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Solo lettura pubblica
    match /prenotazioni/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == 'admin-uid';
    }
    match /servizi/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

---

## 🚀 DEPLOY SU VERCEL

Quando deployerai su Vercel, aggiungi le variabili di ambiente:

1. **Vai a:** Vercel Dashboard → Project Settings
2. **Click:** [Environment Variables]
3. **Aggiungi le variabili Firebase**
4. **Deploy**

---

## ✅ CHECKLIST

```
☑ Firebase Console account
☑ Firestore Database creato
☑ Credenziali copiate
☑ .env.local configurato
☑ npm install firebase
☑ Test locale: prenotazione salvata su Firebase
☑ Security Rules configurate
☑ Deploy su Vercel con env vars
```

---

**Quando Firebase è configurato:**
- Tutte le prenotazioni si sincronizzano in cloud
- Admin dashboard mostra dati in tempo reale
- Zero problemi con localStorage limitato
- Backup automatico di tutte le prenotazioni

🎉 **PRONTO!**

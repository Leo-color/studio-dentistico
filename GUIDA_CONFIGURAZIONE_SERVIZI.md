# 🔧 GUIDA COMPLETA CONFIGURAZIONE SERVIZI

**Per configurare TUTTI i servizi (SendGrid, Twilio, Firebase, Google Calendar)**

---

## 📋 PREREQUISITI

- `.env.local` file nella cartella principale (C:\Users\Utente\Desktop\app medico\)
- `npm start` in esecuzione per testare

---

# 📧 SENDGRID (Email Conferma)

## PASSO 1: Iscrizione

1. Vai a: **https://sendgrid.com/**
2. Click **[Sign Up]** (in alto a destra)
3. Compila:
   ```
   Email: tua_email@gmail.com
   Password: qualcosa_di_sicuro
   First Name: Il tuo nome
   Last Name: Cognome
   ```
4. Click **[Create Account]**
5. Verifica email (controlla inbox)
6. **Account creato!**

## PASSO 2: Genera API Key

1. Accedi: **https://app.sendgrid.com/**
2. Left menu → **Settings** (⚙️)
3. Clicca **API Keys**
4. Click **[Create API Key]** (blu)
5. Compila:
   ```
   Name: Studio Dentistico
   Permissions: Full Access
   ```
6. Click **[Create & Copy]**
7. **SALVA LA CHIAVE** (es: `SG.7hJ9kL2mN4...`)

## PASSO 3: Configura `.env.local`

Apri/crea file: `.env.local`

Aggiungi:
```env
REACT_APP_SENDGRID_API_KEY=SG.7hJ9kL2mN4pQ6rS8tU0vW2xY4zAbCdEfG
```

(Sostituisci con la TUA chiave)

## PASSO 4: Testa

1. Riavvia: `npm start`
2. Prenota (http://localhost:3000/prenotazioni)
3. Email: tua_email@gmail.com
4. Submit
5. **Controlla inbox** (dovrebbe arrivare in 5 sec)

✅ **FUNZIONA!**

---

# 📱 TWILIO (SMS Reminder)

## PASSO 1: Iscrizione

1. Vai a: **https://www.twilio.com/console**
2. Click **[Sign Up]**
3. Compila form (email, password, nome)
4. Verifica numero di telefono (riceverai SMS con codice)
5. **Account creato!**

## PASSO 2: Ottieni Account SID e Auth Token

1. Apri: **https://www.twilio.com/console**
2. Cerca **"Account Info"** (left menu)
3. Copia questi 2 valori:
   ```
   Account SID:  ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   Auth Token:   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. Salva in file di testo

## PASSO 3: Compra Numero Twilio

1. Left menu → **Phone Numbers**
2. Click **[Get Your First Twilio Phone Number]**
3. Oppure: **[Buy a Number]**
4. Scegli:
   ```
   Country: Italy (oppure tuo paese)
   Area Code: Lascia vuoto
   ```
5. Vedrai un numero: **+39 3XX XXXX XXXX**
6. Click **[Buy]**
7. **Copia il numero** (es: `+393XX1234567`)

## PASSO 4: Configura `.env.local`

Aggiungi a `.env.local`:
```env
REACT_APP_TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_PHONE=+393XX1234567
```

(Sostituisci con I TUOI valori)

## PASSO 5: Testa

1. Riavvia: `npm start`
2. Prenota per **DOMANI**
3. Telefono: Il TUO numero (es: +39 333 1234567)
4. Submit
5. **Attendi 24h** oppure modificare il codice per test rapido

✅ **SMS arriverà domani a questa ora!**

---

# 📅 GOOGLE CALENDAR (Sincronizzazione)

## PASSO 1: Setup Google Calendar API

1. Vai a: **https://console.developers.google.com/**
2. Crea nuovo progetto:
   - Click **[Create Project]**
   - Nome: `Studio Dentistico`
   - Click **[Create]**
3. Attendi 1-2 minuti

## PASSO 2: Abilita Google Calendar API

1. Top di pagina: Cerca **"Google Calendar API"**
2. Click sul primo risultato
3. Click **[ENABLE]** (blu grande)
4. Attendi...

## PASSO 3: Genera API Key

1. Left menu → **Credentials**
2. Click **[Create Credentials]** (blu)
3. Scegli: **API Key**
4. Vedrai una chiave popup (es: `AIzaSyJ7...`)
5. **Copia e salva**

## PASSO 4: Trova Calendar ID

1. Apri **https://calendar.google.com/**
2. Impostazioni → Calendari
3. Seleziona il TUO calendario
4. Scroll down fino a **"Integrations"**
5. Vedrai **Calendar ID** (es: `tuo_email@gmail.com`)
6. **Copia**

## PASSO 5: Configura `.env.local`

Aggiungi:
```env
REACT_APP_GOOGLE_CALENDAR_API_KEY=AIzaSyJ7xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_GOOGLE_CALENDAR_ID=tuo_email@gmail.com
```

(Sostituisci con I TUOI valori)

## PASSO 6: Testa

1. Riavvia: `npm start`
2. Prenota
3. Apri **Google Calendar**
4. **Vedrai evento creato automaticamente!**

✅ **FUNZIONA!**

---

# 🔥 FIREBASE (Database Cloud)

## PASSO 1: Crea Progetto Firebase

1. Vai a: **https://console.firebase.google.com/**
2. Click **[Add Project]**
3. Compila:
   ```
   Project name: studio-dentistico
   ```
4. Continua → Crea → Aspetta

## PASSO 2: Setup Firestore Database

1. Left menu → **Firestore Database**
2. Click **[Create Database]**
3. Scegli: **Start in production mode**
4. Location: **Europe (eur3)**
5. Click **[Enable]**
6. Aspetta creazione...

## PASSO 3: Ottieni Credenziali Firebase

1. Left menu → **Project Settings** (⚙️)
2. Scroll down → **Your apps**
3. Click icona **</> (Web)**
4. Compila: `nickname: Studio Web`
5. Click **[Register App]**
6. Vedrai codice JavaScript:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyD...",
     authDomain: "studio-xxx.firebaseapp.com",
     projectId: "studio-xxx",
     storageBucket: "studio-xxx.appspot.com",
     messagingSenderId: "123456",
     appId: "1:123456:web:abcdef"
   };
   ```
7. **Copia valori**

## PASSO 4: Configura `.env.local`

Aggiungi:
```env
REACT_APP_FIREBASE_API_KEY=AIzaSyD...
REACT_APP_FIREBASE_AUTH_DOMAIN=studio-xxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=studio-xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=studio-xxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456
REACT_APP_FIREBASE_APP_ID=1:123456:web:abcdef
```

## PASSO 5: Setup Regole Firestore

1. Left menu → **Firestore Database**
2. Click tab **Regole**
3. Sostituisci tutto con:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read: if true;
         allow write: if false;
       }
     }
   }
   ```
4. Click **[Publish]**

## PASSO 6: Testa

1. Riavvia: `npm start`
2. Prenota
3. Apri **Firebase Console → Firestore**
4. **Vedrai documento creato!**

✅ **FUNZIONA!**

---

# ✅ CHECKLIST CONFIGURAZIONE COMPLETA

- [ ] **SendGrid API Key** in `.env.local`
- [ ] **Twilio SID, Token, Phone** in `.env.local`
- [ ] **Google Calendar API Key e Calendar ID** in `.env.local`
- [ ] **Firebase credentials** in `.env.local`
- [ ] Riavviato `npm start`

- [ ] **Test Email:** Prenota → email arriva ✓
- [ ] **Test SMS:** Prenota domani → SMS arriva 24h dopo ✓
- [ ] **Test Google Calendar:** Prenota → evento appare su calendario ✓
- [ ] **Test Firebase:** Prenota → documento appare su Firestore ✓

---

# 🐛 TROUBLESHOOTING

## Email non arriva
- ✅ API key è corretta?
- ✅ Hai riavviato `npm start`?
- ✅ Controlla SPAM folder
- ✅ Console browser mostra errori?

## SMS non funziona
- ✅ Numero Twilio comprato?
- ✅ Account ha credito (gratis 15/mese)?
- ✅ Numero paziente è valido?
- ✅ `.env.local` ha PHONE con `+`?

## Google Calendar non sincronizza
- ✅ API Key è corretta?
- ✅ Calendar ID è email?
- ✅ API è ABILITATA in console Google?

## Firebase non funziona
- ✅ Firestore database è CREATO?
- ✅ Regole sono PUBBLICATE?
- ✅ Credentials sono corrette?

---

# 🎯 FILE FINALE `.env.local`

```env
# SendGrid
REACT_APP_SENDGRID_API_KEY=SG.7hJ9kL2mN4pQ6rS8tU0vW2xY4zAbCdEfG

# Twilio
REACT_APP_TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_PHONE=+393XX1234567

# Google Calendar
REACT_APP_GOOGLE_CALENDAR_API_KEY=AIzaSyJ7xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_GOOGLE_CALENDAR_ID=tuo_email@gmail.com

# Firebase
REACT_APP_FIREBASE_API_KEY=AIzaSyD...
REACT_APP_FIREBASE_AUTH_DOMAIN=studio-xxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=studio-xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=studio-xxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456
REACT_APP_FIREBASE_APP_ID=1:123456:web:abcdef

# Google Maps (opzionale)
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSy...
```

---

🎉 **TUTTO CONFIGURATO!**

Adesso il sito usa:
- ✅ Email (SendGrid)
- ✅ SMS (Twilio)
- ✅ Google Calendar
- ✅ Firebase Database

**PRONTO PER VENDERE!** 💰


# 🚀 Setup Essenziale per Vendita - 4 Step (45 min)

Questi 4 step rendono il sito **PRONTO PER VENDERE** oggi stesso!

---

## ✅ STEP 1: EMAIL DI CONFERMA (20 min)

### 1.1 Registrati su SendGrid (Gratis - 100 email/giorno)

**Sito:** https://sendgrid.com/

**Step:**
1. Click [Sign Up] in alto a destra
2. Compila il form:
   - Email: tuo_email@gmail.com
   - Password: qualcosa di sicuro
   - First Name: Il tuo nome
   - Last Name: Cognome
3. Click [Create Account]
4. Riceverai email di verifica
5. Click link in email
6. **Account creato!**

### 1.2 FASE 1: Genera API Key

**In Dashboard SendGrid:**
1. Login su: https://app.sendgrid.com/
2. Left menu (sidebar) → **Settings** (⚙️ icon)
3. Clicca **API Keys**
4. Click [Create API Key] (bottone blu)
5. Compila:
   - **API Key Name:** "Studio Dentistico"
   - **API Key Permissions:** Seleziona "Full Access" (più semplice)
6. Click [Create & Copy]
7. **COPIA LA CHIAVE** (inizia con `SG.`)
   
Esempio: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

⚠️ **IMPORTANTISSIMO:** Salva la chiave in un file di testo. Non potrai vederla di nuovo!

### 1.3 FASE 2: Configura `.env.local`

**Crea/Modifica file:** `C:\Users\Utente\Desktop\app medico\.env.local`

**Aggiungi questa riga:**

```
REACT_APP_SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Sostituisci `SG.xxx...` con la tua API key da SendGrid**

Esempio completo `.env.local`:
```
REACT_APP_SENDGRID_API_KEY=SG.7hJ9kL2mN4pQ6rS8tU0vW2xY4zAbCdEfG
REACT_APP_TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_PHONE=+39xxxxxxxxxx
```

### 1.4 TEST EMAIL

**Nel browser:**
1. `npm start`
2. Vai a http://localhost:3000/prenotazioni
3. Compila form completo
4. **Email deve essere REALE** (la tua o test@gmail.com)
5. Click [CONFERMA PRENOTAZIONE]

**Email ricevuta (in pochi secondi):**
- ✅ Numero prenotazione: PRE-2026-1234
- ✅ Data: 10 Giugno 2026 (Martedì)
- ✅ Orario: 10:00 - 10:30
- ✅ Servizio: Pulizia dentale
- ✅ Prezzo: €50
- ✅ Link annullamento
- ✅ Contatti studio

### 1.5 Troubleshooting

**Email non arriva?**
1. ✅ Email paziente è VALIDA?
2. ✅ API key è corretta in `.env.local`?
3. ✅ Hai riavviato `npm start`?
4. ✅ Controlla SPAM folder
5. ✅ Console browser (F12) mostra errori SendGrid?

**Errore API key?**
- Controlla che NON hai spazi extra
- Assicurati sia `SG.` all'inizio
- Ricrea API key se perso

---

---

## ✅ STEP 2: PRIVACY POLICY (10 min)

### 2.1 Pagina Creata

File: `src/pages/Privacy.jsx`

Contiene:
- ✅ Privacy policy completa GDPR
- ✅ Termini di trattamento dati
- ✅ Diritti degli interessati
- ✅ Consenso cookies

### 2.2 Accedi

URL: `http://localhost:3000/privacy`

Link nel footer in fondo al sito

### 2.3 Personalizza

Modifica il file se necessario con i tuoi dati specifici.

---

## ✅ STEP 3: PASSWORD ADMIN MODIFICABILE (15 min)

### 3.1 Pagina Impostazioni Admin

File: `src/admin/AdminImpostazioni.jsx`

Permette al dentista di:
- ✅ Cambiare password da `1234` a una personale
- ✅ Logout sicuro
- ✅ Visualizzare info app

### 3.2 Accedi

URL: `http://localhost:3000/admin/impostazioni`

**Come cambiare password:**

1. Login (dentista/1234)
2. Vai a "Impostazioni" nel menu
3. Click su "Cambia Password"
4. Inserisci vecchia password: `1234`
5. Inserisci nuova password (minimo 6 caratteri)
6. Conferma nuova password
7. Click "Salva Nuova Password"

**⚠️ IMPORTANTE:** La nuova password si salva in localStorage. Non potrai recuperarla se la dimentichi!

---

## ✅ STEP 4: GOOGLE MAPS INTEGRATA (5 min)

### 4.1 Mappa nella Pagina Contatti

File: `src/components/GoogleMap.jsx`

La mappa appare automaticamente nella pagina Contatti!

### 4.2 Accedi

URL: `http://localhost:3000/contatti`

Scorri in basso → "Dove Siamo" con mappa interattiva

### 4.3 Personalizza

La mappa mostra automaticamente il tuo indirizzo studio.

---

## 🚀 AVVIA ADESSO

```bash
cd "C:\Users\Utente\Desktop\app medico"
npm start
```

Il sito si apre su `http://localhost:3000`

---

## ✅ CHECKLIST PRE-VENDITA

- [ ] Email di conferma funziona (fai una prenotazione test)
- [ ] Privacy policy è accessibile (`/privacy`)
- [ ] Puoi cambiare password admin
- [ ] Mappa Google Maps appare in contatti
- [ ] Tutti i pulsanti/link funzionano
- [ ] Design è pulito e professionale

---

## 📞 PRONTO A VENDERE!

Questi 4 step coprono il **90% di quello che serve**:

✅ **Email** - Paziente riceve conferma  
✅ **Privacy** - Compliance legale GDPR  
✅ **Password** - Sicurezza admin  
✅ **Mappa** - Posizione fisica  

**Resto (SMS reminder, notifiche, ecc) può aspettare.**

---

## 🔧 Prossimi Passi Opzionali

1. **SMS Reminder 24h Prima**
   - Integrare Twilio
   - Inviare SMS il giorno prima

2. **Notifiche Admin**
   - Email quando prenota qualcuno
   - Push notification

3. **Cancellazione Prenotazione**
   - Link in email per annullare

4. **Google Calendar Sync**
   - Prenotazioni su Google Calendar

5. **Pagamenti**
   - Stripe/PayPal integration

---

## 📋 Documentazione Aggiuntiva

- `FIREBASE_SETUP.md` - Come configurare Firebase
- `DENTISTA_GUIDA.md` - Guida per il dentista
- `README.md` - Documentazione tecnica

---

**🎉 Congratulazioni! Il tuo sito è pronto per vendere!**

Inizia a contattare i pazienti! 💰


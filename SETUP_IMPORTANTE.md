# 🔥 Setup IMPORTANTE - 4 Features Avanzate (1.5 ore)

Questi 4 step aggiungono valore MASSIMO al sito!

---

## ✅ STEP 1: SMS REMINDER 24h (Twilio)

### 1.1 Registrati su Twilio (Gratis - 15 SMS/mese)

**Sito:** https://www.twilio.com/console

**Step:**
1. Click [Sign Up]
2. Compila: Email, Password, Nome completo
3. Verifica email
4. Scegli "SMS"
5. Inserisci numero di telefono personale (per verifica)
6. Riceverai SMS con codice di verifica
7. Inserisci codice
8. **Account creato!**

### 1.2 FASE 1: Ottieni Account SID e Auth Token

**In Dashboard Twilio:**
1. Apri: https://www.twilio.com/console
2. Cerca **"Account Info"** a sinistra
3. Vedrai 2 valori:
   - **Account SID** → Copiane (es: ACxxxxxxxx...)
   - **Auth Token** → Copia (es: xxxxxxxxxxxxx...)
4. Salva in un file di testo

### 1.3 FASE 2: Compra Numero Twilio

**In Dashboard:**
1. Left menu → **"Phone Numbers"**
2. Click **"Get Your First Twilio Phone Number"**
3. Oppure: **"Buy a Number"**
4. Scegli paese: **ITALIA** (o tuo paese)
5. Scegli numero (es: +39 3XX XXX XXXX)
6. Click [Buy]
7. **Copia il numero telefonico**

Esempio numero: `+393XX1234567`

### 1.4 FASE 3: Configura `.env.local`

**Crea file:** `C:\Users\Utente\Desktop\app medico\.env.local`

**Aggiungi queste 3 righe:**

```
REACT_APP_SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_TWILIO_PHONE=+39xxxxxxxxxx
```

**Sostituisci i valori con i tuoi:**
- `SG.xxx...` = Da SendGrid (passo 2)
- `ACxxx...` = Account SID da Twilio
- `xxx...` = Auth Token da Twilio
- `+39xxx...` = Numero Twilio che hai comprato

### 1.5 TEST SMS

**Nel browser:**
1. `npm start`
2. Vai a http://localhost:3000/prenotazioni
3. Prenota una visita per **DOMANI**
4. Riempir form completo
5. **Importante:** Inserisci numero reale (il tuo)
6. Click [CONFERMA PRENOTAZIONE]
7. **Aspetta 24 ore OPPURE modifica il servizio durata a 1 minuto per test rapido**

**Quando SMS arriva:**
```
Ciao Mario, ricordiamo la tua visita domani alle 10:00 presso Studio Dentistico Dr. Rossi. Contattaci se devi annullare.
```

✅ **FUNZIONA!**

### 1.6 Troubleshooting

**SMS non arriva?**
1. ✅ Numero telefono paziente è VALIDO? (10 cifre)
2. ✅ Account Twilio ha CREDITO? (gratis 15/mese)
3. ✅ `.env.local` contiene `REACT_APP_TWILIO_PHONE`?
4. ✅ Hai riavviato `npm start`?
5. ✅ Console browser (F12) mostra errori?

**Errore console?**
- Controlla Account SID
- Controlla Auth Token
- Controlla numero Twilio (deve avere +)

---

---

## ✅ STEP 2: ANNULLAMENTO PRENOTAZIONE

### 2.1 Pagina Creata

File: `src/pages/AnnullaPrenotazione.jsx`

Paziente riceve email con link:
```
https://tuosito.com/annulla-prenotazione?id=PRE-2026-1234
```

### 2.2 Cosa Vede il Paziente

1. Dettagli prenotazione
2. Avviso: "Non potrai recuperarla"
3. Button [Annulla Prenotazione]
4. Conferma modal
5. Prenotazione annullata!

### 2.3 Testare

1. Prenota come paziente
2. Controlla email → clicca link "Annulla"
3. Conferma annullamento
4. Prenotazione è ora "Annullata"

---

## ✅ STEP 3: NOTIFICA DENTISTA ✅

**Già Implementata!**

Quando prenota un paziente:
- Email al dentista con: nome, email, telefono, data, orario, servizio
- Email automatica, zero setup!

**Email va a:** `studio.email` (configura in Admin → Info Studio)

---

## ✅ STEP 4: GOOGLE CALENDAR SYNC

### 4.1 Setup Google Calendar API (Opzionale ma Consigliato)

1. Vai a: https://console.developers.google.com/
2. Crea progetto: "Studio Dentistico"
3. Abilita Google Calendar API
4. Crea API Key (Credenziali → API Key)
5. Copia la chiave

### 4.2 Configura Google Calendar ID

1. Apri Google Calendar
2. Impostazioni → Calendari → Seleziona il tuo
3. ID calendario (sotto "Integrations"): `tuo_email@gmail.com` oppure `xxxxxxx@group.calendar.google.com`

### 4.3 Configurazione

**File:** `.env.local`

```
REACT_APP_GOOGLE_CALENDAR_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_GOOGLE_CALENDAR_ID=tuo_email@gmail.com
```

### 4.4 Come Funziona

- ✅ Paziente prenota
- ✅ Evento automaticamente aggiunto a Google Calendar
- ✅ Titolo: "Pulizia Dentale - Mario Rossi"
- ✅ Descrizione: email, telefono, note
- ✅ Dentista vede prenotazione in calendario!

---

## 🚀 ATTIVAZIONE RAPIDA

### Minimo (15 min)
- ✅ Email (SendGrid) - ESSENZIALE
- ✅ Annullamento - RAPIDO
- ✅ Notifica dentista - GIÀ FATTO

### Ideale (1 ora)
- ✅ Email
- ✅ SMS Reminder (Twilio)
- ✅ Annullamento
- ✅ Notifica dentista

### Completo (1.5 ore)
- ✅ Email
- ✅ SMS Reminder
- ✅ Annullamento
- ✅ Notifica dentista
- ✅ Google Calendar

---

## 📋 CHECKLIST

- [ ] SendGrid: Iscritto e API key copiata
- [ ] `.env.local`: REACT_APP_SENDGRID_API_KEY aggiunta
- [ ] Twilio (opzionale): Iscritto e credenziali copiate
- [ ] `.env.local`: Credenziali Twilio aggiunte (se usato)
- [ ] Google Calendar (opzionale): API key e Calendar ID copiati
- [ ] `.env.local`: Google Calendar config aggiunta (se usato)
- [ ] Test: Prenota → email arriva ✓
- [ ] Test: Clicca link annullamento → funziona ✓
- [ ] Test: Dentista riceve email notifica ✓

---

## 🔑 Segreti nel `.env.local`

**IMPORTANTE:** Non condividere `.env.local` con nessuno!

Contiene:
- API keys (SendGrid, Twilio)
- Account credentials (Twilio)
- API Google

**Aggiungi a `.gitignore`** (già fatto):
```
.env.local
```

---

## 🎯 PROSSIMI PASSI OPZIONALI

1. **Backup Automatico** - Scarica JSON prenotazioni
2. **Export Excel** - CSV prenotazioni
3. **Multi-Dentista** - Team management
4. **Pagamenti Stripe** - Prenota con pagamento
5. **2FA** - Autenticazione doppio fattore

---

## 📞 SUPPORTO

Se qualcosa non funziona:

1. **Email non arriva?**
   - Controlla chiave SendGrid
   - Verifica email del paziente è corretta
   - Controlla spam folder

2. **SMS non arriva?**
   - Controlla credenziali Twilio
   - Assicurati numero Twilio sia valido
   - Numero paziente deve avere +39 davanti

3. **Google Calendar non sincronizza?**
   - Controlla API key è corretta
   - Controlla Calendar ID è email
   - Verifica permessi API

---

🎉 **Congratulazioni! Sito COMPLETO e PROFESSIONALE!**

Adesso puoi vendere con fiducia! 💰


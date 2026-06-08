# 📖 GUIDA COMPLETA - SITO DENTISTICO

**Tutto quello che serve per lanciare il sito dal test al deploy**

---

# 📋 INDICE

1. [Accordo Costi](#-accordo-costi)
2. [Timeline](#️-timeline)
3. [Setup Account](#-setup-account)
4. [Test Completo](#-test-completo)
5. [Deploy su Vercel](#-deploy-su-vercel)
6. [Cron Job Reminder Email](#-cron-job-reminder-email)
7. [Videocall Finale](#-videocall-finale)
8. [Checklist](#-checklist-finale)

---

# ⚖️ ACCORDO COSTI

**SITO COMPLETO: €3.500 (una tantum)**

```
Include:
✅ Homepage professionale
✅ Booking system 5-step
✅ Email di conferma (SendGrid)
✅ Reminder email 24h prima (automatico)
✅ Google Calendar sync
✅ Admin panel
✅ Accedi Prenotazioni (nome + cognome)
✅ Mobile optimized
✅ 1 anno supporto

Costi mensili: €0
- SendGrid: gratis fino a 100 email/mese
- Google Calendar: gratis
- Hosting Vercel: gratis
- Cron job: gratis (EasyCron)
```

**IMPORTANTE - Gratis per sempre:**
```
✅ Nessun canone mensile obbligatorio
✅ Nessun costo nascosto
✅ Paghi SOLO quello che usi (after free tier)
✅ Se dimentichi account: si chiude, niente debito
✅ Sei proprietario di TUTTO (zero vendor lock-in)
```

---

# ⏱️ TIMELINE

```
Min 0-15: Setup SendGrid + Google Calendar
Min 15-30: Test del sito (booking flow)
Min 30-45: Deploy su Vercel
Min 45-50: Configurazione cron job
Min 50-60: Videocall finale con cliente
```

---

# 📧 SETUP ACCOUNT

## 1. SENDGRID (Email) - 5 minuti

### Cliente fa:

1. **Vai: https://sendgrid.com/**
2. **Click [Sign Up]**
3. **Compila:**
   ```
   Email: info@[studio].it
   Password: qualcosa di sicuro
   First Name: [Nome]
   Last Name: [Cognome]
   ```
4. **Click [Create Account]**
5. **Verifica email**
6. **Entra in dashboard**
7. **Left menu → [Settings] → [API Keys]**
8. **Click [Create API Key]**
   ```
   Name: "Studio [Nome]"
   Permissions: Full Access
   ```
9. **Click [Create & Copy]**
10. **COPIA LA CHIAVE** (inizia con `SG.`)

**Mandi al tecnico:**
```
SendGrid API Key: ________________
```

---

## 2. GOOGLE CALENDAR API - 5 minuti

### Cliente fa:

1. **Vai: https://console.cloud.google.com/**
2. **Accedi con Gmail**
3. **Click [Crea Progetto]** (blu in alto)
4. **Nome: "Studio [Nome Dentista]"**
5. **Click [Crea]** (aspetta 10 secondi)
6. **Search bar → scrivi "Calendar API"**
7. **Click [Google Calendar API]**
8. **Click [ABILITA]**
9. **Left menu → [Credenziali]**
10. **Click [Crea credenziali] → [Chiave API]**
11. **Vedrai la chiave:** `AIzaSyD...`
12. **COPIA LA CHIAVE**

**Mandi al tecnico:**
```
Google Calendar API Key: ________________
```

### Tu (tecnico) fai:

1. **Mandi link di autorizzazione al cliente**
2. **Cliente clicca → "Accedi con Google"**
3. **Autentica → Permette accesso a calendario**
4. **OK! Sync automatico** ✅

---

## 3. FIREBASE (Database - Opzionale) - 3 minuti

### Cliente fa (SE vuole backup dati):

1. **Vai: https://console.firebase.google.com/**
2. **Click [Crea un progetto]**
3. **Nome: "Studio [Nome]"**
4. **Click [Continua]**
5. **Disabilita Analytics** (toggle OFF)
6. **Click [Crea progetto]** (aspetta 1-2 min)
7. **Quando finito → [Project Settings]** (⚙️ basso left)
8. **Scorri a "Le tue app" → Click [</> Web]**
9. **Nickname: "Studio Web"**
10. **VEDRAI CODICE firebase:**
    ```javascript
    const firebaseConfig = {
      apiKey: "AIzaSyD...",
      authDomain: "studio-xxxxx.firebaseapp.com",
      projectId: "studio-xxxxx",
      storageBucket: "studio-xxxxx.appspot.com",
      messagingSenderId: "123456789012",
      appId: "1:123456789012:web:abc123"
    };
    ```

**Mandi al tecnico (opzionale):**
```
Firebase API Key: ________________
(altri campi se necessario)
```

---

# 🧪 TEST COMPLETO

## TEST 1: HOME PAGE

```
URL: http://localhost:3000

☑ Navbar carica (logo, menu, bottone Prenota)
☑ "Accedi Prenotazioni" visibile nel navbar
☑ Hero section visibile
☑ Sezione "Perché Scaglierci" (3 card)
☑ Sezione "Servizi" (6 servizi con prezzo)
☑ Sezione "Testimonial" (3 recensioni)
☑ Sezione "Chi Siamo" con specializzazioni
☑ Sezione "Contatti" con mappa
☑ Footer con info complete
☑ Design responsive (mobile, tablet, desktop)
☑ Niente emoji nel testo
```

## TEST 2: BOOKING FLOW 5-STEP

### Step 1: Scegli Servizio
```
☑ Dropdown con servizi
☑ Seleziona "Visita Dentale"
☑ Prezzo €30 visible
☑ Preview blu con dettagli
☑ Bottone "Avanti" abilitato
```

### Step 2: Scegli Data
```
☑ Calendario carica (React Calendar)
☑ Seleziona data (es: domani)
☑ Data evidenziata (giallo)
☑ Preview con data formattata
☑ Bottone "Avanti" abilitato
```

### Step 3: Scegli Orario
```
☑ Mostra Mattina (09:00-13:00)
☑ Mostra Pausa (13:00-14:30)
☑ Mostra Pomeriggio (14:30-19:00)
☑ Seleziona orario (es: 11:00)
☑ Orario evidenziato
☑ Bottone "Avanti" abilitato
```

### Step 4: Inserisci Dati
```
☑ Riepilogo blu (data, orario, servizio, prezzo)
☑ Campo "Nome" (min 3 caratteri)
☑ Campo "Email" (validazione regex)
☑ Campo "Telefono" (10 cifre)
☑ Radio "Nuovo paziente?" (Sì/No)
☑ Textarea "Note" (opzionale)
☑ Checkbox "Ho accettato Privacy Policy" (OBBLIGATORIO)
☑ Privacy Policy link cliccabile → apre modal
☑ Se non accetti Privacy → errore
☑ Bottone "Avanti" abilitato dopo accettazione
```

### Step 5: Conferma
```
☑ Modal "Conferma Prenotazione"
☑ Mostra data, orario, servizio
☑ Bottone "Conferma" verde
☑ Click Conferma → va a pagina success
```

## TEST 3: PAGINA CONFERMA

```
URL: /prenotazione-confermata/PRE-2026-XXXX

☑ Heading verde "PRENOTAZIONE CONFERMATA!"
☑ Icona ✅
☑ Riepilogo dettagli (data, orario, servizio, prezzo)
☑ Dati paziente visibili
☑ "Email di conferma inviata a: [email]"
☑ Bottone "Chiama Studio"
☑ Bottone "Torna alla Home"
☑ Sezione "Informazioni Importanti" (4 bullet)
```

## TEST 4: EMAIL DI CONFERMA

```
☑ Ricevi email in inbox
☑ From: "Studio Dentistico"
☑ Subject: "Prenotazione Confermata"
☑ Contiene:
   - Heading "Prenotazione Confermata"
   - Saluto "Caro [Nome],"
   - Data, orario, servizio, prezzo
   - Info studio
   - "Presentati 5 minuti prima"
   - Link annulla prenotazione
☑ Email ben formattata
☑ Stile professionale (blu)
```

## TEST 5: GOOGLE CALENDAR

```
1. Apri: https://calendar.google.com
2. Login con Gmail

☑ Nuovo evento creato
☑ Titolo: "Visita Dentale"
☑ Data: quella selezionata
☑ Orario: quello selezionato
☑ Descrizione con nome paziente
☑ Evento visible in calendar
```

## TEST 6: ACCEDI PRENOTAZIONI

```
1. Click "Accedi Prenotazioni" nel navbar
2. URL: /mie-prenotazioni

☑ Form con "Nome" e "Cognome"
☑ Bottone "Cerca Prenotazioni"
☑ Inserisci nome e cognome
☑ Click Cerca → mostra prenotazione
☑ Vedi: data, orario, servizio, prezzo, dati
☑ Bottone "Cancella Prenotazione" (rosso)
☑ Click Cancella → modal conferma
☑ Click "Sì, Cancella" → eliminata
☑ Messaggio se non esiste
```

## TEST 7: ADMIN PANEL

```
URL: /admin

☑ Login page carica
☑ Username: "admin"
☑ Password: [quella configurata]
☑ Click Login → dashboard
☑ Vedi prenotazione creata
☑ Puoi visualizzare/modificare/cancellare
☑ Status: "sospesa"
```

## TEST 8: MOBILE RESPONSIVE

```
☑ Navbar responsive (hamburger menu)
☑ Homepage leggibile su mobile
☑ Booking fields ben spaziati
☑ Bottoni cliccabili (min 44px x 44px)
☑ Testo leggibile
☑ Immagini responsive
☑ No overflow orizzontale
☑ Mappa responsive
```

---

# 📦 DEPLOY SU VERCEL

## STEP 1: Crea Repository GitHub

### A. Apri terminale nella cartella progetto

```bash
cd C:\Users\Utente\Desktop\app medico
```

### B. Inizializza repository

```bash
git init
git add .
git commit -m "Sito dentistico completo - pronto per deploy"
```

### C. Crea repo su GitHub

1. **Vai: https://github.com/new**
2. **Repo name:** `studio-dentistico` oppure `dental-app`
3. **Public** (non private)
4. **Click [Create Repository]**

### D. Push codice su GitHub

```bash
git remote add origin https://github.com/TUOUSERNAME/dental-app.git
git branch -M main
git push -u origin main
```

**Esempio reale:**
```bash
git remote add origin https://github.com/tuonome/studio-dentistico.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy su Vercel

### 1. Vai a Vercel

https://vercel.com/

### 2. Click [Sign Up] (oppure con GitHub)

### 3. Autorizza Vercel su GitHub

- Click [Continue with GitHub]
- Autorizza accesso

### 4. Importa progetto

- Click [Import Project]
- Incolla URL: `https://github.com/TUOUSERNAME/dental-app.git`

### 5. Configura progetto

```
Framework Preset: Create React App
Root Directory: ./
Build Command: npm run build
Output Directory: build
```

Vercel lo riconosce automatico! ✅

---

## STEP 3: Variabili di Ambiente

### 1. Click [Environment Variables]

### 2. Aggiungi TUTTE le variabili:

```
REACT_APP_SENDGRID_API_KEY
→ SG.xxxxxxx...

REACT_APP_GOOGLE_CALENDAR_API_KEY
→ AIzaSyD...

REACT_APP_GOOGLE_CALENDAR_ID
→ tuoemail@gmail.com

REACT_APP_AWS_ACCESS_KEY_ID
→ AKIA... (opzionale)

REACT_APP_AWS_SECRET_ACCESS_KEY
→ ... (opzionale)

REACT_APP_AWS_REGION
→ eu-west-1 (opzionale)
```

**Per ogni variabile:**
1. Name: (es: REACT_APP_SENDGRID_API_KEY)
2. Value: (incolla il valore)
3. Click [Save]

---

## STEP 4: Deploy

### 1. Click [Deploy]

Vercel fa tutto:
```
✅ Clona repository
✅ Installa dipendenze
✅ Compila il sito
✅ Deploy online
```

### 2. Aspetta 2-3 minuti

Vedrai "Deployment successful!" ✅

### 3. URL generato

```
https://studio-dentistico.vercel.app
```

---

## STEP 5: Dominio Personalizzato (Opzionale)

Se hai dominio `studiodentistico.it`:

### 1. In Vercel → [Settings] → [Domains]

### 2. Click [Add Domain]

### 3. Inserisci: `studiodentistico.it`

### 4. Vercel ti dice i DNS

### 5. Vai al provider (GoDaddy, Aruba, ecc)

- Cambia DNS verso Vercel
- Aspetta 24h per propagazione

### 6. Dominio funziona! ✅

---

## Aggiornamenti Futuri

Quando modifichi il codice:

```bash
git add .
git commit -m "Descrizione modifiche"
git push origin main
```

**Vercel autodeploy automaticamente!** 🚀

---

# 🔄 CRON JOB - REMINDER EMAIL

## Come Funziona

```
Ogni ora:
1. EasyCron chiama: https://tuodominio.it/api/send-reminders
2. Backend controlla prenotazioni
3. Trova chi ha visita domani (24h prima)
4. Invia email reminder via SendGrid
5. Segna come "inviato"

FUNZIONA 24/7, anche se sito è offline!
```

---

## Setup EasyCron - 5 minuti

### 1. Registrati a EasyCron

Vai: https://www.easycron.com/

**Click [Sign Up]**

```
Email: tuo_email@gmail.com
Password: qualcosa di sicuro
```

---

### 2. Crea Cron Job

1. **Login a EasyCron**
2. **[Cron Jobs]** in menu
3. **Click [+ New Cron Job]**

### 3. Compila il form

```
Cron Expression: 0 * * * * 
(ogni ora, al minuto 0)

URL: https://tuodominio.it/api/send-reminders

Request Method: POST

POST Data:
{
  "prenotazioni": [],
  "studioInfo": {
    "nome": "Studio Dentistico",
    "email": "info@studiodentistico.it",
    "telefono": "+39 02 1234567",
    "indirizzo": "Via Roma 123, Milano"
  }
}
```

### 4. Click [Create]

---

## Verifica che Funziona

1. **Torna alla lista cron jobs**
2. **Vedi il job creato**
3. **Click icona "Run Now" (play)**
4. **Aspetta 5 secondi**
5. **Controlla email ricevute**

**Se vedi "Status: Success" ✅**
→ Cron job funziona!

---

## Se Non Funziona

1. **Click sul job**
2. **Vedi "Execution Log"**
3. **Leggi l'errore**

**Errori comuni:**

```
❌ "URL not reachable"
→ Il sito non è online su Vercel
→ Aspetta che Vercel finisca deploy

❌ "Invalid JSON"
→ Controlla sintassi POST Data

❌ "401 Unauthorized"
→ API key SendGrid non corretta
```

---

# 📞 VIDEOCALL FINALE CON CLIENTE

## COSA TU PREPARI PRIMA

```
☑ Sito testato completamente
☑ Deployment su Vercel fatto
☑ Cron job configurato
☑ Tutte le credenziali setup
☑ Email di test ricevuta
☑ Google Calendar sync ok
```

---

## DURANTE LA VIDEOCALL (30 minuti)

### Min 0-5: Spiegazione

Tu dici:

```
"Bellissimo! Il sito è completamente pronto.
Oggi faccio una dimostrazione veloce di come funziona,
poi è tutto tuo e puoi iniziare a ricevere prenotazioni subito."
```

---

### Min 5-15: Demo Booking

1. **Apri sito insieme al cliente**
2. **Click "Prenota"**
3. **Procedi attraverso 5 step insieme**
4. **Completa prenotazione di test**
5. **Mostra pagina di conferma**

Cliente vede:
```
✅ Prenotazione avvenuta
✅ Numero prenotazione
✅ Dettagli prenotazione
```

---

### Min 15-20: Email di Conferma

1. **Apri email insieme**
2. **Mostra email ricevuta**
3. **Spiega dettagli**

Tu dici:

```
"Vedi? Email di conferma è già arrivata.
I tuoi clienti riceveranno questa email quando prenotano.
Automatico, niente da fare."
```

---

### Min 20-25: Google Calendar

1. **Apri Google Calendar**
2. **Mostra evento creato**
3. **Con data, orario, nome paziente**

Tu dici:

```
"Vedi? La prenotazione è anche qui nel tuo calendario.
Tutto sincronizzato automaticamente.
Non devi gestire niente di manuale."
```

---

### Min 25-30: Accedi Prenotazioni + Admin

1. **Mostra "Accedi Prenotazioni"**
   - Inserisci nome e cognome
   - Vedi prenotazione
   - Puoi cancellarla/modificarla

2. **Mostra Admin Panel**
   - Login
   - Dashboard con prenotazioni
   - Puoi gestire tutto

Tu dici:

```
"Qui tu gestisci tutto.
Vedi tutte le prenotazioni, le cancellazioni, i reminder.
I tuoi clienti possono vedere le loro prenotazioni da qui."
```

---

### Min 30: Riepilogo e Pagamento

Tu dici:

```
"Perfetto! Abbiamo finito.
Il sito è completamente pronto e online.
I tuoi clienti possono iniziare a prenotare subito.

Per il lavoro: €3.500, una tantum.
Nessun costo mensile, niente abbonamenti.

Queste credenziali (SendGrid, Google Calendar, ecc)
sono TUTTE TUE. Se domani cambi tecnico, 
tutto continua a funzionare.
Sei totalmente proprietario di tutto.

Ti mando il link per pagare con bonifico.
Una volta ricevuti i soldi, sito è completamente tuo."
```

---

## DOPO LA VIDEOCALL

```
1. Cliente riceve invoice €3.500
2. Cliente paga bonifico
3. Tu ricevi soldi
4. Sito è LIVE e proprietà del cliente
5. Cliente inizia a ricevere prenotazioni!
```

---

# ✅ CHECKLIST FINALE

## SETUP
```
☑ SendGrid account creato e API key copiata
☑ Google Calendar API key copiata
☑ Firebase (opzionale) configurato
☑ Credenziali mandate al tecnico
```

## TEST
```
☑ Homepage carica perfettamente
☑ Booking flow 5-step completo
☑ Email di conferma ricevuta
☑ Google Calendar sync ok
☑ Accedi Prenotazioni funziona
☑ Admin panel funziona
☑ Mobile responsive
☑ Tutti i link funzionano
```

## DEPLOY
```
☑ Repository su GitHub creato
☑ Codice pushato
☑ Vercel deployment completato
☑ Variabili di ambiente configurate
☑ Sito online e accessibile
```

## CRON JOB
```
☑ EasyCron account creato
☑ Cron job configurato
☑ Test manuale ok
☑ Reminder email funziona
```

## VIDEOCALL
```
☑ Sito testato completamente
☑ Demo booking fatto
☑ Demo email fatto
☑ Demo Google Calendar fatto
☑ Demo accedi prenotazioni fatto
☑ Demo admin panel fatto
☑ Cliente capisce tutto
☑ Cliente accetta prezzo €3.500
```

## FINALE
```
☑ Invoice mandate
☑ Bonifico ricevuto
☑ Sito completamente del cliente
☑ Supporto per 1 anno incluso
☑ Documentazione mandate
```

---

# 🎉 FINE GUIDA

**Il sito è PRONTO per lanciare!**

Segui la guida step by step e avrai:

✅ Un sito dentistico professionale  
✅ Sistema di prenotazione automatico  
✅ Email di conferma e reminder  
✅ Integrazione Google Calendar  
✅ Admin panel completo  
✅ Accedi Prenotazioni per i clienti  
✅ Completamente online e live  

**Ricorda:**
- Cliente è proprietario di TUTTO
- Niente vendor lock-in
- Zero costi mensili
- Supporto per 1 anno

**BUON LAVORO!** 🚀

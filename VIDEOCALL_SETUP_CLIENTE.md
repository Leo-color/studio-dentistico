# 🎬 VIDEOCALL - Setup Account (30 minuti)

**Guida per il cliente durante la videochiamata**

---

## ⚖️ ACCORDO AWS - Cosa Devi Sapere

Prima di creare l'account, ecco cosa dice il contratto AWS in modo semplice:

### GRATIS (Sempre)
```
✅ Tier Free: 1.000 SMS/mese GRATIS (non scade)
✅ 1GB storage gratis (non scade)
✅ $200/mese credito Google Maps (non scade)
✅ Supporto email gratuito
```

### DOPO 6 MESI (se superi i limiti)
```
⚠️ Crediti gratis $100 finiscono
⚠️ Se superi 1.000 SMS/mese: paghi solo quello in più
⚠️ Esempio: 1.500 SMS = paghi solo 500 SMS extra
```

### IMPORTANTE
```
✅ Nessun costo nascosto
✅ Nessun canone mensile obbligatorio
✅ Paghi SOLO quello che usi (pay-as-you-go)
✅ Se dimentichi account: si chiude, niente debito
✅ Puoi cambiare metodo di pagamento quando vuoi
```

### TI CONSIGLIO
```
1. Usa lo Tier Free (1.000 SMS/mese gratis)
2. Se cresci, paghi solo l'eccedenza
3. Non avrai mai sorprese
4. Se non cresci: €0 FOREVER
```

**SEMPLICE: Crei account, non paghi se rimani dentro i limiti gratis!** ✅

---

---

## 🎯 COSA INCLUDE IL SITO

```
✅ Homepage professionale con 5 sezioni
✅ Booking system 5-step (Servizio → Data → Orario → Dati → Conferma)
✅ Email di conferma prenotazione (SendGrid)
✅ Reminder via email 24h prima (SendGrid)
✅ Sincronizzazione Google Calendar automatica
✅ Admin panel per gestire appuntamenti
✅ Accedi alle tue Prenotazioni (nome + cognome)
✅ Modifica/Cancella prenotazione
✅ Mobile optimized
✅ Design professionale - €3.000+
```

---

# ⏱️ TIMELINE

```
Min 0-5: Spiegazione
Min 5-15: Tu crei SendGrid
Min 15-25: Tu crei AWS SNS (opzionale)
Min 25-28: Tu crei Google Cloud (Calendar API)
Min 28-30: Verifica e fine
```

---

# 📧 PASSO 1: SENDGRID (Email) - 10 minuti

## Tu dici al cliente:

"Adesso creiamo gli account. Non è difficile, ti guido io passo per passo.

**APRI COMPUTER e seguimi:**"

### Cliente fa QUESTI step:

1. **Apri browser → vai: https://sendgrid.com/**

2. **Click [Sign Up]** (in alto a destra, blu)

3. **Compila il form:**
   ```
   Email: info@[TUOstudio].it (o email dello studio)
   Password: qualcosa di sicuro
   First Name: [NOME DENTISTA]
   Last Name: [COGNOME]
   ```

4. **Click [Create Account]**

5. **Controlla email → click link di verifica**

6. **Entra in dashboard SendGrid**

7. **Left menu → Settings (⚙️)**

8. **Clicca [API Keys]**

9. **Click [Create API Key]**
   ```
   Name: "Studio [Nome]"
   Permissions: Full Access
   ```

10. **Click [Create & Copy]**

11. **COPIA LA CHIAVE** (inizia con `SG.`)
    ```
    Esempio: SG.7hJ9kL2mN4pQ6rS8tU0vW2xY4zAbCdEfG
    ```

12. **MANDI AL TUO TECNICO:** "Ecco API key SendGrid"
    
    **CHIAVE: ________________**

---

# 📧 PASSO 2: REMINDER EMAIL (Opzionale) - 5 minuti

## Tu dici al cliente:

"Adesso configuro i reminder automatici. I clienti riceveranno email 24h prima della visita. Funziona sempre, anche quando il sito è chiuso!"

### Come funziona:

```
1. Cliente prenota → riceve email di conferma (SendGrid)
2. Dopo 24 ore → riceve email di reminder
3. Tutto automatico, niente da fare
```

### IMPORTANTE - Spiegazione cliente:

```
"Il reminder email viene inviato automaticamente da un server che gira 24/7.
Non dipende dal tuo sito web, quindi funziona sempre.
Come Gmail che ti manda email di promemoria - sempre acceso!"
```

### Tu fai (tecnico):

```
1. Creo API su Vercel (gratis, il sito è già lì)
2. Configuro cron job (controlla ogni ora)
3. Quando è ora, invia email via SendGrid
4. Niente che deve fare il cliente!
```

**NO AZIONE CLIENT NECESSARIA** ✅

---

# 🔥 PASSO 3: GOOGLE CALENDAR API - 5 minuti

## Tu dici al cliente:

"Perfetto! Adesso Google Calendar - gli appuntamenti compariranno automaticamente nel tuo calendario!"

### Cliente fa QUESTI step:

1. **Apri: https://console.cloud.google.com/**

2. **Accedi con TUO GMAIL**

3. **Click [Crea Progetto]** (blu in alto)

4. **Nome: "Studio [Nome Dentista]"**

5. **Click [Crea]** (attendi 10 secondi)

6. **Nella search bar → scrivi: "Calendar API"**

7. **Click [Google Calendar API]**

8. **Click [ABILITA]**

9. **Left menu → [Credenziali]**

10. **Click [Crea credenziali] → [Chiave API]**

11. **Vedrai:** `AIzaSyD...` (la API key)

12. **COPIA E MANDI AL TECNICO**

---

## BONUS: Reminder Email Automatico 24h Prima

Tu dici al cliente:

"Bonus speciale: i clienti riceveranno automaticamente una email di promemoria 24h prima della visita. Non devi fare nulla, è tutto automatico!"

### Come funziona:

```
1. Cliente prenota → riceve email di conferma
2. Dopo 24h → riceve email di reminder
3. Tutto gestito da un server che gira 24/7
```

### Setup (tu fai):

```
1. Crea account EasyCron (gratis): https://www.easycron.com
2. Configura cron job che chiama ogni ora:
   
   URL: https://tuodominio.it/api/send-reminders
   
   POST Data:
   {
     "prenotazioni": [],
     "studioInfo": {
       "nome": "Studio [Nome]",
       "email": "info@studiodentistico.it",
       "telefono": "+39 02 1234567",
       "indirizzo": "Via Roma 123, Milano"
     }
   }
```

### Cliente non deve fare nulla! ✅

---

## Tu dici (tecnico):

"Perfetto! Ho la API key. Adesso genero il link di autorizzazione per il tuo calendario..."

### Cliente fa:

1. **Tu gli mandi un link di autorizzazione**

2. **Cliente clicca link → "Accedi con Google"**

3. **Autentica → permette accesso al calendario**

4. **OK! Appuntamenti sincronizzati automaticamente** ✅

### MANDI AL TECNICO:

```
Google Calendar API Key: ________________
```

---

# 📅 PASSO 4: FIREBASE (Database - Opzionale) - 5 minuti

## Tu dici al cliente:

"Opzionale: Firebase per backup dei dati nel cloud."

### SE VUOLE FIREBASE:

1. **Apri: https://console.firebase.google.com/**

2. **Click [Crea un progetto]**

3. **Nome: "Studio [Nome]"**

4. **Click [Continua]**

5. **Disabilita Analytics** (toggle OFF)

6. **Click [Crea progetto]**

7. **Quando finito → [Project Settings]**

8. **Scorri a "Le tue app" → Click [</> Web]**

9. **Nickname: "Studio Sito"**

10. **VEDRAI CODICE firebase:**
    ```
    apiKey: AIzaSyD...
    authDomain: studio-xxxxx.firebaseapp.com
    projectId: studio-xxxxx
    storageBucket: studio-xxxxx.appspot.com
    messagingSenderId: 123456789012
    appId: 1:123456789012:web:abc123
    ```

11. **MANDI AL TECNICO** (opzionale)

---

# ✅ PASSO 5: Verifica Finale - 10 minuti

## Tu dici al cliente:

"Perfetto! Abbiamo finito setup. Adesso verifichiamo che tutto funziona!"

### Tu fai (tecnico):

1. **Ricevi tutte le credenziali da cliente**

2. **Metti le API key nel sito (environment variables)**

3. **Accendi il sito live**

4. **Fai una PRENOTAZIONE TEST con cliente:**
   ```
   Nome: [Nome Cliente]
   Email: [Email cliente reale]
   Data: Domani
   Orario: 10:00
   Servizio: [Uno a scelta]
   ```

5. **Controlla con cliente (live durante la videocall):**

   ✅ **Email di conferma arrivata?**
   - Cliente controlla inbox
   - Mostra a te l'email ricevuta

   ✅ **Prenotazione in Google Calendar?**
   - Apri Google Calendar
   - Vedi evento con data, orario, nome paziente

   ✅ **Admin panel funziona?**
   - Accedi a password (mostri al cliente)
   - Vedi la prenotazione test
   - Puoi modificarla/cancellarla

   ✅ **Cliente può accedere alle sue prenotazioni?**
   - Clicca "Accedi Prenotazioni" (nel navbar)
   - Inserisce nome + cognome
   - Vede la sua prenotazione test
   - Può modificarla o cancellarla

6. **Se TUTTO OK:**
   ```
   "Fantastico! Sito è perfetto. Adesso lo metto online 
    sul tuo dominio e tra 1 ora è live!"
   ```

---

# 📋 CHECKLIST FINALE

Chiedi al cliente se ha completato TUTTO:

```
SETUP ACCOUNT:
☑ SendGrid account creato e API key copiata
☑ Google Calendar API key copiata
☑ Firebase (opzionale) - credenziali copiate
☑ Ha mandato TUTTO al tecnico

FUNZIONALITÀ VERIFICATE:
☑ Homepage carica correttamente
☑ Booking flow 5-step funziona
☑ Email di conferma prenotazione ricevuta
☑ Prenotazione vedi in Google Calendar
☑ Prenotazione visibile in admin panel
☑ Accedi Prenotazioni funziona (nome + cognome)
☑ Può modificare/cancellare prenotazione
☑ Reminder email arriva dopo 24h (oppure subito se test)
☑ Mobile responsivo (mobile ok, tablet ok)
☑ Design professionale - €3.000+
```

---

# 💡 IMPORTANTE

**Ricorda al cliente:**

```
"Tutti questi account sono TUOI.
Non sono miei, sono TUOI.

Se domani cambi tecnico, il sito continua.
I dati sono nel TUO Firebase.
Le email sono dalla TUA SendGrid.
I messaggi SMS sono dal TUO AWS SNS.
Il calendario è il TUO Google Calendar.

Sei totalmente proprietario di tutto.
Non dipendi da nessuno.
Niente vendor lock-in."
```

---

# 💰 COSTO TOTALE

```
Sito dentistico completo:     €3.500 (una tantum)

Include:
- Homepage professionale
- Booking system 5-step
- Email di conferma + reminder
- Google Calendar sync
- Admin panel
- Accedi Prenotazioni
- Mobile optimized
- 1 anno supporto incluso

Costi mensili: €0 (zero!)
- SendGrid: gratis fino a 100 email/mese
- Google Calendar: gratis
- Firebase: gratis plan (opzionale)
- Hosting: Vercel gratis (incluso nel pacchetto)
```

---

# 🎉 FINE VIDEOCALL

Tu dici al cliente:

```
"Perfetto! Abbiamo finito il setup. Sito è testato e funziona 100%.

Adesso lo metto online sul tuo dominio (studiodentistico.it).
Tra 1-2 ore è live e tutti i tuoi clienti possono prenotare.

Per il lavoro: €3.500, una tantum, niente abbonamenti.

Ti mando link per pagare con bonifico.
Una volta ricevuti i soldi, sito è completamente tuo."
```

### PROCESSO FINALE:

```
1️⃣ Cliente riceve invoice
2️⃣ Cliente paga bonifico (€3.500)
3️⃣ Tu ricevi soldi
4️⃣ Tu deployi sito su dominio cliente (studiodentistico.it)
5️⃣ Sito ONLINE ✅

Fatto! Il cliente può subito iniziare a prendere prenotazioni.
```

---

# ✅ CONSEGNA FINALE

Tu dai al cliente QUESTI accessi:

```
📱 Link sito: https://studiodentistico.it
👨‍💼 Login Admin: https://studiodentistico.it/admin
   Username: admin
   Password: [password che hai creato]

📧 SendGrid: https://app.sendgrid.com (email loro)
📅 Google Calendar: https://calendar.google.com
⚙️ Google Cloud: https://console.cloud.google.com (controllo API)

📝 Manuale completo: [documento PDF con istruzioni]
📞 Supporto: [tuo numero/email per 1 anno]
```

---

**Fine! Tutto fatto.** 🚀

**Il cliente è PROPRETARIO di tutto:**
```
✅ Dominio: suo
✅ SendGrid account: suo
✅ Google Calendar: suo
✅ Dati prenotazioni: suoi (su Firebase)
✅ Niente vendor lock-in

Se cambia tecnico domani: tutto continua a funzionare!
```

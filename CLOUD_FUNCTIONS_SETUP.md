# Firebase Cloud Functions Setup

## Problema Risolto
✅ **CORS Error bloccato** - Le email vengono ora inviate tramite Cloud Functions (lato server) invece che direttamente da SendGrid (client-side)

## Installazione

### 1. Installa dipendenze delle Cloud Functions
```bash
cd functions
npm install
```

### 2. Configura SendGrid API Key
Modifica `functions/.env`:
```
SENDGRID_API_KEY=SG.your_actual_key_here
```

### 3. Deploy delle Cloud Functions

#### Opzione A: Deploy Locale (per testing)
```bash
firebase emulators:start --only functions
```
- Accedi a: http://localhost:5001/studio-dentistico-f34c4/us-central1

#### Opzione B: Deploy su Firebase (Produzione)
```bash
firebase deploy --only functions
```

## Variabili di Ambiente

### Client (.env.local)
```
REACT_APP_FUNCTIONS_URL=http://localhost:5001/studio-dentistico-f34c4/us-central1
```

### Server (functions/.env)
```
SENDGRID_API_KEY=SG.xxxxx
```

## Cloud Functions Disponibili

### 1. sendConfirmationEmail
- **Scopo**: Invia email di conferma al cliente
- **Trigger**: Dopo conferma prenotazione
- **URL**: `/sendConfirmationEmail`

### 2. sendAdminNotificationEmail
- **Scopo**: Notifica al dentista di nuova prenotazione
- **Trigger**: Dopo conferma prenotazione
- **URL**: `/sendAdminNotificationEmail`

### 3. sendAdminCodeEmail
- **Scopo**: Invia codice di accesso admin
- **Trigger**: Richiesta reset password
- **URL**: `/sendAdminCodeEmail`
- **QUESTO RISOLVE IL TUO ERRORE CORS**

### 4. sendContactMessageEmail
- **Scopo**: Invia messaggio dal form contatti
- **Trigger**: Submit form contatti
- **URL**: `/sendContactMessageEmail`

### 5. sendReminderEmail
- **Scopo**: Promemoria visita (24h prima)
- **Trigger**: Scheduled (da implementare)
- **URL**: `/sendReminderEmail`

## Vantaggi di Questa Soluzione

✅ **No CORS Issues** - Tutte le richieste avvengono server-to-server
✅ **Secure** - SendGrid API key non esposto nel client
✅ **Scalabile** - Cloud Functions auto-scaling
✅ **Serverless** - Zero infrastruttura da gestire
✅ **Integrato** - Funziona nativamente con Firebase

## Testing Locale

Per testare le Cloud Functions in locale:

```bash
# Terminal 1: Emulatore Firebase
firebase emulators:start --only functions

# Terminal 2: App React (in un'altra cartella)
npm start
```

Usa `REACT_APP_FUNCTIONS_URL=http://localhost:5001/studio-dentistico-f34c4/us-central1` nel .env.local

## Troubleshooting

### Errore: "Cannot find module '@sendgrid/mail'"
```bash
cd functions
npm install @sendgrid/mail
```

### Errore: "SENDGRID_API_KEY is not defined"
- Assicurati che `functions/.env` contenga la API key
- Riavvia l'emulatore Firebase

### Errore: "Timeout in Cloud Function"
- Aumenta il timeout: vedi `functions/index.js` (predefinito: 60s)

## Deployment su Vercel

Se usi Vercel per il deploy dell'app:

1. Aggiungi variabili d'ambiente su Vercel Dashboard:
```
REACT_APP_FUNCTIONS_URL=https://us-central1-studio-dentistico-f34c4.cloudfunctions.net
```

2. Deploy Cloud Functions su Firebase:
```bash
firebase deploy --only functions
```

3. L'app React su Vercel chiamerà le Cloud Functions su Firebase

## Logs

Visualizza i log delle Cloud Functions:
```bash
firebase functions:log
```

O in Vercel/Deployment logs per l'app React.

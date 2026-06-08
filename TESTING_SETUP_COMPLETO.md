# 🧪 TESTING SETUP COMPLETO - Cosa Collegare e Come Testare

**Guida passo-per-passo per testare il sito PRIMA di consegnare al cliente**

---

## 📋 COSA DEVI COLLEGARE PER TEST

```
ESSENZIALE (devi fare PRIMA di test):
☑ SendGrid (Email) - CRITICO
☑ Google Maps (Mappa) - CRITICO
☑ Dominio (Nameserver) - OPZIONALE ma raccomandato

OPZIONALE (puoi fare DOPO):
☐ Twilio (SMS) - Non critico (bisogna aspettare 24h)
☐ Google Calendar - Non critico
☐ Firebase - Non critico (localStorage funziona)
```

---

## 🚀 ORDINE DI TEST (45 MINUTI)

```
1. Setup SendGrid (10 min)
2. Setup Google Maps (5 min)
3. Test Booking Flow (15 min)
4. Test Admin Panel (10 min)
5. Test Mobile (5 min)
TOTALE: 45 minuti
```

---

# PASSO 1: SETUP SENDGRID (10 MINUTI)

## Cosa fare:

### STEP 1: Vai SendGrid

```
1. Vai https://sendgrid.com/
2. Click [Sign Up]
3. Iscriviti (email test, password qualsiasi)
4. Verifica email
```

### STEP 2: Genera API Key

```
1. Dashboard SendGrid
2. Left menu → Settings → API Keys
3. Click [Create API Key]
4. Name: "Test Studio"
5. Permissions: Full Access
6. Click [Create & Copy]
7. COPIA CHIAVE (tipo: SG.xxx...)
```

### STEP 3: Aggiungi a .env.local

File: `C:\Users\Utente\Desktop\app medico\.env.local`

```env
REACT_APP_SENDGRID_API_KEY=SG.xxx...
```

Salva file.

### STEP 4: Riavvia npm

```bash
npm start
```

Attendi che ricarichi...

---

# PASSO 2: SETUP GOOGLE MAPS (5 MINUTI)

## Cosa fare:

### STEP 1: Vai Google Console

```
1. Vai https://console.developers.google.com/
2. Crea progetto: "Studio Test"
3. Search "Maps JavaScript API"
4. Click risultato
5. Click [ENABLE]
```

### STEP 2: Genera API Key

```
1. Left menu → Credentials
2. Click [Create Credentials]
3. Scegli [API Key]
4. COPIA KEY (tipo: AIzaSy...)
```

### STEP 3: Aggiungi a .env.local

```env
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSy...
```

Salva file, riavvia `npm start`.

---

# PASSO 3: TEST BOOKING FLOW (15 MINUTI)

## Test Completo della Prenotazione (5 Step)

### STEP 1: Home Page

```
1. Apri http://localhost:3000
2. Vedi hero section
3. Vedi "Perché sceglierci" con card
4. Vedi servizi in griglia
5. Vedi footer con mappa
6. ✅ SE tutto visibile → HOME OK
```

### STEP 2: Prenota - Step 1 (Servizio)

```
1. Click "Prenota" button
2. VAI: http://localhost:3000/prenotazioni
3. Vedi dropdown "Quale servizio?"
4. Click dropdown
5. Seleziona "Pulizia Dentale"
6. Vedi riepilogo blu
7. Click "Avanti →"
8. ✅ SE tutto funziona → STEP 1 OK
```

### STEP 3: Prenota - Step 2 (Data)

```
1. Vedi calendario React Calendar
2. Clicca DATA FUTURA (es: 15 giorni da oggi)
3. ✅ Domenica è GRIGIA (disabilitata)
4. ✅ Giorni passati sono GRIGI
5. Seleziona data valida
6. Vedi riepilogo data
7. Click "Avanti →"
8. ✅ SE tutto OK → STEP 2 OK
```

### STEP 4: Prenota - Step 3 (Orario)

```
1. Vedi "Mattina (09:00 - 13:00)"
2. Vedi "Pomeriggio (14:30 - 19:00)"
3. Vedi "Studio chiuso 13:00 - 14:30"
4. ✅ NIENTE EMOJI
5. Clicca orario (es: 10:00)
6. Vedi orario diventare blu scuro
7. Click "Avanti →"
8. ✅ SE tutto OK → STEP 3 OK
```

### STEP 5: Prenota - Step 4 (Dati)

```
1. Compila form:
   Nome: Mario Rossi
   Email: mario@gmail.com
   Telefono: 3331234567
   Nuovo paziente: Sì
   Note: Test prenotazione
2. Clicca checkbox "Ho letto privacy policy"
3. Click "Avanti →"

Validazioni da testare:
☑ Nome < 3 caratteri → Errore
☑ Email invalida (es: mario) → Errore
☑ Telefono < 10 cifre → Errore
☑ Privacy NON checked → Errore

✅ SE tutto validato → STEP 4 OK
```

### STEP 6: Prenota - Step 5 (Conferma)

```
1. Vedi riepilogo:
   - Data selezionata
   - Orario
   - Servizio
   - Nome, Email, Telefono
2. Click [CONFERMA PRENOTAZIONE]
3. Appare modal "Sei sicuro?"
4. Click "Conferma" nel modal
5. ✅ Reindirizzamento a /prenotazione-confermata/[ID]
6. ✅ Pagina di successo visibile
7. ✅ Numero prenotazione visibile
```

### STEP 7: Test Email

```
1. Dopo prenotazione
2. Controlla inbox mario@gmail.com
3. ✅ Arriva email "Prenotazione Confermata"
4. ✅ Email contiene:
   - Numero prenotazione (PRE-XXXX-XXXX)
   - Data e orario
   - Servizio (Pulizia Dentale)
   - Prezzo (€50)
   - Indirizzo studio
   - Link "Annulla Prenotazione"

SE EMAIL NON ARRIVA:
→ Controlla .env.local ha API key SendGrid
→ Riavvia npm start
→ Controlla SPAM folder
→ Console browser (F12) mostra errore?
```

---

# PASSO 4: TEST ADMIN PANEL (10 MINUTI)

### STEP 1: Login Admin

```
1. Vai http://localhost:3000/admin
2. Compila:
   Username: dentista
   Password: 1234
3. Click [ACCEDI]
4. ✅ Entra in /admin/dashboard
5. ✅ Vedi stat card (Visite, Pazienti, Ricavi)
6. ✅ Vedi la prenotazione di test in lista
```

### STEP 2: Dashboard

```
1. Vedi 4 stat card:
   - 01 Visite Oggi
   - 02 Pazienti Totali
   - 03 Prossima Visita
   - 04 Ricavi Mese
2. Vedi menu rapido (A, B, C, D)
3. Vedi prenotazioni di oggi
4. ✅ NIENTE EMOJI nei titoli/bottoni
```

### STEP 3: Gestisci Prenotazioni

```
1. Click "Gestisci Prenotazioni" (Menu B)
2. Vedi lista prenotazioni
3. Vedi filtri (Tutte / Sospese / Confermate)
4. Seleziona filtro "Tutte"
5. ✅ Vedi la tua prenotazione test
6. Vedi bottoni:
   - Chiama (link tel)
   - Email (link mailto)
7. Click "Esporta CSV"
8. ✅ Scarica file CSV
```

### STEP 4: Modifica Servizi

```
1. Click "Modifica Servizi" (Menu D)
2. Vedi lista servizi (Pulizia, Visita, ecc)
3. Click "Modifica" su un servizio
4. Cambia prezzo da 50 a 55
5. Click "Salva"
6. ✅ Vedi toast "Servizio aggiornato"
7. Vedi prezzo aggiornato
```

### STEP 5: Modifica Orari

```
1. Click "Modifica Orari" (Menu A)
2. Espandi "Lunedì"
3. Vedi toggle "Studio Aperto"
4. Vedi input orari
5. Modifica orario: da 09:00 a 08:00
6. Click "Salva Orari"
7. ✅ Vedi toast "Orari aggiornati"
```

### STEP 6: Cambiar Password

```
1. Click menu (tre linee in mobile) o "Impostazioni"
2. Vai admin/impostazioni
3. Click "Cambia Password"
4. Compila:
   Password attuale: 1234
   Nuova password: Test2024
   Conferma: Test2024
5. Click "Salva Nuova Password"
6. ✅ Vedi toast "Password cambiata"
7. Logout
8. Login con nuova password
9. ✅ Entra correttamente
```

---

# PASSO 5: TEST MOBILE (5 MINUTI)

### STEP 1: Apri DevTools

```
1. Premi F12 (DevTools)
2. Click device icon (in alto a sx)
3. Seleziona "iPhone 12"
```

### STEP 2: Testa Home

```
☑ Logo visibile
☑ Menu burger (non orizzontale)
☑ Bottoni grandi (tap-friendly)
☑ Testo non tagliato
☑ Immagini responsive
☑ Mappa visibile
```

### STEP 3: Testa Prenotazioni

```
☑ Calendario visibile
☑ Bottoni orari in 3 colonne
☑ Form input grandi
☑ Modali centrate
```

### STEP 4: Testa Admin

```
☑ Navbar compatta
☑ Menu hamburger
☑ Stat card stackate
☑ Tabelle scrollabili
```

---

# PASSO 6: DARK MODE

```
1. Home page
2. Click bottone "Scuro" (navbar)
3. ✅ Sfondo diventa scuro
4. ✅ Testo diventa chiaro
5. ✅ Leggibile in dark
6. Ricarica pagina F5
7. ✅ Tema persiste (localStorage OK)
```

---

# PASSO 7: PRIVACY POLICY

```
1. Vai http://localhost:3000/privacy
2. ✅ Pagina visibile
3. ✅ Testo privacy policy presente
4. ✅ Link in footer funziona
5. ✅ "Ho letto privacy policy" in booking
```

---

# ✅ CHECKLIST TEST FINALE

```
HOME PAGE:
☑ Hero section visibile
☑ Servizi in griglia
☑ Mappa Google Maps funzionante
☑ Footer presente
☑ Link funzionano

BOOKING (5 STEP):
☑ Step 1: Servizio selezionabile
☑ Step 2: Calendario funzionante (domenica disabilitata)
☑ Step 3: Orari validi (no slot occupati)
☑ Step 4: Validazioni email/telefono funzionano
☑ Step 5: Conferma funziona
☑ Redirect a pagina successo
☑ Email ricevuta in inbox

ADMIN PANEL:
☑ Login funziona (dentista / 1234)
☑ Dashboard mostra dati
☑ Prenotazioni visibili
☑ Filtri funzionano
☑ CSV export funziona
☑ Servizi CRUD funziona
☑ Orari CRUD funziona
☑ Password cambiabile
☑ Logout funziona

MOBILE:
☑ Responsive (iPhone 12)
☑ Testo leggibile
☑ Bottoni tap-friendly
☑ Menu hamburger funziona

DARK MODE:
☑ Toggle funziona
☑ Tema persiste (localStorage)

DESIGN:
☑ ZERO emoji
☑ Colori coerenti
☑ Font leggibile

SECURITY:
☑ Privacy policy presente
☑ Admin protetto (login required)
☑ Routes private funzionano
```

---

# 🎯 PROSSIMO PASSO

Se TUTTO passa:
```
✅ SITO È PRONTO PER TEST CON CLIENTE

Prossimo:
1. Configura Twilio (opzionale, può aspettare)
2. Configura Firebase (opzionale, localStorage funziona)
3. Prenota videocall con cliente
4. Durante videocall: cliente crea SendGrid/Twilio/Firebase
5. Tu deliveri sito finale
6. Ricevi €3.500 💰
```

Se QUALCOSA NON PASSA:
```
1. Nota il bug
2. Leggi error nella console (F12)
3. Contattami con:
   - Quale step fallisce
   - Error message
   - Screenshot
4. Fisso bug
5. Ritesti
```

---

**Ready to test? Start with PASSO 1: SendGrid!** 🚀

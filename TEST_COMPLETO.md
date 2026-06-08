# 🧪 TEST COMPLETO END-TO-END

**Tempo: 30 minuti**

Testa TUTTO il sito come se fossi un vero cliente.

---

## 🏠 TEST 1: HOME PAGE

```
URL: http://localhost:3000 (o https://tuodominio.it)

☑ Navbar carica (logo, menu, bottone Prenota)
☑ "Accedi Prenotazioni" visibile nel navbar
☑ Hero section visibile e attraente
☑ Sezione "Perché Scaglierci" con 3 card
☑ Sezione "Servizi" con 6 servizi
☑ Sezione "Testimonial" con 3 recensioni
☑ Sezione "Chi Siamo" con info studio
☑ Sezione "Contatti" con mappa e form
☑ Footer con info complete
☑ Design responsive (mobile, tablet, desktop)
☑ Niente emoji nel testo
☑ Tutto carica veloce
```

---

## 📱 TEST 2: BOOKING FLOW COMPLETO

### Step 1: Scegli Servizio
```
☑ Dropdown selezionabile
☑ Servizi mostrati correttamente
☑ Prezzo visible per ogni servizio
☑ Seleziona "Visita Dentale"
☑ Preview blu con prezzo €30
☑ Bottone "Avanti" abilitato
☑ Bottone "Indietro" funziona
```

### Step 2: Scegli Data
```
☑ Calendario carica (React Calendar)
☑ Puoi selezionare data
☑ Data selezionata evidenziata (giallo)
☑ Preview con data scritta
☑ Bottone "Avanti" abilitato
☑ Bottone "Indietro" torna a Step 1
```

### Step 3: Scegli Orario
```
☑ Mostra "Mattina (09:00-13:00)"
☑ Mostra "Pausa (13:00-14:30)"
☑ Mostra "Pomeriggio (14:30-19:00)"
☑ Puoi selezionare orario
☑ Orario selezionato evidenziato
☑ Preview con orario
☑ Bottone "Avanti" abilitato
```

### Step 4: Inserisci Dati
```
☑ Riepilogo blu (data, orario, servizio, prezzo)
☑ Campo "Nome Completo" (min 3 caratteri)
☑ Campo "Email" (validazione regex)
☑ Campo "Telefono" (10 cifre)
☑ Radio "Sei un nuovo paziente?" (Sì/No)
☑ Textarea "Note" (opzionale)
☑ Checkbox "Ho letto Privacy Policy" (OBBLIGATORIO)
☑ Se non accetti Privacy → errore "Devi accettare..."
☑ Privacy Policy link è cliccabile (apre modal)
☑ Bottone "Avanti" abilitato solo se accetti Privacy
```

### Step 5: Conferma
```
☑ Modal "Conferma Prenotazione"
☑ Mostra data, orario correttamente
☑ Bottone "Conferma" verde
☑ Bottone "Annulla" grigio
☑ Click Conferma → naviga a pagina success
```

---

## ✅ TEST 3: PAGINA CONFERMA PRENOTAZIONE

```
URL: http://localhost:3000/prenotazione-confermata/PRE-2026-XXXX

☑ Heading verde "PRENOTAZIONE CONFERMATA!"
☑ Icona ✅ (check verde)
☑ Riepilogo dettagli (data, orario, servizio, prezzo)
☑ Dati paziente (nome, email, telefono)
☑ "Email di conferma inviata a: [email]"
☑ Bottone "Contatta su WhatsApp" (opzionale)
☑ Bottone "Chiama Studio" 
☑ Bottone "Torna alla Home"
☑ Sezione "Informazioni Importanti" con 4 bullet
```

---

## 📧 TEST 4: EMAIL DI CONFERMA

```
☑ Ricevi email in inbox (check spam se no)
☑ Email from: "Studio Dentistico" <sendgrid_email>
☑ Subject: "Prenotazione Confermata - Studio Dentistico Dr. Rossi"
☑ Email contiene:
   - Heading "Prenotazione Confermata"
   - "Caro [Nome],"
   - Dettagli prenotazione (data, orario, servizio, prezzo)
   - Info studio (indirizzo, telefono, email)
   - "Ricorda: Presentati 5 minuti prima"
   - Link per annullare (http://localhost:3000/annulla-prenotazione?id=...)
☑ Email ben formattata e leggibile
☑ Stile professionale con colori blu
```

---

## 📅 TEST 5: GOOGLE CALENDAR SYNC

```
1. Apri: https://calendar.google.com
2. Login con tuo Gmail

☑ Vedi evento nuovo creato
☑ Titolo evento: "Visita Dentale"
☑ Data corretta (quella che hai scelto)
☑ Orario corretto (es: 11:00-11:20)
☑ Descrizione con nome paziente
☑ Puoi cliccare evento e vedere dettagli
☑ Evento cancellabile da Calendar
```

---

## 🔐 TEST 6: ACCEDI ALLE TUE PRENOTAZIONI

```
1. Click link "Accedi Prenotazioni" in navbar
2. URL: http://localhost:3000/mie-prenotazioni

☑ Form con campo "Nome" e "Cognome"
☑ Bottone "Cerca Prenotazioni"
☑ Inserisci nome e cognome della prenotazione
☑ Click Cerca → mostra la prenotazione
☑ Vedi: data, orario, servizio, prezzo, dati paziente
☑ Bottone "Cancella Prenotazione" (rosso)
☑ Bottone "Torna alla Home" (grigio)
☑ Click Cancella → modal "Sei sicuro?"
☑ Click "Sì, Cancella" → prenotazione eliminata
☑ Messaggio "Nessuna prenotazione trovata" se non esiste
```

---

## 👨‍💼 TEST 7: ADMIN PANEL

```
URL: http://localhost:3000/admin

☑ Login page carica
☑ Username: "admin"
☑ Password: (quella che hai configurato)
☑ Click Login → dashboard carica
☑ Vedi prenotazione che hai creato
☑ Puoi visualizzarla
☑ Puoi modificarla
☑ Puoi cancellarla
☑ Status prenotazione: "sospesa"
☑ Puoi cambiare stato
```

---

## 🧑‍💻 TEST 8: MOBILE RESPONSIVE

**Test su MOBILE (o resize browser a 375px width):**

```
☑ Navbar responsive (menu diventa hamburger)
☑ Home page leggibile su mobile
☑ Booking form fields ben spaziati
☑ Bottoni cliccabili (almeno 44px x 44px)
☑ Testo leggibile (non troppo piccolo)
☑ Immagini scalabili
☑ Niente overflow orizzontale
☑ Maps embedded responsive
```

---

## 🔗 TEST 9: LINK E NAVIGAZIONE

```
☑ Click "Home" navbar → torna al top della home
☑ Click "Servizi" navbar → scroll a sezione servizi
☑ Click "Chi Siamo" navbar → scroll a sezione chi siamo
☑ Click "Contatti" navbar → scroll a sezione contatti
☑ Click "Prenota" (bottone blu) → vai a /prenotazioni
☑ Click "Accedi Prenotazioni" → vai a /mie-prenotazioni
☑ Link Privacy Policy in footer → apre modal
☑ Tutti i link esterni (mailto, tel, WhatsApp) funzionano
```

---

## 📋 CHECKLIST FINALE

```
HOMEPAGE:
☑ Tutte 5 sezioni visibili
☑ Navbar con "Accedi Prenotazioni"
☑ Design professionale
☑ Mobile responsive

BOOKING:
☑ 5 step funzionano
☑ Validazione form ok
☑ Privacy Policy obbligatorio
☑ Conferma funziona

EMAIL:
☑ Email di conferma ricevuta
☑ Stile professionale
☑ Contiene tutti i dettagli

GOOGLE CALENDAR:
☑ Evento creato correttamente
☑ Data e orario corretti

ACCEDI PRENOTAZIONI:
☑ Ricerca per nome/cognome funziona
☑ Mostra prenotazione
☑ Puoi cancellare

ADMIN:
☑ Login funziona
☑ Vedi prenotazioni
☑ Puoi modificare/cancellare

MOBILE:
☑ Tutto responsive
☑ Leggibile su mobile
```

---

## 🎯 SE TUTTO OK

**Congratulazioni!** Il sito è pronto per il deploy! 🚀

Procedi con:
1. Push su GitHub
2. Deploy su Vercel
3. Configura dominio
4. Attiva cron job (EasyCron)
5. Videocall con cliente

**SE QUALCOSA NON FUNZIONA**

Nota quale test è fallito e fix:
- Errore in console? Controlla StudioContext.js
- Email non arriva? Verifica SendGrid API key
- Calendar non sincronizza? Verifica Google Calendar API

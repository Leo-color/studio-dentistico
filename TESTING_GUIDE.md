# 🧪 GUIDA COMPLETA TEST - Studio Dentistico

**Testa TUTTE le funzionalità prima di consegnare al cliente**

---

## ✅ CHECKLIST PRE-TEST

- [ ] Verifica `.env.local` ha tutte le API key
- [ ] Riavvia `npm start`
- [ ] Apri http://localhost:3000
- [ ] Console browser pulita (F12, niente errori rossi)

---

# 🧑‍💼 TEST 1: PRENOTAZIONE COMPLETA (5 Step)

## Step 1: Scegli Servizio
```
1. Vai http://localhost:3000/prenotazioni
2. Clicca dropdown "Quale servizio desideri?"
3. Seleziona "Pulizia Dentale" (€50, 30 min)
4. Dovrebbe apparire riepilogo blu
5. Click "Avanti →"
✅ PASSA
```

## Step 2: Scegli Data
```
1. Calendario dovrebbe aprirsi
2. Clicca DATA FUTURA (es: 10 giugno 2026)
3. ✅ Data non può essere passata
4. ✅ Domenica disabilitata (grigia)
5. Click "Avanti →"
✅ PASSA
```

## Step 3: Scegli Orario
```
1. Vedrai "Mattina (09:00 - 13:00)"
2. Vedrai "Pomeriggio (14:30 - 19:00)"
3. ✅ Pause "Studio chiuso 13:00 - 14:30" visibile
4. Clicca orario (es: 10:00)
5. ✅ Dovrebbe diventare blu scuro
6. Click "Avanti →"
✅ PASSA
```

## Step 4: Dati Paziente
```
1. Compila:
   - Nome: Mario Rossi (minimo 3 caratteri)
   - Email: mario@gmail.com (email valida!)
   - Telefono: 3331234567 (10 cifre)
2. ✅ Errore se email invalida
3. ✅ Errore se telefono < 10 cifre
4. Check "Ho letto privacy policy"
5. Click "Avanti →"
✅ PASSA
```

## Step 5: Conferma Finale
```
1. Vedi riepilogo:
   - Data selezionata
   - Orario selezionato
   - Servizio (Pulizia Dentale)
   - Nome, Email, Telefono
2. Click "[OK] CONFERMA PRENOTAZIONE"
3. Appare modal "Confermi?"
4. Click "Conferma"
✅ PASSA se vai su pagina PrenotazioneConfermata
```

---

# 📧 TEST 2: EMAIL SendGrid

## Se Configurato:
```
1. Completa prenotazione (TEST 1)
2. Dovrebbe veder toast verde: "[OK] Email inviata!"
3. Controlla inbox email: mario@gmail.com
4. ✅ Arriva email entro 30 secondi con:
   - Numero prenotazione
   - Data e orario
   - Servizio (Pulizia Dentale)
   - Indirizzo studio
   - Prezzo (€50)
   - Link "Annulla Prenotazione"
✅ PASSA
```

## Se NON Configurato:
```
1. Completa prenotazione
2. Toast: "[INFO] Email non disponibile"
3. Prenotazione comunque creata ✅
4. ✅ Sistema resiliente
✅ PASSA
```

---

# 💬 TEST 3: SMS Twilio

## Se Configurato:
```
1. Completa prenotazione per DOMANI
   - Data: Domani
   - Orario: 10:00
   - Telefono REALE: +39333XXXXXXX
2. Console browser dovrebbe mostrare: "SMS reminder programmato..."
3. ✅ SMS arriva ESATTAMENTE 24h prima
   - Es: Prenotazione 10 giugno 10:00
   - SMS arriva 9 giugno 10:00
4. ✅ Testo SMS:
   "Ciao [NOME], ricordiamo la tua visita domani alle 10:00..."
✅ PASSA
```

## Se NON Configurato:
```
1. Completa prenotazione
2. Console: "Twilio non configurato"
3. Prenotazione crea comunque ✅
✅ PASSA
```

---

# 📅 TEST 4: Google Calendar

## Se Configurato:
```
1. Completa prenotazione
2. Apri Google Calendar (stessa email di .env)
3. ✅ Appare evento con:
   - Titolo: "Pulizia Dentale - Mario Rossi"
   - Data e ora corretta
   - Descrizione: email, telefono, note
   - Partecipanti: Paziente + Studio
✅ PASSA
```

## Se NON Configurato:
```
1. Completa prenotazione
2. Google Calendar non sincronizza
3. Prenotazione crea comunque ✅
✅ PASSA
```

---

# 🗺️ TEST 5: Google Maps

```
1. Vai http://localhost:3000/contatti
2. Scorri in basso → "Dove Siamo"
3. ✅ Mappa Google Maps visibile
4. ✅ Mostra posizione "Via Roma 123, Milano"
5. ✅ Zoom/drag funzionano
6. ✅ Pin rosso sulla location
✅ PASSA
```

---

# 🔐 TEST 6: Admin Panel

## Login
```
1. Vai http://localhost:3000/admin
2. Username: dentista
3. Password: 1234
4. Click "ACCEDI"
5. ✅ Entra in /admin/dashboard
✅ PASSA
```

## Dashboard
```
1. Vedi 4 stat card:
   - 01 Visite Oggi (numero)
   - 02 Pazienti Totali (numero)
   - 03 Prossima Visita (orario)
   - 04 Ricavi Mese (€)
2. ✅ Menu rapido con 4 link (A, B, C, D)
3. ✅ Prenotazioni di oggi sotto
✅ PASSA
```

## Prenotazioni
```
1. Click "Gestisci Prenotazioni" (menu B)
2. ✅ Lista di prenotazioni fatte
3. ✅ Filtri: Tutte / Sospese / Confermate
4. ✅ Ricerca per nome o email
5. ✅ Bottone "Esporta CSV"
6. Click "Esporta CSV"
7. ✅ Scarica file .csv con prenotazioni
✅ PASSA
```

## Servizi
```
1. Click "Modifica Servizi" (menu D)
2. ✅ Lista servizi esistenti
3. ✅ Aggiungi nuovo servizio:
   - Nome: "Tartarectomia"
   - Prezzo: 150
   - Durata: 60 min
   - Descrizione: "Rimozione tartaro"
4. Click "AGGIUNGI SERVIZIO"
5. ✅ Appare nella lista
6. Click "Modifica" su servizio
7. Cambia prezzo → 160
8. Click "Salva"
9. ✅ Prezzo aggiornato
✅ PASSA
```

## Orari
```
1. Click "Modifica Orari" (menu A)
2. ✅ Espandi "Lunedì"
3. ✅ Toggle "Studio Aperto"
4. ✅ Modifica orari apertura/chiusura
5. ✅ Modifica pausa pranzo
6. Click "Salva Orari"
7. ✅ Toast: "Orari aggiornati"
✅ PASSA
```

## Info Studio
```
1. Click "Modifica Contatti" (menu C)
2. ✅ Sezioni espandibili:
   - Informazioni Generali
   - Contatti
   - Informazioni Dottore
   - Social Media
3. Modifica nome: "Studio Dentistico Dr. Bianchi"
4. Click "Salva"
5. ✅ Vai su http://localhost:3000/ → vedrai nome aggiornato
✅ PASSA
```

## Impostazioni
```
1. Click profilo/menu → "Impostazioni"
2. ✅ Sezione "Cambia Password"
3. Password attuale: 1234
4. Nuova password: Password123
5. Conferma: Password123
6. Click "Salva Nuova Password"
7. ✅ Toast: "Password cambiata"
8. Logout
9. Login con nuova password
10. ✅ Entra correttamente
✅ PASSA
```

---

# 📱 TEST 7: Responsive Mobile

```
1. Apri sito: http://localhost:3000
2. Premi F12 (DevTools)
3. Click device mobile icon (in alto a sx)
4. Seleziona "iPhone 12"

HOME PAGE:
✅ Logo leggibile
✅ Menu burger (non menu orizzontale)
✅ Bottoni grandi (tap friendly)
✅ Testo non tagliato
✅ Immagini responsive

PRENOTAZIONI:
✅ Calendario visibile e usabile
✅ Bottoni orari in griglia 3 colonne
✅ Form input grandi
✅ Modali centrate

ADMIN:
✅ Navbar compatta
✅ Menu a hamburger
✅ Stat cards stackate verticalmente
✅ Tabelle scrollabili

✅ PASSA (prova anche tablet: iPad Air)
```

---

# 🌙 TEST 8: Dark Mode

```
1. Home page: http://localhost:3000
2. Clicca bottone "Scuro" (top navbar)
3. ✅ Sfondo diventa scuro
4. ✅ Testo diventa chiaro
5. ✅ Leggibile in dark
6. Clicca "Luce"
7. ✅ Torna chiaro
8. Ricarica pagina
9. ✅ Tema persiste (salvato in localStorage)
✅ PASSA
```

---

# 🔥 TEST 9: Firebase Database

## Se Configurato:
```
1. Completa prenotazione
2. Vai Firebase Console → Firestore Database
3. ✅ Collection "prenotazioni" creata
4. ✅ Documento con ID prenotazione
5. ✅ Contiene: nome, email, data, orario, servizio, prezzo
6. Fai altra prenotazione
7. ✅ Nuovo documento appare in real-time
8. Clicca documento → vedi tutti i dati
✅ PASSA
```

## Se NON Configurato:
```
1. Completa prenotazione
2. Dati salvati in localStorage ✅
3. Ricarica pagina
4. ✅ Prenotazione ancora presente
✅ PASSA
```

---

# ❌ TEST 10: Validazioni e Errori

## Email Non Valida
```
1. Vai prenotazioni step 4
2. Email: "mario123" (no @)
3. Click "Avanti"
4. ✅ Toast rosso: "[ERRORE] Email non valida"
5. Form non invia
✅ PASSA
```

## Telefono Non Valido
```
1. Prenotazioni step 4
2. Telefono: "123" (troppo corto)
3. Click "Avanti"
4. ✅ Toast rosso: "[ERRORE] Telefono non valido (10 cifre)"
✅ PASSA
```

## Nome Troppo Corto
```
1. Nome: "ab" (2 caratteri)
2. Click "Avanti"
3. ✅ Toast: "[ERRORE] Nome non valido (minimo 3 caratteri)"
✅ PASSA
```

## Privacy Non Accettata
```
1. Completa step 4
2. ✅ NON cliccare "Ho letto privacy policy"
3. Click "Avanti"
4. ✅ Toast: "[ERRORE] Devi accettare la privacy policy"
✅ PASSA
```

## Orario Occupato
```
1. Completa prima prenotazione:
   - Data: 10 giugno
   - Orario: 10:00
   - Servizio: Pulizia (30 min)
2. Fai SECONDA prenotazione:
   - Data: 10 giugno
   - Vedi orari disponibili
   - ✅ 10:00 GRIGIO (occupato)
   - ✅ 10:30 GRIGIO (occupato, sovrappone)
   - ✅ 10:45 DISPONIBILE (verde)
✅ PASSA
```

---

# 🎨 TEST 11: Design e UI

## Home Page
```
✅ Logo "Studio Dentistico" visibile
✅ Hero section con CTA
✅ Sezione "Perché sceglierci" con 3 card (01, 02, 03)
✅ Servizi in griglia
✅ Testimonials con ★ (stelle)
✅ CTA finale blu
```

## Pagine Pubbliche
```
✅ Navbar sticky (non scompare scrollando)
✅ Footer con contatti
✅ Link Privacy Policy funziona
✅ Colori coerenti (blu primario)
✅ Font leggibile (sans-serif)
✅ Spaziature equilibrate
```

## Niente Emoji
```
✅ NO emoji nei titoli
✅ NO emoji nei bottoni
✅ NO emoji nelle descrizioni
✅ Design professionale
```

---

# 📋 TEST 12: Privacy e Security

```
1. Vai http://localhost:3000/privacy
2. ✅ Testo privacy policy completo
3. ✅ GDPR compliance visibile
4. ✅ Link "Torna Home" funziona
5. ✅ Info come contattare per dati personali

Admin:
1. Login
2. ✅ URL /admin/dashboard protetto
3. Logout
4. ✅ Se vai /admin/dashboard → redirect a /admin
5. ✅ Password memorizzata in localStorage (hidden)
```

---

# 🚀 TEST 13: Performance

```
1. Apri DevTools (F12)
2. Tab "Network"
3. Reload pagina
4. ✅ Tutti i file caricano (no 404 errors)
5. ✅ Tempo caricamento < 3 secondi
6. ✅ Bundle JavaScript < 500KB

Console (F12):
✅ Zero errori rossi
✅ Zero warning gialli critici
```

---

# ✅ CHECKLIST FINALE DI TEST

```
BOOKING FLOW:
☑ Step 1-5 completi
☑ Validazioni funzionano
☑ Orari occupati bloccati
☑ Toast notifiche appaiono

INTEGRAZIONI:
☑ Email inviata (o graceful degradation)
☑ SMS schedulato (o graceful degradation)
☑ Google Calendar sincronizzato (o OK)
☑ Google Maps mostra mappa
☑ Firebase salva dati (o localStorage OK)

ADMIN PANEL:
☑ Login funziona
☑ Dashboard mostra dati corretti
☑ Prenotazioni CRUD (crea, leggi, aggiorna, elimina)
☑ Servizi CRUD
☑ Orari modificabili
☑ Info Studio modificabili
☑ Password cambiabile
☑ Logout funziona

RESPONSIVO:
☑ Desktop OK
☑ Tablet OK
☑ Mobile OK
☑ Dark mode funziona

DESIGN:
☑ Zero emoji
☑ Colori coerenti
☑ Font leggibile
☑ Niente errori 404

SECURITY:
☑ Privacy policy presente
☑ Admin protetto
☑ Password cambiabile
☑ Niente dati sensibili in console
```

---

# 🎯 TEST RAPIDO (5 MINUTI)

Se hai fretta, fai QUESTI test:

1. **Prenota** (completa 5 step) ✅
2. **Controlla email** ricevuta ✅
3. **Admin login** e vedi prenotazione ✅
4. **Mobile** test (F12 device) ✅
5. **Dark mode** toggle ✅

**Se questi 5 passano = PRONTO PER CONSEGNARE** 🚀

---

# 📞 CONTATTI DI SUPPORTO

Se qualcosa NON funziona:

1. Console browser (F12) → leggi errori
2. Controlla `.env.local` → tutte le API key?
3. Riavvia `npm start`
4. Cancella cache browser (CTRL+SHIFT+DEL)
5. Prova in incognito (ALT+CTRL+N)

**Errore persiste?**
- Screenshot dell'errore
- Copia del `.env.local` (senza chiavi sensibili)
- Che browser usi?

---

**🎉 Buon Testing! Pronto per consegnare!** 🚀

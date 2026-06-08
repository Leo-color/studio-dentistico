# 🚀 Guida Setup - Studio Dentistico Online

## ✅ Generazione Completata!

Tutto il codice è stato generato. Ecco come avviare il progetto:

## 📦 Step 1: Installa le Dipendenze

Apri il terminale (PowerShell) nella cartella `C:\Users\Utente\Desktop\app medico` e esegui:

```powershell
npm install
```

Questo installa tutte le librerie necessarie. **Attendere completamento (2-5 minuti).**

## 🎯 Step 2: Avvia in Sviluppo

Dopo l'installazione, esegui:

```powershell
npm start
```

L'app si aprirà automaticamente su **http://localhost:3000**

## 🔐 Step 3: Accedi all'Admin

1. Vai su http://localhost:3000/admin
2. **Username:** `dentista`
3. **Password:** `1234`

## 📊 Cosa Puoi Fare

### 🌍 Frontend Pubblico
- **Home** - Hero section + servizi + testimonial
- **Servizi** - Catalogo con prezzi
- **Prenota** - Sistema 5-step (servizio → data → orario → dati → conferma)
- **Chi Siamo** - Info studio e team
- **Contatti** - Form + mappa + social

### 🔧 Admin Panel
- **Dashboard** - Stats in tempo reale
- **Orari** - Modifica aperture, pause e ferie
- **Prenotazioni** - Vedi, conferma, elimina, aggiungi note
- **Contatti** - Modifica info studio
- **Servizi** - Crea, modifica, elimina servizi

## 📝 Funzionalità Principali

✅ **Prenotazione automatica** - Calcola slot disponibili in base alla durata  
✅ **Responsive design** - Perfetto su mobile, tablet, desktop  
✅ **Dark mode** - Toggle nella navbar  
✅ **Toast notifications** - Feedback istantaneo  
✅ **Modal dialogs** - Conferme azioni critiche  
✅ **Export CSV** - Scarica prenotazioni  
✅ **LocalStorage** - Dati persistono nel browser  
✅ **Validazione form** - Real-time feedback  

## 🎨 Dati di Default

Lo studio è pre-caricato con:
- **Nome:** Studio Dentistico Dr. Rossi
- **Indirizzo:** Via Roma 123, 20100 Milano
- **Telefono:** 02 1234567
- **Email:** info@studiodentistico.it
- **8 servizi** già configurati
- **Orari:** Lun-Ven 09-19 (pausa 13-14:30), Sab 10-13

Tutto modificabile dall'admin!

## 🚨 Cosa Fare Subito

1. **Personalizza i dati** - Vai in /admin/info-studio
2. **Testa prenotazioni** - Vai a /prenotazioni
3. **Prova il sistema** - Prenota come paziente
4. **Controlla admin** - Vedi la prenotazione nel pannello
5. **Modifica servizi** - Aggiungi/rimuovi servizi

## 📱 Accesso Rapido

- **Home:** http://localhost:3000/
- **Prenota:** http://localhost:3000/prenotazioni
- **Admin:** http://localhost:3000/admin
- **Dashboard:** http://localhost:3000/admin/dashboard

## 💾 Dati Salvati

Tutti i dati sono in localStorage del browser:
- `studio` - Info studio
- `servizi` - Catalogo
- `orari` - Aperture
- `ferie` - Chiusure
- `prenotazioni` - Booking
- `adminToken` - Sessione admin

**NON sono su server - backup locali se necessario!**

## 🔄 Build per Produzione

Quando pronto al lancio:

```powershell
npm run build
```

Crea una cartella `build/` pronta per il deploy.

## 📤 Deploy su Vercel (Gratis)

1. Installa Vercel CLI:
```powershell
npm install -g vercel
```

2. Deploy:
```powershell
vercel
```

3. Il sito sarà su `https://[nome-tuo].vercel.app`

## ❌ Se Qualcosa Non Funziona

1. Pulisci node_modules:
```powershell
rm -r node_modules
npm install
```

2. Cancella localStorage (da console):
```javascript
localStorage.clear()
location.reload()
```

3. Verifica Node version (deve essere 14+):
```powershell
node --version
```

## 🎓 Prossimi Passi

Dopo il setup iniziale, puoi:
- Aggiungere più servizi
- Modificare colori e font
- Aggiungere foto reali
- Configurare email reali (con backend)
- Aggiungere pagamenti (Stripe)
- Invitare team members
- Tradurre in altre lingue
- Integrare con Google Calendar

## 📞 Supporto

Se riscontri problemi:
1. Controlla che Node.js sia installato (`node --version`)
2. Assicurati di essere nella cartella corretta
3. Prova `npm install` di nuovo
4. Controlla la console del browser per errori (F12)

---

**Buona fortuna! 🚀 Il tuo sito dentistico è pronto!**

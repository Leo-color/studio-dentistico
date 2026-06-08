# Studio Dentistico - Sistema di Prenotazione Online

Sito dentistico completo con admin panel per la gestione delle prenotazioni. Costruito con React, Tailwind CSS e localStorage.

## 🌟 Caratteristiche

### Frontend Pubblico
- ✅ Home con hero section
- ✅ Pagina servizi
- ✅ Sistema di prenotazione a 5 step
- ✅ Pagina chi siamo
- ✅ Pagina contatti
- ✅ Design mobile-first responsive
- ✅ Dark mode
- ✅ SEO base

### Admin Panel
- ✅ Login (dentista/1234)
- ✅ Dashboard con statistiche
- ✅ Gestione orari di apertura e ferie
- ✅ Gestione prenotazioni
- ✅ Modifica dati studio
- ✅ Gestione servizi
- ✅ Export CSV prenotazioni
- ✅ Note private su prenotazioni
- ✅ Toast notifications
- ✅ Modal di conferma

## 🚀 Come Avviare

### Prerequisiti
- Node.js 14+ e npm

### Installazione
```bash
npm install
```

### Sviluppo
```bash
npm start
```
L'app sarà disponibile su http://localhost:3000

### Build per produzione
```bash
npm run build
```

## 📱 Accesso Admin

**URL:** http://localhost:3000/admin

**Credenziali di test:**
- Username: `dentista`
- Password: `1234`

## 📋 Struttura Progetto

```
src/
├── components/          # Componenti riutilizzabili
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Toast.jsx
│   └── Modal.jsx
├── pages/               # Pagine pubbliche
│   ├── Home.jsx
│   ├── Servizi.jsx
│   ├── Prenotazioni.jsx
│   ├── ChiSiamo.jsx
│   ├── Contatti.jsx
│   └── PrenotazioneConfermata.jsx
├── admin/               # Pannello amministrativo
│   ├── AdminLogin.jsx
│   ├── AdminDashboard.jsx
│   ├── AdminOrari.jsx
│   ├── AdminPrenotazioni.jsx
│   ├── AdminInfoStudio.jsx
│   ├── AdminServizi.jsx
│   └── PrivateRoute.jsx
├── context/             # Context API
│   └── StudioContext.js
├── App.jsx
├── index.jsx
└── index.css
```

## 🔧 Tecnologie

- **React** 18.2.0
- **React Router** 6.20.0
- **Tailwind CSS** 3.3.0
- **React Calendar** 4.2.1
- **localStorage** per la persistenza dati

## 💾 Dati

Tutti i dati (prenotazioni, servizi, orari, info studio) sono salvati in localStorage del browser.

### Struttura dati:
- `studio` - Informazioni dello studio
- `servizi` - Lista servizi
- `orari` - Orari di apertura
- `ferie` - Periodi di chiusura
- `prenotazioni` - Lista prenotazioni
- `adminToken` - Token di sessione admin

## 📅 Sistema di Prenotazione

Il sistema controlla automaticamente:
- Disponibilità dei slot in base alla durata del servizio
- Giorni chiusi
- Orari di pausa
- Sovrapposizione prenotazioni

## 🎨 Colori e Design

- **Primary Blue:** #1e40af
- **Cyan:** #0891b2
- **Green:** #10b981
- **Red:** #ef4444
- **Mobile-first:** Sviluppato per mobile, scalabile su desktop

## 📦 Deployment su Vercel

```bash
# Installare Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Il sito sarà live su `https://[nome].vercel.app`

## ✅ Features Implementate

- [x] Frontend pubblico responsive
- [x] Sistema prenotazione multi-step
- [x] Admin panel completo
- [x] Gestione orari e ferie
- [x] Gestione servizi
- [x] Statistiche e report
- [x] Toast notifications
- [x] Modal dialogs
- [x] Validazione form
- [x] Dark mode
- [x] Accessibilità base
- [x] SEO base
- [x] Export CSV

## 🔒 Sicurezza

- Username e password sono hardcoded per demo
- Per produzione, implementare backend con autenticazione reale
- Validazione form lato client
- Sanitizzazione input

## 📝 Note

- Dati cancellati da localStorage sono permanentemente persi
- Per backup, usare feature "Export CSV" o "Backup" (da implementare)
- Tutti i dati sono locali al browser

## 📞 Supporto

Per sviluppare il progetto ulteriormente:
1. Aggiungere backend (Node.js/Firebase/etc)
2. Implementare email reali
3. Aggiungere pagamenti
4. Multi-dentista per team
5. Calendario visivo avanzato
6. SMS reminders
7. Integrazione Google Calendar
8. Analytics

---

**Versione:** 1.0.0  
**Creato con ❤️ per studi dentistici**

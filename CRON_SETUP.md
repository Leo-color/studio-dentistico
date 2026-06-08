# 🔄 CRON JOB - Reminder Email Automatico

Il backend reminder email che abbiamo creato deve essere **chiamato ogni ora**.

Usiamo **EasyCron** (servizio gratuito) che chiama l'API automaticamente.

---

## 📋 SETUP (5 minuti)

### 1. Registrati a EasyCron

Vai: https://www.easycron.com/

**Click [Sign Up]** (se non hai account)

Compila:
```
Email: tuo_email@gmail.com
Password: qualcosa di sicuro
```

**Click [Create Account]**

---

### 2. Crea nuovo CRON JOB

1. **Login a EasyCron**

2. **Menu → [Cron Jobs]**

3. **Click [+ New Cron Job]**

4. **Compila il form:**

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

5. **Click [Create]**

---

## ✅ VERIFICA CHE FUNZIONA

1. **Torna alla lista cron jobs**

2. **Vedi il job creato**

3. **Click sull'icona "Run Now" (play)**

4. **Aspetta 5 secondi**

5. **Controlla le email ricevute**
   - Se il job funziona, vedrai "Status: Success" ✅

---

## 🔍 LOG E DEBUG

Se non funziona:

1. **EasyCron → Click sul job**

2. **Guarda "Execution Log"**

3. **Leggi l'errore**

4. **Soluzioni comuni:**

   ```
   ❌ "URL not reachable"
   → Verifica che il sito sia online su Vercel
   
   ❌ "Invalid JSON"
   → Controlla che il POST Data sia valido
   
   ❌ "401 Unauthorized"
   → L'API key SendGrid non è corretta
   ```

---

## 📝 COME FUNZIONA

```
Ore 09:00 → EasyCron chiama /api/send-reminders
            ↓
            Backend controlla prenotazioni
            ↓
            Trova chi ha visita domani (24h)
            ↓
            Invia email reminder via SendGrid
            ↓
            Segna come "reminderSent: true"

Ore 10:00 → Stesso processo
...
Ore 23:00 → Stesso processo
```

---

## 💡 NOTE IMPORTANTI

```
✅ Il cron job non dipende dal sito web
✅ Funziona anche se il sito è offline
✅ Funziona anche se nessuno è online
✅ Come Gmail che manda email quando vuoi
✅ Gratis con EasyCron
```

---

**Fine! Il reminder email è pronto.** 🚀

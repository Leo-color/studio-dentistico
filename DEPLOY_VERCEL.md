# 🚀 DEPLOY SU VERCEL - Guida Completa

**Tempo: 15 minuti**

---

## COSA SERVE

```
✅ Account GitHub (gratis)
✅ Account Vercel (gratis)
✅ Il sito su GitHub
✅ Le variabili di ambiente (.env)
```

---

## STEP 1: Crea Repository GitHub

### A. Installa Git (se non hai)

```bash
# Verifica se hai git
git --version

# Se non ce l'hai, scarica da: https://git-scm.com/download
```

### B. Vai nella cartella del progetto

```bash
cd C:\Users\Utente\Desktop\app medico
```

### C. Inizializza repository

```bash
git init
git add .
git commit -m "Sito dentistico completo - pronto per deploy"
```

### D. Crea repository su GitHub

1. **Vai: https://github.com/new**
2. **Repo name:** `dental-app` oppure `studio-dentistico`
3. **Public** (non private, così Vercel può accederci)
4. **Click [Create Repository]**

### E. Push il codice su GitHub

```bash
git remote add origin https://github.com/TUOUSERNAME/dental-app.git
git branch -M main
git push -u origin main
```

**Esempio reale:**
```bash
git remote add origin https://github.com/tuousername/dental-app.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy su Vercel

### 1. Vai a Vercel

https://vercel.com/

### 2. Click [Sign Up] (o accedi con GitHub)

### 3. Autorizza Vercel su GitHub
- Click [Continue with GitHub]
- Autorizza accesso

### 4. Importa progetto

- Click [Import Project]
- Incolla URL repository:
  ```
  https://github.com/TUOUSERNAME/dental-app.git
  ```

### 5. Configura progetto

```
Framework Preset: Create React App
Root Directory: ./
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

Vercel riconosce tutto automaticamente! ✅

---

## STEP 3: Variabili di Ambiente

### 1. Clicca [Environment Variables]

### 2. Aggiungi TUTTE le variabili:

```
REACT_APP_SENDGRID_API_KEY=SG.xxxxxxx...
REACT_APP_GOOGLE_CALENDAR_API_KEY=AIzaSyD...
REACT_APP_GOOGLE_CALENDAR_ID=tuoemail@gmail.com
REACT_APP_AWS_ACCESS_KEY_ID=AKIA...
REACT_APP_AWS_SECRET_ACCESS_KEY=...
REACT_APP_AWS_REGION=eu-west-1
```

**Per ogni variabile:**
1. Name: (es: REACT_APP_SENDGRID_API_KEY)
2. Value: (incolla il valore)
3. Click [Save]

---

## STEP 4: Deploy

### 1. Click [Deploy]

Vercel fa tutto automaticamente:
```
✅ Clona repository
✅ Installa dipendenze (npm install)
✅ Compila il sito (npm run build)
✅ Deploy online
```

### 2. Aspetta 2-3 minuti

Vedrai "Deployment successful!" ✅

### 3. Vercel ti dà l'URL

```
https://studio-dentistico.vercel.app
```

---

## STEP 5: Collega Dominio Personalizzato (Opzionale)

Se hai dominio `studiodentistico.it`:

### 1. In Vercel → [Settings] → [Domains]

### 2. Aggiungi dominio: `studiodentistico.it`

### 3. Vercel ti dice i DNS da configurare

### 4. Vai al provider (GoDaddy, Aruba, ecc)
   - Cambia DNS verso Vercel
   - Aspetta 24h per propagazione

### 5. Dominio funziona! ✅

---

## 🔄 AGGIORNAMENTI FUTURI

Quando aggiusti il codice:

```bash
git add .
git commit -m "Descrizione delle modifiche"
git push origin main
```

Vercel **autodeploy** automaticamente! 🚀

---

## ✅ VERIFICA DEPLOYMENT

```bash
# Vedi se sito è online
curl https://studio-dentistico.vercel.app

# Controlla logs in Vercel
# Dashboard → [Deployments] → clicca deploy → [Functions] logs
```

---

## 🆘 PROBLEMI COMUNI

### ❌ "Build failed"
→ Controlla console errors in Vercel logs
→ Di solito manca variabile di ambiente

### ❌ "Module not found"
→ Assicurati che npm install ha installato tutto
→ Riprova deploy

### ❌ "API calls fail"
→ Verifica che API key è corretta in environment variables
→ API key ha uno spazio? Rimuovilo

---

## 📋 CHECKLIST DEPLOY

```
☑ Repository su GitHub
☑ Codice pushato
☑ Account Vercel creato
☑ Progetto importato
☑ Variabili di ambiente configurate
☑ Deploy completato con successo
☑ Sito online e funzionante
☑ Email di conferma funziona
☑ Google Calendar sync ok
☑ Reminder email configurato (EasyCron)
```

---

**Fine! Sito è LIVE** 🎉

Il cliente può iniziare subito a usarlo!

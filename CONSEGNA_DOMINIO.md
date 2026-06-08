# 🌐 GUIDA CONSEGNA - Come Collegare Dominio al Sito

**Passo per passo per consegnare il sito al cliente**

---

## 📋 SCENARIO 1: Cliente HA GIÀ un Dominio

### Situazione:
- Cliente possiede dominio: `studiodentistico.it` (su Aruba, GoDaddy, ecc)
- Tu hai sito su Vercel: `studiodentistico-123.vercel.app`
- **Costo per te: €0** ✅

### PASSO 1: Deploy su Vercel (Tu lo fai)

```
1. Vai https://vercel.com/
2. Accedi con account GitHub
3. Click [Import Project]
4. Seleziona repo del sito
5. Click [Deploy]
6. ✅ Sito online su: studiodentistico-123.vercel.app
7. Testa tutto (email, SMS, calendar, maps)
```

### PASSO 2: Prendi i Nameserver Vercel

```
1. In Vercel Dashboard
2. Seleziona progetto
3. Tab [Domains]
4. Vedi nameserver:
   - ns1.vercel.com
   - ns2.vercel.com
5. COPIA questi 2 nomi
```

### PASSO 3: Dai istruzioni al Cliente

**Manda al cliente questo messaggio:**

```
📋 ISTRUZIONI FINALI - Come Attivare il Sito

Ciao! Il tuo sito è pronto online su Vercel.
Per attivare il dominio studiodentistico.it, fai così:

1️⃣ ACCEDI AL TUO PROVIDER DOMINIO
   - Se lo hai su Aruba: https://www.aruba.it/
   - Se su GoDaddy: https://www.godaddy.com/
   - Se su Namecheap: https://www.namecheap.com/
   - Accedi con username + password

2️⃣ TROVA IMPOSTAZIONI DOMINIO
   - Cerca "Impostazioni Dominio" o "Domain Settings"
   - O "Nameserver" / "DNS"

3️⃣ CAMBIA I NAMESERVER
   Sostituisci i nameserver attuali con questi:
   
   ✏️ Nameserver 1: ns1.vercel.com
   ✏️ Nameserver 2: ns2.vercel.com
   
   (Cancella gli altri, lascia solo questi 2)

4️⃣ SALVA
   - Click [Salva] oppure [Conferma]
   - Attendi 1-2 ore per propagazione

5️⃣ VERIFICA
   - Apri browser
   - Digita: studiodentistico.it
   - ✅ Vedrai il sito online!

📱 Contattami se non funziona: [TUO_NUMERO]
```

### PASSO 4: Cliente Segue le Istruzioni

**Se Cliente ha Aruba:**
```
1. Accedi https://www.aruba.it/
2. Login
3. Left menu → Miei Domini
4. Click su "studiodentistico.it"
5. Click [Modifica Nameserver]
6. Sostituisci con:
   - ns1.vercel.com
   - ns2.vercel.com
7. Click [Salva]
8. ✅ Attendi 1-2 ore
9. Apri studiodentistico.it → SITO ONLINE!
```

**Se Cliente ha GoDaddy:**
```
1. Accedi https://godaddy.com/
2. Vai My Domains
3. Click studiodentistico.it
4. DNS → Change Nameservers
5. Sostituisci con:
   - ns1.vercel.com
   - ns2.vercel.com
6. [Save]
7. ✅ Attendi 1-2 ore
8. Apri studiodentistico.it → SITO ONLINE!
```

**Se Cliente ha Namecheap:**
```
1. Accedi https://namecheap.com/
2. Dashboard → Domain List
3. Click studiodentistico.it → Manage
4. Nameservers → Custom
5. Sostituisci con:
   - ns1.vercel.com
   - ns2.vercel.com
6. [Save Changes]
7. ✅ Attendi 1-2 ore
8. Apri studiodentistico.it → SITO ONLINE!
```

---

## 💡 SCENARIO 2: Cliente NON Ha Dominio

### Situazione:
- Cliente non ha dominio
- Tu compri dominio e lo dai pronto
- **Costo per te: €5-10** (tu lo avanzi, puoi chiedere al cliente)

### PASSO 1: Tu Compri Dominio

```
1. Vai https://www.namecheap.com/ (più economico)
2. Cerca "studiodentistico.it"
3. Click [Add to Cart]
4. Checkout
5. Paga €5-10 (a nome tuo per ora)
6. ✅ Dominio tuo
```

### PASSO 2: Tu Colleghi a Vercel

```
1. Vercel Dashboard → Domains
2. Click [Add Custom Domain]
3. Inserisci: studiodentistico.it
4. Vercel ti da 2 nameserver:
   - ns1.vercel.com
   - ns2.vercel.com
```

### PASSO 3: Tu Configura Nameserver su Namecheap

```
1. Namecheap Dashboard
2. Manage studiodentistico.it
3. Nameservers → Custom
4. Sostituisci con Vercel nameserver
5. [Save]
6. ✅ Attendi 1-2 ore
7. studiodentistico.it → ONLINE
```

### PASSO 4: Tu Trasferisci Dominio al Cliente (Opzionale)

**Dopo che tutto funziona, puoi trasferire il dominio a nome cliente:**

```
1. Namecheap → Manage Domain
2. Tab [Domain Settings]
3. Unlock Domain
4. Genera "Authorization Code" (EOA)
5. Dai codice a cliente
6. Cliente va Namecheap → Transfer Domain
7. Inserisce codice
8. ✅ Dominio a nome cliente

OU

Tieni dominio a nome tuo per €5/anno
(Cliente ti rimborsa ogni anno)
```

---

## 📊 SCHEMA COMPLETO DI CONSEGNA

```
TU CREI SITO (2-3 giorni)
        ↓
TU DEPLOY SU VERCEL (5 min)
    studiodentistico-123.vercel.app
        ↓
TU TESTI TUTTO (1 ora)
    ✅ Email, SMS, Calendar, Maps, Admin
        ↓
RIUNIONE CON CLIENTE
        ↓
    ├─ Cliente HA dominio
    │   └─ Tu dai nameserver Vercel
    │       └─ Cliente cambia su suo provider
    │           └─ 1-2 ore attesa
    │               └─ ✅ studiodentistico.it ONLINE
    │
    └─ Cliente NON ha dominio
        └─ Tu compri dominio (€5-10)
            └─ Tu colleghi a Vercel
                └─ 1-2 ore attesa
                    └─ ✅ studiodentistico.it ONLINE
                        └─ (Opzional) trasferisci a cliente

        ↓
CLIENTE PAGA €3.500 (meno €5-10 se hai comprato dominio)
        ↓
✅ CONSEGNA COMPLETA
```

---

## 🎯 CHECKLIST CONSEGNA

**PRIMA della riunione con cliente:**

```
☑ Sito completo (5 step booking OK)
☑ Email funziona (test prenotazione ricevi email)
☑ SMS configurato (console mostra programmato)
☑ Google Calendar sincronizza
☑ Google Maps mostra indirizzo
☑ Firebase salva dati
☑ Admin panel funziona
☑ Dark mode OK
☑ Mobile responsive (F12 test)
☑ Zero errori console
☑ Privacy policy visibile
☑ Deploy su Vercel fatto
☑ Nameserver Vercel copiati
```

**DURANTE riunione:**

```
☑ Mostra sito online su Vercel
☑ Spiega: "Usiamo Vercel (gratis, affidabile)"
☑ Chiedi: "Avete già dominio?"
  - SÌ: Dai nameserver → Loro li cambiano
  - NO: Offri di comprare (€5-10) e collegare
☑ Fai vedergli admin panel
☑ Spiega: "Username dentista, password (quella che hai scelto)"
☑ Mostra: "Se vuoi cambiare password: Impostazioni → Cambia Password"
☑ Spiega costi:
  - Sito: €3.500 (una tantum, finito)
  - Hosting: €0/anno (Vercel gratis)
  - Dominio: €5/anno (rinnovazione loro)
☑ Chiedi pagamento
```

**DOPO consegna:**

```
☑ Ricevuto pagamento
☑ Dominio propagato (1-2 ore)
☑ Cliente apre studiodentistico.it → ✅ ONLINE
☑ Manda document di supporto:
  - Come aggiungere prenotazioni
  - Come modificare servizi
  - Come cambiar password
  - Numero di emergenza tuo
```

---

## 📧 EMAIL DI CONSEGNA (Copia-Incolla)

```
Oggetto: ✅ Sito Online - Istruzioni Finali

Caro [NOME CLIENTE],

Il tuo sito è pronto! 🎉

SITO ONLINE:
Sito temporaneo (fino a dominio attivo):
https://studiodentistico-123.vercel.app

ATTIVARE IL TUO DOMINIO:
Fai seguire a queste istruzioni per attivare studiodentistico.it

[INSERISCI ISTRUZIONI APPROPRIATE per provider cliente]

ADMIN PANEL:
Accedi a https://studiodentistico-123.vercel.app/admin
Username: dentista
Password: [QUELLA CHE HAI SCELTO]

FUNZIONALITÀ:
✅ Prenotazioni online 24/7
✅ Email automatiche ai pazienti
✅ SMS reminder 24h prima
✅ Sincronizzazione Google Calendar
✅ Mappa con indirizzo studio
✅ Database backup cloud

COSTI ANNUALI:
- Hosting: €0 (Vercel gratis)
- Dominio: €5 (rinnovo annuale tuo)
- TOTALE: €5/anno

SUPPORTO:
Se hai domande: [TUO NUMERO]

Grazie per avermi scelto! 🚀

[TUO NOME]
```

---

## ⚠️ TROUBLESHOOTING

### "Dominio non funziona dopo 1 ora"

```
1. Aspetta 2-4 ore (propagazione DNS)
2. Controlla nameserver su provider:
   - Dovrebbero essere: ns1.vercel.com, ns2.vercel.com
   - NO altri nameserver
3. Svuota cache browser: CTRL+SHIFT+DEL
4. Prova in incognito
5. Se persiste: contatta Vercel support
```

### "Dice 'Non disponibile' su provider"

```
1. Assicurati dominio è SBLOCCATO
2. Non ci deve essere "protezione privacy"
3. Riprova a modificare nameserver
```

### "Cliente vuole trasferire dominio"

```
Se dominio è su tuo account Namecheap:
1. Unlock domain
2. Genera EOA (Authorization Code)
3. Cliente va provider nuovo
4. Transfer domain + EOA
5. ✅ A nome cliente

Vercel nameserver rimangono uguali:
ns1.vercel.com
ns2.vercel.com
```

---

## 💰 FATTURA DI CONSEGNA (Esempio)

```
FATTURA PRIVATISTA
─────────────────

Da: [TUO NOME - Privato]
A: [CLIENTE - Studio Dentistico]

DESCRIZIONE SERVIZIO:
Progettazione e realizzazione sito web con:
- Modulo prenotazioni online
- Email conferma automatica
- SMS reminder 24h
- Sincronizzazione Google Calendar
- Google Maps integrata
- Pannello admin completo
- Database backup cloud
- Design responsive mobile
- Privacy policy GDPR

IMPORTO: €3.500,00
IVA: Esente (prestazione occasionale)
TOTALE: €3.500,00

Modalità pagamento: Bonifico bancario
Data consegna: [DATA]
Sito online: studiodentistico.it

─────────────────
```

---

## ✅ PRONTO PER CONSEGNARE!

Se hai completato questa checklist = **SITO PRONTO AL 100%** 🚀

Domande prima di consegnare? Contattami! 📞

---

**🎉 Buona consegna! Guadagna quei €3.500!** 💰

# Email Service Backup

> **Codice email rimosso temporaneamente dal progetto**
> Quando decidi di riabilitare le email, usa questo codice

## File: `src/services/emailService.js`

Contiene 5 funzioni per inviare email via Firebase Cloud Functions:

### 1. sendConfirmationEmail
**Uso**: Invia conferma prenotazione al cliente
**Dove viene usata**: `StudioContext.js` - dopo `addPrenotazione`

```javascript
export const sendConfirmationEmail = async (prenotazione, studioInfo) => {
  try {
    const response = await fetch(`${CLOUD_FUNCTION_URL}/sendConfirmationEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prenotazione, studioInfo }),
    });

    if (!response.ok) {
      throw new Error(`Errore invio email: ${response.status}`);
    }

    console.log('✅ Email di conferma inviata a:', prenotazione.email);
    return true;
  } catch (error) {
    console.error('❌ Errore invio email:', error);
    return false;
  }
};
```

---

### 2. sendAdminNotificationEmail
**Uso**: Notifica al dentista di nuova prenotazione
**Dove viene usata**: `StudioContext.js` - dopo `addPrenotazione`

```javascript
export const sendAdminNotificationEmail = async (prenotazione, studioInfo) => {
  try {
    const response = await fetch(`${CLOUD_FUNCTION_URL}/sendAdminNotificationEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prenotazione, studioInfo }),
    });

    if (!response.ok) {
      throw new Error(`Errore invio email: ${response.status}`);
    }

    console.log('✅ Email notifica inviata al dentista');
    return true;
  } catch (error) {
    console.error('❌ Errore invio email admin:', error);
    return false;
  }
};
```

---

### 3. sendAdminCodeEmail
**Uso**: Invia codice di accesso admin per reset password
**Dove viene usata**: In una pagina di reset password (da creare)

```javascript
export const sendAdminCodeEmail = async (email, code) => {
  try {
    const response = await fetch(`${CLOUD_FUNCTION_URL}/sendAdminCodeEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    });

    if (!response.ok) {
      throw new Error(`Errore invio email: ${response.status}`);
    }

    console.log('✅ Codice di accesso inviato a:', email);
    return true;
  } catch (error) {
    console.error('❌ Errore invio codice di accesso:', error);
    return false;
  }
};
```

---

### 4. sendContactMessageEmail
**Uso**: Invia messaggi dal form contatti
**Dove viene usata**: Pagina contatti

```javascript
export const sendContactMessageEmail = async (formData, studioInfo) => {
  try {
    const response = await fetch(`${CLOUD_FUNCTION_URL}/sendContactMessageEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: formData.nome,
        email: formData.email,
        messaggio: formData.messaggio,
        studioEmail: studioInfo.email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Errore invio email: ${response.status}`);
    }

    console.log('✅ Messaggio di contatto inviato');
    return true;
  } catch (error) {
    console.error('❌ Errore invio messaggio contatto:', error);
    return false;
  }
};
```

---

### 5. sendReminderEmail
**Uso**: Promemoria visita 24h prima
**Dove viene usata**: Scheduled job (Cloud Functions scheduler)

```javascript
export const sendReminderEmail = async (prenotazione, studioInfo) => {
  try {
    const response = await fetch(`${CLOUD_FUNCTION_URL}/sendReminderEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prenotazione, studioInfo }),
    });

    if (!response.ok) {
      throw new Error(`Errore invio email: ${response.status}`);
    }

    console.log('✅ Email reminder inviata a:', prenotazione.email);
    return true;
  } catch (error) {
    console.error('❌ Errore invio email reminder:', error);
    return false;
    }
};
```

---

## Come Riabilitare le Email

1. Copia il codice da sopra
2. Incolla in `src/services/emailService.js`
3. Aggiorna le import in `StudioContext.js`:
   ```javascript
   import { sendConfirmationEmail, sendAdminNotificationEmail } from '../services/emailService';
   ```
4. Sbilancia le righe commentate in `StudioContext.js` dove chiami:
   - `sendConfirmationEmail(newPrenotazione, studio);`
   - `sendAdminNotificationEmail(newPrenotazione, studio);`
5. Deploy Cloud Functions su Firebase (richiede piano Blaze)
6. Fatto! ✅

---

## Cloud Functions Required

Se vuoi usare queste email, hai bisogno delle Cloud Functions in `/functions`:
- `sendConfirmationEmail`
- `sendAdminNotificationEmail`
- `sendAdminCodeEmail`
- `sendContactMessageEmail`
- `sendReminderEmail`

Vedi `CLOUD_FUNCTIONS_SETUP.md` per i dettagli.

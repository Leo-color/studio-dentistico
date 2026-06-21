const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');
const cors = require('cors')({ origin: true });

// Inizializza Firebase Admin
admin.initializeApp();

// Configura SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

// ====== FUNZIONE: Invia Email di Conferma Prenotazione ======
exports.sendConfirmationEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        res.status(400).send('Metodo non supportato');
        return;
      }

      const { prenotazione, studioInfo } = req.body;

      if (!prenotazione || !studioInfo) {
        res.status(400).send('Dati mancanti');
        return;
      }

      const msg = {
        to: prenotazione.email,
        from: {
          email: studioInfo.email,
          name: studioInfo.nome,
        },
        subject: `Prenotazione Confermata - ${studioInfo.nome}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">Prenotazione Confermata</h2>
            <p>Caro ${prenotazione.nome},</p>
            <p>La tua prenotazione presso <strong>${studioInfo.nome}</strong> è stata confermata.</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Dettagli Prenotazione</h3>
              <p><strong>Numero Prenotazione:</strong> ${prenotazione.id}</p>
              <p><strong>Data:</strong> ${prenotazione.dataFormattata}</p>
              <p><strong>Orario:</strong> ${prenotazione.orario}</p>
              <p><strong>Servizio:</strong> ${prenotazione.servizioNome}</p>
              <p><strong>Prezzo:</strong> €${prenotazione.prezzo}</p>
            </div>
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e40af;">
              <h3 style="margin-top: 0;">Informazioni Studio</h3>
              <p><strong>Indirizzo:</strong> ${studioInfo.indirizzo}, ${studioInfo.cap} ${studioInfo.citta}</p>
              <p><strong>Telefono:</strong> ${studioInfo.telefono}</p>
              <p><strong>Email:</strong> ${studioInfo.email}</p>
            </div>
            <p style="color: #666;">
              <strong>Ricorda:</strong> Presentati 5 minuti prima dell'orario programmato.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #999; font-size: 12px;">
              ${studioInfo.nome}<br>
              ${studioInfo.indirizzo}<br>
              ${studioInfo.telefono}
            </p>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log('✅ Email di conferma inviata a:', prenotazione.email);
      res.json({ success: true, message: 'Email inviata con successo' });
    } catch (error) {
      console.error('❌ Errore invio email:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

// ====== FUNZIONE: Invia Email di Notifica Admin ======
exports.sendAdminNotificationEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        res.status(400).send('Metodo non supportato');
        return;
      }

      const { prenotazione, studioInfo } = req.body;

      if (!prenotazione || !studioInfo) {
        res.status(400).send('Dati mancanti');
        return;
      }

      const msg = {
        to: studioInfo.email,
        from: {
          email: studioInfo.email,
          name: 'Sistema Prenotazioni',
        },
        subject: `Nuova Prenotazione - ${prenotazione.nome}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">Nuova Prenotazione Ricevuta</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Paziente:</strong> ${prenotazione.nome}</p>
              <p><strong>Email:</strong> ${prenotazione.email}</p>
              <p><strong>Telefono:</strong> ${prenotazione.telefono}</p>
              <p><strong>Data:</strong> ${prenotazione.dataFormattata}</p>
              <p><strong>Orario:</strong> ${prenotazione.orario}</p>
              <p><strong>Servizio:</strong> ${prenotazione.servizioNome}</p>
              <p><strong>Nuovo Paziente:</strong> ${prenotazione.isNuovoP ? 'Sì' : 'No'}</p>
              ${prenotazione.note ? `<p><strong>Note:</strong> ${prenotazione.note}</p>` : ''}
            </div>
            <p style="color: #666;">
              Accedi al pannello admin per confermare o gestire la prenotazione.
            </p>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log('✅ Email notifica inviata al dentista');
      res.json({ success: true, message: 'Email inviata con successo' });
    } catch (error) {
      console.error('❌ Errore invio email admin:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

// ====== FUNZIONE: Invia Codice di Accesso Admin ======
exports.sendAdminCodeEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        res.status(400).send('Metodo non supportato');
        return;
      }

      const { email, code } = req.body;

      if (!email || !code) {
        res.status(400).send('Email e codice sono obbligatori');
        return;
      }

      const msg = {
        to: email,
        from: {
          email: 'noreply@studiodentistico.it',
          name: 'Studio Dentistico',
        },
        subject: 'Codice di Accesso - Studio Dentistico',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">Codice di Accesso</h2>
            <p>Caro Amministratore,</p>
            <p>Hai richiesto l'accesso al pannello amministrativo. Usa il codice seguente:</p>
            <div style="background: #1e40af; color: white; padding: 30px; border-radius: 8px; margin: 30px 0; text-align: center;">
              <p style="font-size: 14px; margin-bottom: 10px;">Il tuo codice di accesso:</p>
              <p style="font-size: 48px; font-weight: bold; letter-spacing: 10px; margin: 0;">${code}</p>
            </div>
            <p style="color: #666;">
              <strong>Importante:</strong> Questo codice è valido per 10 minuti. Non condividere questo codice con nessuno.
            </p>
            <p style="color: #999; font-size: 12px;">
              Se non hai richiesto questo codice, ignora questo messaggio.
            </p>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log('✅ Codice di accesso inviato a:', email);
      res.json({ success: true, message: 'Codice inviato con successo' });
    } catch (error) {
      console.error('❌ Errore invio codice di accesso:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

// ====== FUNZIONE: Invia Email di Contatto ======
exports.sendContactMessageEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        res.status(400).send('Metodo non supportato');
        return;
      }

      const { nome, email: senderEmail, messaggio, studioEmail } = req.body;

      if (!nome || !senderEmail || !messaggio || !studioEmail) {
        res.status(400).send('Dati mancanti');
        return;
      }

      const msg = {
        to: studioEmail,
        from: {
          email: studioEmail,
          name: 'Sistema Contatti',
        },
        subject: `Nuovo Messaggio da ${nome}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">Nuovo Messaggio Ricevuto</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nome:</strong> ${nome}</p>
              <p><strong>Email:</strong> ${senderEmail}</p>
              <p><strong>Data Messaggio:</strong> ${new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e40af;">
              <h3 style="margin-top: 0; color: #1e40af;">Messaggio</h3>
              <p style="white-space: pre-wrap; color: #333;">${messaggio}</p>
            </div>
            <p style="color: #666; font-size: 14px;">
              Rispondi direttamente a ${senderEmail} per contattare il mittente.
            </p>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log('✅ Messaggio di contatto inviato');
      res.json({ success: true, message: 'Messaggio inviato con successo' });
    } catch (error) {
      console.error('❌ Errore invio messaggio:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

// ====== FUNZIONE: Invia Email di Promemoria ======
exports.sendReminderEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        res.status(400).send('Metodo non supportato');
        return;
      }

      const { prenotazione, studioInfo } = req.body;

      if (!prenotazione || !studioInfo) {
        res.status(400).send('Dati mancanti');
        return;
      }

      const msg = {
        to: prenotazione.email,
        from: {
          email: studioInfo.email,
          name: studioInfo.nome,
        },
        subject: `Promemoria Visita - ${studioInfo.nome}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">Ricordiamo la Tua Visita</h2>
            <p>Caro ${prenotazione.nome},</p>
            <p>Ti ricordiamo che domani hai una visita presso <strong>${studioInfo.nome}</strong>.</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Dettagli Visita</h3>
              <p><strong>Data:</strong> ${prenotazione.dataFormattata}</p>
              <p><strong>Orario:</strong> ${prenotazione.orario}</p>
              <p><strong>Servizio:</strong> ${prenotazione.servizioNome}</p>
            </div>
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e40af;">
              <h3 style="margin-top: 0;">Informazioni Studio</h3>
              <p><strong>Indirizzo:</strong> ${studioInfo.indirizzo}</p>
              <p><strong>Telefono:</strong> ${studioInfo.telefono}</p>
            </div>
            <p style="color: #666;">
              <strong>Ricorda:</strong> Presentati 5 minuti prima dell'orario programmato.
            </p>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log('✅ Email reminder inviata a:', prenotazione.email);
      res.json({ success: true, message: 'Email inviata con successo' });
    } catch (error) {
      console.error('❌ Errore invio email reminder:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

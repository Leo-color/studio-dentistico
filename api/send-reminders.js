// API per inviare reminder email 24h prima della visita
// Endpoint: https://tuodominio.it/api/send-reminders
// Cron job chiama questo endpoint ogni ora

import { sendReminderEmail } from '../src/services/emailService';

// Email di admin per ricevere notifiche di errore
const ADMIN_EMAIL = 'info@studiodentistico.it';

export default async function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Ricevi le prenotazioni dal body
    const { prenotazioni, studioInfo } = req.body;

    if (!prenotazioni || !Array.isArray(prenotazioni)) {
      return res.status(400).json({ error: 'Prenotazioni non valide' });
    }

    console.log(`[Reminder] Controllando ${prenotazioni.length} prenotazioni...`);

    const now = new Date();
    let reminderInviati = 0;
    let prenotazioniAggiornate = [];

    for (const prenotazione of prenotazioni) {
      // Skip se reminder già inviato
      if (prenotazione.reminderSent) {
        prenotazioniAggiornate.push(prenotazione);
        continue;
      }

      // Calcola quando inviare reminder (24h prima)
      const [year, month, day] = prenotazione.data.split('-').map(Number);
      const [hours, minutes] = prenotazione.orario.split(':').map(Number);

      const dataPrenotazione = new Date(year, month - 1, day, hours, minutes);
      const reminderTime = new Date(dataPrenotazione.getTime() - 24 * 60 * 60 * 1000);

      // Se è ora di inviare reminder (entro 1 ora)
      const diffMs = reminderTime.getTime() - now.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      if (diffHours <= 0 && diffHours > -1) {
        // È ora di inviare!
        console.log(`[Reminder] Inviando reminder per: ${prenotazione.nome} - ${prenotazione.dataFormattata}`);

        try {
          await sendReminderEmail(prenotazione, studioInfo || {
            nome: 'Studio Dentistico',
            email: ADMIN_EMAIL,
            telefono: '+39 02 1234567',
            indirizzo: 'Via Roma 123, Milano'
          });

          // Marca come inviato
          prenotazione.reminderSent = true;
          reminderInviati++;

          console.log(`✅ Reminder inviato a: ${prenotazione.email}`);
        } catch (error) {
          console.error(`❌ Errore invio reminder per ${prenotazione.nome}:`, error);
        }
      }

      prenotazioniAggiornate.push(prenotazione);
    }

    console.log(`[Reminder] Completato: ${reminderInviati} reminder inviati`);

    return res.status(200).json({
      success: true,
      reminderInviati,
      prenotazioni: prenotazioniAggiornate
    });

  } catch (error) {
    console.error('[Reminder] Errore:', error);
    return res.status(500).json({
      error: 'Errore interno',
      message: error.message
    });
  }
}

// Servizio SMS con AWS SNS
// Setup: https://aws.amazon.com/
// Gratis: 100 SMS al mese (primo anno)

import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.REACT_APP_AWS_REGION || 'eu-west-1';

export const sendReminderSMS = async (prenotazione) => {
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    console.warn('AWS SNS non configurato - SMS non inviato');
    return false;
  }

  try {
    const phoneNumber = prenotazione.telefono.replace(/\D/g, '');
    const formattedPhone = `+39${phoneNumber}`;

    const client = new SNSClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    const message = `Ciao ${prenotazione.nome}, ricordiamo la tua visita domani alle ${prenotazione.orario} presso ${prenotazione.studioNome}. Contattaci se devi annullare.`;

    const command = new PublishCommand({
      Message: message,
      PhoneNumber: formattedPhone,
    });

    await client.send(command);

    console.log('SMS reminder inviato a:', formattedPhone);
    return true;
  } catch (error) {
    console.error('Errore invio SMS:', error);
    return false;
  }
};

export const scheduleReminderSMS = (prenotazione) => {
  // Calcola il tempo fino a domani alla stessa ora della prenotazione
  const prenotazioneDate = new Date(prenotazione.data);
  const [hours, minutes] = prenotazione.orario.split(':');
  prenotazioneDate.setHours(parseInt(hours), parseInt(minutes), 0);

  // 24 ore prima
  const reminderTime = new Date(prenotazioneDate.getTime() - 24 * 60 * 60 * 1000);
  const now = new Date();
  const timeUntilReminder = reminderTime.getTime() - now.getTime();

  if (timeUntilReminder > 0) {
    setTimeout(() => {
      sendReminderSMS(prenotazione);
    }, timeUntilReminder);

    console.log(`SMS reminder programmato per: ${reminderTime.toLocaleString('it-IT')}`);
  }

  return true;
};

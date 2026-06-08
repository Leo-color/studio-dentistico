// Servizio Google Calendar
// Aggiunge automaticamente le prenotazioni a Google Calendar

const GOOGLE_CALENDAR_API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
const GOOGLE_CALENDAR_ID = process.env.REACT_APP_GOOGLE_CALENDAR_ID;

export const addToGoogleCalendar = async (prenotazione, studioInfo) => {
  if (!GOOGLE_CALENDAR_API_KEY || !GOOGLE_CALENDAR_ID) {
    console.warn('Google Calendar non configurato');
    return false;
  }

  try {
    // Crea evento Google Calendar
    const [year, month, day] = prenotazione.data.split('-');
    const [hours, minutes] = prenotazione.orario.split(':');

    const startTime = new Date(year, month - 1, day, hours, minutes);
    const endTime = new Date(startTime.getTime() + prenotazione.durata * 60000);

    const event = {
      summary: `${prenotazione.servizioNome} - ${prenotazione.nome}`,
      description: `Paziente: ${prenotazione.nome}\nEmail: ${prenotazione.email}\nTelefono: ${prenotazione.telefono}\nNote: ${prenotazione.note || 'Nessuna'}`,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'Europe/Rome',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Europe/Rome',
      },
      location: studioInfo.indirizzo,
      attendees: [
        { email: prenotazione.email },
        { email: studioInfo.email },
      ],
    };

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      throw new Error(`Errore Google Calendar: ${response.status}`);
    }

    console.log('Evento aggiunto a Google Calendar');
    return true;
  } catch (error) {
    console.error('Errore sincronizzazione Google Calendar:', error);
    return false;
  }
};

// Fetcha eventi da Google Calendar
export const getGoogleCalendarEvents = async (monthYear = null) => {
  if (!GOOGLE_CALENDAR_API_KEY || !GOOGLE_CALENDAR_ID) {
    console.warn('Google Calendar non configurato');
    return [];
  }

  try {
    // Se non specificato, usa il mese corrente
    const now = monthYear || new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const timeMin = startOfMonth.toISOString();
    const timeMax = endOfMonth.toISOString();

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Errore Google Calendar: ${response.status}`);
    }

    const data = await response.json();
    console.log('Eventi Google Calendar:', data.items?.length || 0);
    return data.items || [];
  } catch (error) {
    console.error('Errore lettura Google Calendar:', error);
    return [];
  }
};

// Genera link Google Calendar per visualizzazione veloce
export const generateGoogleCalendarLink = (prenotazione) => {
  const [year, month, day] = prenotazione.data.split('-');
  const [hours, minutes] = prenotazione.orario.split(':');

  const startTime = new Date(year, month - 1, day, hours, minutes);
  const endTime = new Date(startTime.getTime() + prenotazione.durata * 60000);

  const title = encodeURIComponent(`${prenotazione.servizioNome} - ${prenotazione.nome}`);
  const startStr = startTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endStr = endTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}`;
};

// Crea un evento personalizzato su Google Calendar
export const createCustomGoogleCalendarEvent = async (eventData) => {
  if (!GOOGLE_CALENDAR_API_KEY || !GOOGLE_CALENDAR_ID) {
    console.warn('Google Calendar non configurato');
    return false;
  }

  try {
    const [year, month, day] = eventData.data.split('-');
    const [hours, minutes] = eventData.ora.split(':');

    const startTime = new Date(year, month - 1, day, hours, minutes);
    const endTime = new Date(startTime.getTime() + parseInt(eventData.durata) * 60000);

    const event = {
      summary: eventData.titolo,
      description: eventData.descrizione || '',
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'Europe/Rome',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Europe/Rome',
      },
    };

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      throw new Error(`Errore Google Calendar: ${response.status}`);
    }

    console.log('Evento personalizzato creato su Google Calendar');
    return true;
  } catch (error) {
    console.error('Errore creazione evento personalizzato:', error);
    return false;
  }
};

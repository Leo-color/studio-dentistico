import React from 'react';
import { useStudio } from '../context/StudioContext';

export const Privacy = () => {
  const { studio } = useStudio();

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Titolare del Trattamento</h2>
            <p>
              <strong>{studio.nome}</strong><br />
              Indirizzo: {studio.indirizzo}, {studio.cap} {studio.citta} ({studio.provincia})<br />
              Email: {studio.email}<br />
              Telefono: {studio.telefono}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Dati Raccolti</h2>
            <p>Durante la prenotazione online, raccogliamo i seguenti dati personali:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nome completo</li>
              <li>Email</li>
              <li>Numero di telefono</li>
              <li>Data e ora della prenotazione</li>
              <li>Servizio richiesto</li>
              <li>Note mediche e allergie (opzionali)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalità del Trattamento</h2>
            <p>I dati personali sono trattati per le seguenti finalità:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Gestione e conferma delle prenotazioni</li>
              <li>Invio di email di conferma e reminder</li>
              <li>Comunicazioni relative agli appuntamenti</li>
              <li>Miglioramento dei servizi offerti</li>
              <li>Adempimenti legali e normativi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Base Legale</h2>
            <p>
              Il trattamento dei dati è basato su:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Esecuzione del contratto (prenotazione)</li>
              <li>Consenso esplicito dell'interessato</li>
              <li>Obblighi legali applicabili</li>
              <li>Interessi legittimi del titolare</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Conservazione dei Dati</h2>
            <p>
              I dati personali saranno conservati per il tempo necessario a gestire la prenotazione e fornire i servizi richiesti.
              I dati relativi alle prenotazioni completate saranno conservati per il periodo stabilito dalla normativa fiscale applicabile
              (generalmente 10 anni per finalità di contabilità).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Diritti dell'Interessato</h2>
            <p>
              In conformità al Regolamento (UE) 2016/679 (GDPR), hai il diritto di:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Accedere ai tuoi dati personali</li>
              <li>Richiedere la rettifica di dati inesatti</li>
              <li>Richiedere la cancellazione dei dati</li>
              <li>Limitare il trattamento</li>
              <li>Ottenere la portabilità dei dati</li>
              <li>Opporti al trattamento</li>
            </ul>
            <p className="mt-4">
              Per esercitare i tuoi diritti, contattaci a: <strong>{studio.email}</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Sicurezza dei Dati</h2>
            <p>
              Utilizziamo misure tecniche e organizzative appropriate per proteggere i tuoi dati personali contro
              l'accesso non autorizzato, la modifica, la divulgazione o la distruzione. Tutti i dati sono trasmessi
              tramite connessione HTTPS crittografata.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookie</h2>
            <p>
              Questo sito utilizza cookie tecnici necessari per il funzionamento del servizio. Accettando di utilizzare
              il sito, accetti l'utilizzo dei cookie. Puoi disabilitare i cookie dalle impostazioni del tuo browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contatti</h2>
            <p>
              Per domande sulla privacy, contattaci a:
            </p>
            <p>
              <strong>{studio.nome}</strong><br />
              Email: <a href={`mailto:${studio.email}`} className="text-blue-600 hover:underline">{studio.email}</a><br />
              Telefono: {studio.telefono}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifiche</h2>
            <p>
              Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi momento.
              Le modifiche saranno pubblicate su questa pagina e avranno effetto immediato.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Consenso Dati</h3>
          <p className="text-sm text-gray-700">
            Effettuando una prenotazione, accetti questa Privacy Policy e autorizza il trattamento
            dei tuoi dati personali secondo i termini descritti.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

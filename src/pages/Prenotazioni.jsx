import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useStudio } from '../context/StudioContext';
import Modal from '../components/Modal';

export const Prenotazioni = () => {
  const navigate = useNavigate();
  const { servizi, prenotazioni, addPrenotazione, addToast, setPrivacyModalOpen, orari, ferie } = useStudio();

  // Scroll in alto quando la pagina carica
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [step, setStep] = useState(1);
  const [selectedServizio, setSelectedServizio] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedOrario, setSelectedOrario] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    isNuovoP: true,
    note: '',
    privacy: false,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Genera gli slot disponibili basandosi su orari dal context
  const availableSlots = useMemo(() => {
    if (!selectedData || !selectedServizio || !orari) return { mattina: [], pomeriggio: [] };

    const servizio = servizi.find(s => s.id === selectedServizio);
    if (!servizio || !servizio.durata) return { mattina: [], pomeriggio: [] };

    const dataStr = selectedData.toISOString().split('T')[0];

    // Controlla se è in ferie
    const isInFerie = ferie && ferie.some(f => {
      const dal = new Date(f.dal + 'T00:00:00');
      const al = new Date(f.al + 'T23:59:59');
      const selected = new Date(selectedData);
      return selected >= dal && selected <= al;
    });

    if (isInFerie) return { mattina: [], pomeriggio: [] };

    // Ottieni il giorno della settimana e gli orari
    const dayName = ['domenica', 'lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato'][selectedData.getDay()];
    const dayOrari = orari[dayName];

    if (!dayOrari || !dayOrari.aperto) return { mattina: [], pomeriggio: [] };

    // Funzione per convertire orario a minuti
    const timeToMinutes = (timeStr) => {
      if (!timeStr) return 0;
      const [h, m] = timeStr.split(':').map(Number);
      return h * 60 + (m || 0);
    };

    // Genera slot da 30 minuti tra start e end
    const generateSlots = (startTime, endTime) => {
      const slots = [];
      let current = startTime;
      const duration = servizio.durata || 30;

      while (current + duration <= endTime) {
        const h = Math.floor(current / 60);
        const m = current % 60;
        const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        slots.push(timeStr);
        current += 30;
      }
      return slots;
    };

    const aperturaMin = timeToMinutes(dayOrari.apertura);
    const chiusuraMin = timeToMinutes(dayOrari.chiusura);
    const pausaDaMin = dayOrari.pausaDa ? timeToMinutes(dayOrari.pausaDa) : null;
    const pausaAMin = dayOrari.pausaA ? timeToMinutes(dayOrari.pausaA) : null;

    let mattineSlots = [];
    let pomeriggioSlots = [];

    if (pausaDaMin && pausaAMin) {
      // C'è pausa: mattina da apertura a pausaDa, pomeriggio da pausaA a chiusura
      mattineSlots = generateSlots(aperturaMin, pausaDaMin);
      pomeriggioSlots = generateSlots(pausaAMin, chiusuraMin);
    } else {
      // Niente pausa: tutti gli orari in mattina
      mattineSlots = generateSlots(aperturaMin, chiusuraMin);
    }

    // Controlla slot occupati
    const occupiedSlots = new Set();
    prenotazioni
      .filter(p => p.data === dataStr)
      .forEach(p => {
        const startMin = timeToMinutes(p.orario);
        const duration = servizio.durata || 30;
        const slotsNeeded = Math.ceil(duration / 30); // Arrotonda verso l'alto
        const endMin = startMin + (slotsNeeded * 30);
        const allSlots = [...mattineSlots, ...pomeriggioSlots];

        allSlots.forEach(slot => {
          const slotMin = timeToMinutes(slot);
          if (slotMin >= startMin && slotMin < endMin) {
            occupiedSlots.add(slot);
          }
        });
      });

    return {
      mattina: mattineSlots.map(slot => ({
        time: slot,
        disabled: occupiedSlots.has(slot),
      })),
      pomeriggio: pomeriggioSlots.map(slot => ({
        time: slot,
        disabled: occupiedSlots.has(slot),
      })),
    };
  }, [selectedData, selectedServizio, servizi, prenotazioni, orari, ferie]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.nome) {
      addToast('Manca il Nome e Cognome', 'error');
      return false;
    }
    if (formData.nome.length < 3) {
      addToast('Nome troppo corto (minimo 3 caratteri)', 'error');
      return false;
    }
    if (!formData.email) {
      addToast('Manca l\'Email', 'error');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      addToast('Email non valida', 'error');
      return false;
    }
    if (!formData.telefono) {
      addToast('Manca il Numero di Telefono', 'error');
      return false;
    }
    if (!/^\d{10}$/.test(formData.telefono.replace(/\D/g, ''))) {
      addToast('Telefono non valido (deve avere 10 cifre)', 'error');
      return false;
    }
    if (!formData.privacy) {
      addToast('Devi accettare la Privacy Policy', 'error');
      return false;
    }
    return true;
  };

  const handleConfirmaPrenotazione = async () => {
    if (!validateForm()) return;

    const servizio = servizi.find(s => s.id === selectedServizio);
    const dataFormattata = selectedData.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const prenotazione = {
      servizioId: selectedServizio,
      servizioNome: servizio.nome,
      prezzo: servizio.prezzo,
      durata: servizio.durata,
      data: selectedData.toISOString().split('T')[0],
      dataFormattata,
      orario: selectedOrario,
      ...formData,
    };

    const id = await addPrenotazione(prenotazione);
    setShowConfirmModal(false);

    // Redirect a pagina di successo
    navigate(`/prenotazione-confermata/${id}`);
  };

  // ===== STEP 1: Scegli Servizio =====
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Prenota la Tua Visita</h1>
            <p className="text-gray-600">Step 1 di 5: Scegli il Servizio</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-blue-700 h-2 rounded-full w-1/5 transition-all"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Quale servizio desideri?
            </label>

            <select
              value={selectedServizio || ''}
              onChange={(e) => setSelectedServizio(parseInt(e.target.value))}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Seleziona un servizio --</option>
              {servizi.map(servizio => (
                <option key={servizio.id} value={servizio.id}>
                  {servizio.nome} - €{servizio.prezzo} ({servizio.durata} min)
                </option>
              ))}
            </select>

            {selectedServizio && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-700">
                {(() => {
                  const s = servizi.find(srv => srv.id === selectedServizio);
                  return (
                    <>
                      <p className="text-gray-700"><strong>Servizio:</strong> {s.nome}</p>
                      <p className="text-gray-700"><strong>Prezzo:</strong> €{s.prezzo}</p>
                      <p className="text-gray-700"><strong>Durata:</strong> {s.durata} minuti</p>
                    </>
                  );
                })()}
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  navigate('/');
                  setErrorMessage('');
                }}
                className="flex-1 bg-gray-300 text-gray-800 font-bold py-4 px-4 rounded-lg hover:bg-gray-400 transition text-lg"
              >
                ← Indietro
              </button>
              <button
                onClick={() => {
                  if (!selectedServizio) {
                    setErrorMessage('Devi selezionare un servizio');
                    return;
                  }
                  setErrorMessage('');
                  setStep(2);
                }}
                className="flex-1 bg-blue-700 text-white font-bold py-4 px-4 rounded-lg hover:bg-blue-800 transition text-lg hover:opacity-90"
              >
                Avanti →
              </button>
            </div>

            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 border-2 border-red-500 rounded-lg">
                <p className="text-red-700 font-semibold text-center">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===== STEP 2: Scegli Data =====
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Prenota la Tua Visita</h1>
            <p className="text-gray-600">Step 2 di 5: Scegli la Data</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-blue-700 h-2 rounded-full w-2/5 transition-all"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Quando desideri la visita?
            </label>

            <Calendar
              value={selectedData}
              onChange={setSelectedData}
              minDate={new Date()}
              tileDisabled={({ date }) => {
                // Disabilita domeniche
                if (date.getDay() === 0) return true;
                // Disabilita giorni in ferie
                if (ferie && ferie.some(f => {
                  const dal = new Date(f.dal + 'T00:00:00');
                  const al = new Date(f.al + 'T23:59:59');
                  return date >= dal && date <= al;
                })) return true;
                return false;
              }}
              className="w-full"
            />

            {selectedData && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-700">
                <p className="text-gray-700">
                  <strong>Data selezionata:</strong> {selectedData.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setStep(1);
                  setErrorMessage('');
                }}
                className="flex-1 bg-gray-300 text-gray-800 font-bold py-4 px-4 rounded-lg hover:bg-gray-400 transition text-lg"
              >
                ← Indietro
              </button>
              <button
                onClick={() => {
                  if (!selectedData) {
                    setErrorMessage('Devi selezionare una data');
                    return;
                  }
                  setErrorMessage('');
                  setStep(3);
                }}
                className="flex-1 bg-blue-700 text-white font-bold py-4 px-4 rounded-lg hover:bg-blue-800 transition text-lg hover:opacity-90"
              >
                Avanti →
              </button>
            </div>

            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 border-2 border-red-500 rounded-lg">
                <p className="text-red-700 font-semibold text-center">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===== STEP 3: Scegli Orario =====
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Prenota la Tua Visita</h1>
            <p className="text-gray-600">Step 3 di 5: Scegli l'Orario</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-blue-700 h-2 rounded-full w-3/5 transition-all"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <label className="block text-lg font-semibold text-gray-900 mb-6">
              Quale orario preferisci?
            </label>

            {/* Mattina */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Mattina (09:00 - 13:00)</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {availableSlots.mattina.map(slot => (
                  <button
                    key={slot.time}
                    onClick={() => !slot.disabled && setSelectedOrario(slot.time)}
                    disabled={slot.disabled}
                    className={`py-3 px-2 rounded-lg font-semibold transition ${
                      slot.disabled
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : selectedOrario === slot.time
                        ? 'bg-blue-900 text-white'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            {/* Pomeriggio - Mostra solo se ci sono slot disponibili */}
            {availableSlots.pomeriggio.some(slot => !slot.disabled) && (
              <>
                {/* Pausa */}
                <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <p className="text-gray-700 font-semibold">Studio chiuso 13:00 - 14:30</p>
                </div>

                {/* Pomeriggio */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Pomeriggio (14:30 - 19:00)</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {availableSlots.pomeriggio.map(slot => (
                      <button
                        key={slot.time}
                        onClick={() => !slot.disabled && setSelectedOrario(slot.time)}
                        disabled={slot.disabled}
                        className={`py-3 px-2 rounded-lg font-semibold transition ${
                          slot.disabled
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : selectedOrario === slot.time
                            ? 'bg-blue-900 text-white'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedOrario && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-700">
                <p className="text-gray-700">
                  <strong>Orario selezionato:</strong> {selectedOrario}
                </p>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setStep(2);
                  setErrorMessage('');
                }}
                className="flex-1 bg-gray-300 text-gray-800 font-bold py-4 px-4 rounded-lg hover:bg-gray-400 transition text-lg"
              >
                ← Indietro
              </button>
              <button
                onClick={() => {
                  if (!selectedOrario) {
                    setErrorMessage('Devi selezionare un orario');
                    return;
                  }
                  setErrorMessage('');
                  setStep(4);
                }}
                className="flex-1 bg-blue-700 text-white font-bold py-4 px-4 rounded-lg hover:bg-blue-800 transition text-lg hover:opacity-90"
              >
                Avanti →
              </button>
            </div>

            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 border-2 border-red-500 rounded-lg">
                <p className="text-red-700 font-semibold text-center">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===== STEP 4: Dati Paziente =====
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Prenota la Tua Visita</h1>
            <p className="text-gray-600">Step 4 di 5: Inserisci i Tuoi Dati</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-blue-700 h-2 rounded-full w-4/5 transition-all"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Riepilogo */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-700">
              <h3 className="font-bold text-gray-900 mb-3">Riepilogo</h3>
              <p className="text-gray-700"><strong>Data:</strong> {selectedData?.toLocaleDateString('it-IT')}</p>
              <p className="text-gray-700"><strong>Orario:</strong> {selectedOrario}</p>
              <p className="text-gray-700"><strong>Servizio:</strong> {servizi.find(s => s.id === selectedServizio)?.nome}</p>
              <p className="text-gray-700"><strong>Prezzo:</strong> €{servizi.find(s => s.id === selectedServizio)?.prezzo}</p>
            </div>

            {/* Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Nome e Cognome *</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleFormChange}
                  placeholder="Es: Mario Rossi"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
                  minLength="3"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="es@mail.com"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Telefono *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleFormChange}
                  placeholder="3331234567"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Sei un nuovo proprietario?</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isNuovoP"
                      value="true"
                      checked={formData.isNuovoP === true}
                      onChange={() => setFormData(prev => ({ ...prev, isNuovoP: true }))}
                    />
                    <span className="text-gray-700">Sì</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isNuovoP"
                      value="false"
                      checked={formData.isNuovoP === false}
                      onChange={() => setFormData(prev => ({ ...prev, isNuovoP: false }))}
                    />
                    <span className="text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Note/Allergie (opzionale)</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleFormChange}
                  placeholder="Allergie, problemi pregressi, ecc..."
                  maxLength="500"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
                  rows="4"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer mt-6">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleFormChange}
                  className="mt-1"
                />
                <span className="text-gray-700">
                  Ho letto e accetto la{' '}
                  <button
                    type="button"
                    onClick={() => setPrivacyModalOpen(true)}
                    className="font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer transition"
                  >
                    Privacy Policy
                  </button>
                  {' '}*
                </span>
              </label>
            </form>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setStep(3);
                  setErrorMessage('');
                }}
                className="flex-1 bg-gray-300 text-gray-800 font-bold py-4 px-4 rounded-lg hover:bg-gray-400 transition text-lg"
              >
                ← Indietro
              </button>
              <button
                onClick={() => {
                  // Validazione COMPLETA
                  if (!formData.nome) {
                    setErrorMessage('Manca il Nome e Cognome');
                    return;
                  }
                  if (formData.nome.length < 3) {
                    setErrorMessage('Nome troppo corto (minimo 3 caratteri)');
                    return;
                  }
                  if (!formData.email) {
                    setErrorMessage('Manca l\'Email');
                    return;
                  }
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    setErrorMessage('Email non valida');
                    return;
                  }
                  if (!formData.telefono) {
                    setErrorMessage('Manca il Numero di Telefono');
                    return;
                  }
                  if (!/^\d{10}$/.test(formData.telefono.replace(/\D/g, ''))) {
                    setErrorMessage('Telefono non valido (deve avere 10 cifre)');
                    return;
                  }
                  if (!formData.privacy) {
                    setErrorMessage('Devi accettare la Privacy Policy');
                    return;
                  }
                  setErrorMessage('');
                  setStep(5);
                }}
                className="flex-1 bg-blue-700 text-white font-bold py-4 px-4 rounded-lg hover:bg-blue-800 transition text-lg"
              >
                Avanti →
              </button>
            </div>

            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 border-2 border-red-500 rounded-lg">
                <p className="text-red-700 font-semibold text-center">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===== STEP 5: Conferma =====
  if (step === 5) {
    const servizio = servizi.find(s => s.id === selectedServizio);

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Prenota la Tua Visita</h1>
            <p className="text-gray-600">Step 5 di 5: Conferma</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-blue-700 h-2 rounded-full w-full transition-all"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Riepilogo Prenotazione</h2>

            <div className="space-y-3 mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-700">
              <p className="text-gray-700"><strong>Data:</strong> {selectedData?.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-gray-700"><strong>Orario:</strong> {selectedOrario} - {servizio?.durata} min</p>
              <p className="text-gray-700"><strong>Servizio:</strong> {servizio?.nome}</p>
              <p className="text-gray-700"><strong>Prezzo:</strong> €{servizio?.prezzo}</p>
              <hr className="my-3" />
              <p className="text-gray-700"><strong>Nome:</strong> {formData.nome}</p>
              <p className="text-gray-700"><strong>Email:</strong> {formData.email}</p>
              <p className="text-gray-700"><strong>Telefono:</strong> {formData.telefono}</p>
              {formData.note && <p className="text-gray-700"><strong>Note:</strong> {formData.note}</p>}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg mb-8">
              <p className="text-gray-700">Controlla che i dati siano corretti, poi conferma la prenotazione. Ti consigliamo di annotare data e ora dell'appuntamento.</p>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition text-sm"
              >
                Modifica
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition text-sm"
              >
                Annulla
              </button>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full bg-green-500 text-white font-bold py-4 px-4 rounded-lg hover:bg-green-600 transition text-lg"
            >
              CONFERMA PRENOTAZIONE
            </button>
          </div>
        </div>

        {/* Modal conferma */}
        <Modal
          isOpen={showConfirmModal}
          title="Conferma Prenotazione"
          message={`Confermi la prenotazione per il ${selectedData?.toLocaleDateString('it-IT')} alle ${selectedOrario}?`}
          onConfirm={handleConfirmaPrenotazione}
          onCancel={() => setShowConfirmModal(false)}
          confirmText="Conferma"
          cancelText="Annulla"
        />
      </div>
    );
  }
};

export default Prenotazioni;

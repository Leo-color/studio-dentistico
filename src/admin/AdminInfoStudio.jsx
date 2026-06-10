import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

export const AdminInfoStudio = () => {
  const { studio, updateStudio } = useStudio();
  const [expandedSection, setExpandedSection] = useState('generale');
  const [formData, setFormData] = useState(studio);
  const [savedMessage, setSavedMessage] = useState('');

  // Sincronizza formData quando studio cambia da Firebase
  React.useEffect(() => {
    setFormData(studio);
  }, [studio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (section) => {
    updateStudio(formData);
    setSavedMessage('✓ Dati salvati con successo!');

    // Rimuovi il messaggio dopo 3 secondi
    setTimeout(() => {
      setSavedMessage('');
    }, 3000);
  };

  const sections = [
    {
      key: 'generale',
      title: 'Informazioni Generali',
      fields: [
        { name: 'nome', label: 'Nome Studio' },
        { name: 'indirizzo', label: 'Indirizzo' },
        { name: 'cap', label: 'CAP' },
        { name: 'citta', label: 'Città' },
        { name: 'provincia', label: 'Provincia' },
      ]
    },
    {
      key: 'contatti',
      title: 'Contatti',
      fields: [
        { name: 'telefono', label: 'Telefono', type: 'tel' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'whatsapp', label: 'WhatsApp', type: 'tel' },
      ]
    },
    {
      key: 'dottore',
      title: 'Informazioni Dottore',
      fields: [
        { name: 'dottore', label: 'Nome Dottore' },
        { name: 'specializzazioni', label: 'Specializzazioni', type: 'textarea' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin/dashboard" className="text-blue-700 hover:underline mb-4 inline-block">
            ← Torna al Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Modifica Dati Studio</h1>
          <p className="text-gray-600">Aggiorna le informazioni del tuo studio</p>
        </div>

        {/* Accordion Sezioni */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {sections.map((section, idx) => (
            <div key={section.key} className={idx > 0 ? 'border-t border-gray-200' : ''}>
              {/* Header accordion */}
              <button
                onClick={() => setExpandedSection(expandedSection === section.key ? null : section.key)}
                className="w-full bg-gradient-to-r from-blue-100 to-cyan-100 p-6 flex justify-between items-center hover:bg-blue-50 transition"
              >
                <span className="text-xl font-bold text-gray-900">
                  {section.title}
                </span>
                <span className={`transform transition ${expandedSection === section.key ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Content accordion */}
              {expandedSection === section.key && (
                <div className="p-8 bg-gray-50">
                  <div className="space-y-4 mb-6">
                    {section.fields.map(field => (
                      <div key={field.name}>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
                          />
                        ) : (
                          <input
                            type={field.type || 'text'}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-700 font-semibold"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSave(section.key)}
                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition"
                  >
                    ✓ SALVA QUESTA SEZIONE
                  </button>

                  {/* Messaggio Successo */}
                  {savedMessage && (
                    <div className="mt-3 p-3 bg-green-50 border-2 border-green-500 rounded-lg">
                      <p className="text-green-700 font-bold text-center">{savedMessage}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Salva Tutto */}
        <button
          onClick={() => handleSave('tutti')}
          className="w-full mt-8 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold py-4 px-4 rounded-lg hover:from-blue-800 hover:to-blue-900 transition text-lg shadow-lg"
        >
          ✓ SALVA TUTTI I DATI
        </button>

        {/* Messaggio Successo */}
        {savedMessage && (
          <div className="mt-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
            <p className="text-green-700 font-bold text-center text-lg">{savedMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInfoStudio;

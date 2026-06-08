import React from 'react';

export const GoogleMap = ({ indirizzo, citta }) => {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        src={`https://www.google.com/maps?q=${encodeURIComponent(`${indirizzo}, ${citta}`)}&output=embed`}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mappa Studio Dentistico"
      ></iframe>
    </div>
  );
};

export default GoogleMap;

import React from 'react';

export const WavyDivider = () => {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="w-full h-16 text-blue-700"
      style={{ display: 'block', marginTop: '-1px' }}
    >
      <path
        d="M0,30 Q360,10 720,30 T1440,30 L1440,80 L0,80 Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default WavyDivider;

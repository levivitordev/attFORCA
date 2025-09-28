import React from 'react';

const HEAD = (
  <circle key="head" cx="200" cy="80" r="30" />
);

const BODY = (
  <line key="body" x1="200" y1="110" x2="200" y2="200" />
);

const LEFT_ARM = (
  <line key="left-arm" x1="200" y1="140" x2="150" y2="180" />
);

const RIGHT_ARM = (
  <line key="right-arm" x1="200" y1="140" x2="250" y2="180" />
);

const LEFT_LEG = (
  <line key="left-leg" x1="200" y1="200" x2="150" y2="250" />
);

const RIGHT_LEG = (
  <line key="right-leg" x1="200" y1="200" x2="250" y2="250" />
);


const BODY_PARTS = [HEAD, BODY, LEFT_ARM, RIGHT_ARM, LEFT_LEG, RIGHT_LEG];

export default function HangmanSVG({ stage = 0 }) {
  
  const partsToShow = BODY_PARTS.slice(0, stage);

  return (
    
    <svg 
      viewBox="0 0 300 350" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="15" 
      strokeLinecap="round"
    >
      <line x1="50" y1="300" x2="250" y2="300" /> {/* Base */}
      <line x1="100" y1="300" x2="100" y2="20" />  {/* Poste */}
      <line x1="100" y1="20" x2="200" y2="20" />   {/* Viga */}
      <line x1="200" y1="20" x2="200" y2="50" />   {/* Corda */}
      
      {partsToShow}
    </svg>
  );
}
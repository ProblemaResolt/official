import React from 'react';

export const splitTextToSpans = (text) => {
  return text.split('').map((char, i) => (
    <span 
      key={i} 
      className="drop-animation"
      style={{ '--char-index': i }}
    >
      {char}
    </span>
  ));
};

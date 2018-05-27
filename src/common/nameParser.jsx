import React from 'react';

const parser = (string) => {
  while (string.includes(' ')) {
    string = string.replace(' ' ,'');
  }
  return string;
};

export default parser;

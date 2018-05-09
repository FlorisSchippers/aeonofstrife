import React from 'react';

const parser = (string) => {
  while (string.includes('/')) {
    string = string.substring(string.indexOf("/") + 1);
  }
  // while (string.includes('-')) {
  //   string = string.replace('-', ' ');
  // }
  return string;
};

export default parser;

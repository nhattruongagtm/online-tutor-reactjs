// AAABBCAA
// -->A3B2C1A2

import React from 'react';

type Props = {};

const test = (props: Props) => {
  const test = (text: String) => {
    let count = 1;
    let rs = '';
    const textString = text.split('');
    for (let i = 0; i < textString.length; i++) {
      if (textString[i] === textString[i + 1]) {
        count++;
      }
      else{
        rs+=textString[i]+count;
      }
    }
    return rs;
  };

  return <div>{test}</div>;
};

export default test;

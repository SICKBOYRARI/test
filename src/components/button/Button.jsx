import React from 'react';
import './Button.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import block from 'bem-cn';

const b = block('button');

function Button({ type, onClick, text }) {
  return (
  // eslint-disable-next-line react/button-has-type
    <button className={`${b({ type })}`} type={type} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;

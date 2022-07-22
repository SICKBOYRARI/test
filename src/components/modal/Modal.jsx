import React, { useContext, useEffect, useMemo } from 'react';
import './Modal.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import block from 'bem-cn';
import { createPortal } from 'react-dom';
import { ModalContext } from '../../context/context';

const m = block('modal');
const c = block('cross');

const ModalRootElement = document.querySelector('#modal');

function Modal({ children }) {
  const { closeModal } = useContext(ModalContext);

  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    ModalRootElement.appendChild(element);

    return () => { ModalRootElement.removeChild(element); };
  }, []);

  return createPortal(
    <div className={m()} role="presentation" onClick={() => closeModal()}>
      <div className={m('content')} onClick={(e) => e.stopPropagation()} role="presentation">
        {children}
        <img
          onClick={() => closeModal()}
          className={c()}
          src="https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/TdCEremeWv5.png"
          alt=""
          width="24"
          height="24"
          role="presentation"
        />
      </div>
    </div>,
    ModalRootElement,
  );
}

export default Modal;

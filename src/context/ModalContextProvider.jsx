import React, { useMemo, useState } from 'react';
import { ModalContext } from './context';
import Modal from '../components/modal/Modal';

export default function ModalProvider({ children }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (modalConfig) => {
    setModalContent(modalConfig);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const valueModalProvider = useMemo(() => ({
    openModal,
    closeModal,
  }), [openModal, closeModal]);

  return (
    <ModalContext.Provider value={valueModalProvider}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {modalOpened && <Modal {...modalContent} />}
      {children}
    </ModalContext.Provider>
  );
}

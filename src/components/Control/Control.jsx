import React, { useContext } from 'react';
import Button from '../button/Button';
import Registration from '../registration/Registration';
import { ModalContext } from '../../context/context';

export default function Control() {
  const { openModal } = useContext(ModalContext);

  const handleClickFirstButton = () => {
    openModal({
      children: <Registration />,
    });
  };

  const handleClickSecondButton = () => {
    openModal({
      children: <h1>SECOND MODAL</h1>,
    });
  };

  return (
    <>
      <Button text="Registration" type="button" onClick={handleClickFirstButton} />
      <Button text="Registration" type="button" onClick={handleClickSecondButton} />
    </>
  );
}

import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export const ConfirmDeletePopup = (props) => {
  const { isOpen, onClose, onCardDelete, btn } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete();
  };

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      btn={btn}
      isOpen={isOpen && 'popup_opened'}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
};

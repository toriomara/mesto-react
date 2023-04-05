import React, { useState } from 'react';
import { PopupWithForm } from './PopupWithForm';

export const AddPlacePopup = (props) => {
  const { isOpen, onClose, onAddPlace, isLoading } = props;

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
    // Занулил тут инпуты, но не знаю надо ли (т.е. соответствует ли логике) и правильно ли.
    // На мой взгляд логично, так как место, в отличие от имени, почти всегда новое
    setName('');
    setLink('');
  };

  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      buttonText='Сохранить'
      buttonTextLoading='Сохранение...'
      isLoading={isLoading}
      isOpen={isOpen && 'popup_opened'}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className='form__input form__input_card_name'
        id='name-card'
        name='card-name'
        type='text'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        value={name}
        onChange={handleChangeName}
        required
      />
      <span className='form__input-error name-card-error'></span>
      <input
        className='form__input form__input_card_link'
        id='link-card'
        name='card-link'
        type='url'
        placeholder='Ведите адрес ссылки'
        value={link}
        onChange={handleChangeLink}
        required
      />
      <span className='form__input-error link-card-error'></span>
    </PopupWithForm>
  );
};

import '../index.css';
import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { PopupWithForm } from './PopupWithForm';
import { ImagePopup } from './ImagePopup';

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({ ...card, isClicked: true });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  return (
    <div className='page'>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      {/* Popup Profile */}
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        btn='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label htmlFor='name'>
          <input
            className='form__input form__input_profile_name'
            id='name-profile'
            name='name'
            type='text'
            placeholder='Имя'
            minLength='2'
            maxLength='40'
            required
          />
          <span className='form__input-error name-profile-error'></span>
        </label>
        <label htmlFor='job'>
          <input
            className='form__input form__input_profile_job'
            id='job-profile'
            name='job'
            type='text'
            placeholder='Сфера деятельности'
            minLength='2'
            maxLength='200'
            required
          />
          <span className='form__input-error job-profile-error'></span>
        </label>
      </PopupWithForm>

      {/* Popup Card */}
      <PopupWithForm
        name='card'
        title='Новое место'
        btn='Сохранить'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className='form__input form__input_card_name'
          id='name-card'
          name='card-name'
          type='text'
          placeholder='Название'
          minLength='2'
          maxLength='30'
          required
        />
        <span className='form__input-error name-card-error'></span>
        <input
          className='form__input form__input_card_link'
          id='link-card'
          name='card-link'
          type='url'
          placeholder='Ведите адрес ссылки'
          required
        />
        <span className='form__input-error link-card-error'></span>
      </PopupWithForm>

      {/* <!-- Popup Avatar--> */}
      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        btn='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className='form__input form__input_avatar'
          id='avatar-card'
          name='card-avatar'
          type='url'
          placeholder='Ведите адрес ссылки на аватар'
          required
        />
        <span className='form__input-error avatar-card-error'></span>
      </PopupWithForm>

      {/* <!-- Popup Confirm--> */}
      <PopupWithForm
        name='confirm'
        title='Вы уверены?'
        btn='Да'
        onClose={closeAllPopups}
      ></PopupWithForm>

      {/* <!-- Popup Image--> */}
      <ImagePopup onClose={closeAllPopups} card={selectedCard}></ImagePopup>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Card } from './Card';

export const Main = (props) => {
  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props;

  const [userName, setUserName] = useState('');
  const [userDescription, setuserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserName(userData.name);
        setuserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  return (
    <main className='content'>
      {/* Profile */}
      <section className='profile'>
        <div className='profile__main'>
          <div
            className='profile__avatar-container'
            // style={{ backgroundImage: `url(${userAvatar})` }}
          >
            <img className='profile__avatar' src={userAvatar} alt='Аватар' />
            <button
              className='profile__avatar-edit-button'
              type='button'
              aria-label='Смена аватара'
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className='profile__info'>
            <div className='profile__info-wrapper'>
              <h1 className='profile__name'>{userName}</h1>
              <button
                className='profile__edit-button'
                type='button'
                aria-label='Редактировать'
                onClick={onEditProfile}
              ></button>
            </div>
            <p className='profile__job'>{userDescription}</p>
          </div>
        </div>
        <button
          className='profile__button'
          type='button'
          aria-label='Добавить'
          onClick={onAddPlace}
        ></button>
      </section>
      {/* Cards */}
      <section className='cards' id='cards'>
        {cards.map((item) => (
          <Card key={item._id} card={item} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
};

import '../index.css';
import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { ImagePopup } from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { ConfirmDeletePopup } from './ConfirmDeletePopup';

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedDelete, setSelectedDelete] = useState('');

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  const saveButton = isSaving ? 'Сохранение...' : 'Сохранить';
  const deleteButton = isDeleting ? 'Удаление...' : 'Да';

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

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const handleUpdateUser = (userData) => {
    api
      .setUserInfo(userData)
      .then((res) => setCurrentUser(res))
      .finally(() => setIsSaving(true))
      .catch((err) => console.log(`Ошибка: ${err}`));
    closeAllPopups();
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .setUserAvatar(avatar)
      .then((res) => setCurrentUser(res))
      .finally(() => setIsSaving(true))
      .catch((err) => console.log(`Ошибка: ${err}`));
    closeAllPopups();
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addCard({ name, link })
      .then((res) => setCards([res, ...cards]))
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsSaving(true));
    closeAllPopups();
  };

  const handleCardDelete = (card) => {
    setIsConfirmDeletePopupOpen(true);
    setSelectedDelete(card);
  };

  const handleConfirmDelete = () => {
    api
      .removeCard(selectedDelete._id)
      .then(() => {
        setCards(cards.filter((card) => selectedDelete._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsDeleting(true));
  };

  const handleEscOverlayClose = (e) => {
    if (e.key === 'Escape' || e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscOverlayClose);
    document.addEventListener('mousedown', handleEscOverlayClose);
    return () => {
      document.removeEventListener('keydown', handleEscOverlayClose);
      document.removeEventListener('mousedown', handleEscOverlayClose);
    };
  });

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          btn={saveButton}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          btn={saveButton}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          btn={saveButton}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleConfirmDelete}
          btn={deleteButton}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;

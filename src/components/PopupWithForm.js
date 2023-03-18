import React from 'react';

export const PopupWithForm = (props) => {
  const { name, title, children, btn, isOpen, onClose } = props;
  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          className='popup__close-button'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        ></button>
        <h2 className='popup__title'>{title}</h2>
        <form className='form' name={name} noValidate>
          <fieldset className='form__set'>
            {children}
            <button
              className='form__save-button'
              type='submit'
              aria-label={btn}
            >
              {btn}
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

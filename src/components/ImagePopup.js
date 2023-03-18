export const ImagePopup = (props) => {
  const { card, onClose } = props;
  return (
    <section
      className={`popup popup_image ${card.isClicked ? 'popup_opened' : ''}`}
    >
      <div className='image-container'>
        <figure className='image-container__figure'>
          <button
            className='popup__close-button popup__close-button_image image-container__close-button'
            type='button'
            aria-label='Закрыть'
            onClick={onClose}
          ></button>
          <img
            className='image-container__image'
            alt={card.name}
            // src={card.link}
            // Если использовыть строчку выше появляется ошибка — Invalid value for
            // prop `src` on <img> tag. Either remove it from the element, or pass
            // a string or number value to keep it in the DOM...

            // Погуглил и нашёл решение на stack overflow
            src={card ? card.link : ''}
          />
          <figcaption className='image-container__caption'>
            {card.name}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

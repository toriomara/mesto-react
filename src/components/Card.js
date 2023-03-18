export const Card = (props) => {
  const { card, onCardClick } = props;

  function handlCardClick() {
    onCardClick(card);
  }

  return (
    <article className='card'>
      <button
        className='card__button_trash'
        type='button'
        aria-label='Удалить'
      ></button>
      <img
        className='card__image'
        src={card.link}
        alt={card.name}
        onClick={handlCardClick}
      />
      <div className='card__title'>
        <h2 className='card__name'>{card.name}</h2>
        <div>
          <button
            className='card__button'
            type='button'
            aria-label='Нравится'
          ></button>
          <span className='card__likes-counter'>{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
};

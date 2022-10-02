import{useContext} from 'react';
import{CurrentUserContext} from '../context/CurrentUserContext';

function Card({name, card, link, likeAmount, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLike = card.likes.some((item) => item._id === currentUser._id);

  return (
    <article className="element">
      <img className="element__image" onClick={() => onCardClick(card)} src={link} alt={name}></img>
      <button 
        className={`element__btn-delete ${isOwn && 'element__btn-delete_active'}`}
        onClick={() => onCardDelete(card)} 
        type="button"
      ></button>
      <h2 className="element__title">{name}</h2>
      <button 
        className={`element__like-icon ${isLike && 'element__like-icon_active'}`}
        onClick={() => onCardLike(card)} 
        type="button"
      ></button>
      <span className="element__like-amount">{likeAmount > 0 ? likeAmount : ''}</span>
    </article>
  );
}

export default Card; 
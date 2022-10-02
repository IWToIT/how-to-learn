import { useContext } from 'react';
import Card from './Card';
import {CurrentUserContext} from '../context/CurrentUserContext';

function Main ({onAddPlace, onEditProfile, onEditAvatar, onCardDelete, onCardLike, onCard, cards}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
    <section className="profile">
      <div className="profile__info-container">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"></img>
        </div> 
        <div className="profile__info">
          <div className="profile__info-edit">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" onClick={onEditProfile} type="button"></button>
          </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
      </div>  
      <button className="profile__add-button" onClick={onAddPlace} type="button"></button>
    </section>
    <section className="elements">
      {cards.map((card) => (
        <Card 
          card={card}
          key={card._id}
          name={card.name}
          link={card.link}
          likeAmount={card.likes.length}
          onCardClick={onCard}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      ))}
    </section>
  </main>
  );
}

export default Main;
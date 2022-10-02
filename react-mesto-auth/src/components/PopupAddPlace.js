import PopupWithForm from './PopupWithForm';
import {useEffect, useState} from 'react';

export function PopupAddPlace({isOpen, onClose, onAddCard}) {
  const [nameCard, setNameCard] = useState('');
  const [linkCard, setLinkCard] = useState('');

  useEffect(() => {
    setNameCard('');
    setLinkCard('');
  }, [isOpen]);

  function handleValueChange(e) {
    if(e.target.name === 'name') {
      setNameCard(e.target.value);
    } else {
      setLinkCard(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: nameCard,
      link: linkCard
    })
  }

  return (
    <PopupWithForm
      popupName="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        name="name"
        className="popup__input  popup__input_type_place"
        id="place-card-input"
        placeholder="Название"
        minLength="2"
        maxLength="40"
        type="text"
        onChange={handleValueChange}
        value={nameCard || ""}
        required
      />
      <span
        className="popup__input-error place-card-input-error">
      </span>
      <input
        name="link"
        className="popup__input  popup__input_type_link"
        id="link-card-input"
        placeholder="Ссылка на картинку"
        type="url"
        onChange={handleValueChange}
        value={linkCard || ""}
        required
      />
      <span
        className="popup__input-error link-card-input-error">
      </span>
    </PopupWithForm>
  );
}
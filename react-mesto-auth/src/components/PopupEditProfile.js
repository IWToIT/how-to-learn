import PopupWithForm from "./PopupWithForm";
import {useState, useContext, useEffect} from "react";
import {CurrentUserContext} from '../context/CurrentUserContext';

export function PopupEditProfile({isOpen, onClose, onChangeUser}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  function handleValueChange(e) {
    if(e.target.name === "name") {
      setName(e.target.value);
    } else {
      setAbout(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onChangeUser({
      name: name,
      about: about
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      popupName="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        className="popup__input  popup__input_type_name"
        name="name"
        id="name-author-input"
        placeholder="Ваше имя"
        type="text"
        minLength="2"
        maxLength="40"
        onChange={handleValueChange}
        value={name || ""}
        required
      />
      <span 
        className="popup__input-error name-author-input-error">
      </span>
      <input
        className="popup__input  popup__input_type_profession"
        name="about"
        id="name-author-profession-input"
        placeholder="Ваша профессия"
        type="text"
        minLength="2"
        maxLength="200"
        onChange={handleValueChange}
        value={about || ""}
        required
      />
      <span 
        className="popup__input-error name-author-profession-input-error">
      </span>
    </PopupWithForm>
  )
}
function PopupWithForm({popupName, title, children, isOpen, onClose, buttonText, onSubmit}) {
  return (
    <div className={`popup popup_type_${popupName} ${isOpen && 'popup_open'}`} onClick={onClose}>
      <div 
        className="popup__container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="popup__btn-close" onClick={onClose} type="button"></button>
        <form className="popup__form" onSubmit={onSubmit} name={popupName}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__btn-save" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
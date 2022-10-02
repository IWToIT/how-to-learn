function ImagePopup({popupName, selectedCard, onClose, isOpen}) {
  return (
    <div className={`popup popup_type_${popupName} ${isOpen && 'popup_open'}`} onClick={onClose}>
      <div 
        className="popup__container-scale"
          onClick={(e) => {
            e.stopPropagation();
          }}
      >
        <button className="popup__btn-close" onClick={onClose} type="button"></button>
        <form className="popup__form-scale">
          <div className="popup__figure">
            <img className="popup__image-scale" src={selectedCard.link} alt={selectedCard.name}></img>
            <figcaption className="popup__title-scale">{selectedCard.name}</figcaption>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImagePopup;
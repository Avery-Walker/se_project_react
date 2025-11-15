import { useContext } from "react";
import x from "../../assets/x.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, openConfirmModal }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card?.owner === currentUser?._id;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img className="modal__close-btn" src={x} alt="close icon" />
        </button>

        <img src={card?.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          {isOwn && (
            <button
              onClick={() => {
                onClose();
                openConfirmModal();
              }}
              className="modal__delete-btn"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

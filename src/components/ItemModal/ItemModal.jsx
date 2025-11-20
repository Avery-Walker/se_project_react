import "./ItemModal.css";
import { useContext } from "react";
import x from "../../assets/x.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, openConfirmModal }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card?.owner === currentUser?._id;

  if (!card) return null;

  return (
    <div className={`modal item-modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="item-modal__content">
        <button onClick={onClose} type="button" className="item-modal__close">
          <img className="item-modal__close-btn" src={x} alt="close" />
        </button>

        <img
          src={card.imageUrl}
          alt={card.name}
          className="item-modal__image"
        />

        <div className="item-modal__footer">
          <div className="item-modal__text">
            <h2 className="item-modal__name">{card.name}</h2>
            <p className="item-modal__weather">Weather: {card.weather}</p>
          </div>

          {isOwn && (
            <button
              className="item-modal__delete-btn"
              onClick={openConfirmModal}
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

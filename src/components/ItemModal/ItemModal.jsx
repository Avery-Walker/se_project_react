import "./ItemModal.css";
import { useContext } from "react";
import x from "../../assets/x.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, openConfirmModal }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card?.owner === currentUser?._id;

  return (
    <div className={`item-modal ${isOpen ? "item-modal_opened" : ""}`}>
      <div className="item-modal__content item-modal__content_type_image">
        <button onClick={onClose} type="button" className="item-modal__close">
          <img className="item-modal__close-btn" src={x} alt="close icon" />
        </button>

        <img
          src={card?.imageUrl}
          alt={card?.name}
          className="item-modal__image"
        />

        <div className="item-modal__footer">
          <h2 className="item-modal__caption">{card?.name}</h2>
          <p className="item-modal__weather">Weather: {card?.weather}</p>

          {isOwn && (
            <button
              onClick={() => {
                onClose();
                openConfirmModal();
              }}
              className="item-modal__delete-btn"
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

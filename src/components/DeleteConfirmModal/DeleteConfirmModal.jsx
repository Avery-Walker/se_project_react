import "./DeleteConfirmModal.css";
import dark from "../../assets/dark.svg";

function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`delete-modal ${isOpen ? "delete-modal_opened" : ""}`}>
      <div className="delete-modal__content">
        <button onClick={onClose} type="button" className="delete-modal__close">
          <img
            className="delete-modal__close-btn"
            src={dark}
            alt="close icon"
          />
        </button>
        <p className="delete-modal__message">
          Are you sure you want to delete this item?
          <br />
          <span className="delete-modal__warning">
            This action is irreversible.
          </span>
        </p>
        <div className="delete-modal__actions">
          <button onClick={onConfirm} className="delete-modal__confirm-btn">
            Yes, delete item
          </button>
          <button onClick={onClose} className="delete-modal__cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;

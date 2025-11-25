import "./ModalWithForm.css";
import x from "../../assets/x.svg";

function ModalWithForm({
  children,
  buttonText = "Save",
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  extraButton,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal-add-garment__content">
        <h2 className="modal__title">{title}</h2>

        <button onClick={onClose} type="button" className="modal__close">
          <img className="modal__close-btn" src={x} alt="close button" />
        </button>

        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}

          <div className="modal__button-row">
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>

            {extraButton && <div className="modal__extra">{extraButton}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

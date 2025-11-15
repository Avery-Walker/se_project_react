import { useEffect, useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import UserContext from "../../contexts/UserContext";

function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const { currentUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength="2"
          maxLength="30"
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;

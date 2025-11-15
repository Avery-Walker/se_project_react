import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = { name: "", avatar: "", email: "", password: "" };

const RegisterModal = ({ isOpen, onRegister, onClose }) => {
  const { values, handleChange, resetForm } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Your name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;

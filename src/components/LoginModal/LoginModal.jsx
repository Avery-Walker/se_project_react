import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = { email: "", password: "" };

const LoginModal = ({ isOpen, onLogin, onClose }) => {
  const { values, handleChange, resetForm } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
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

export default LoginModal;

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarPlaceholder from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, handleProfileClick, weatherData }) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const avatarToShow = currentUser?.avatar || avatarPlaceholder;
  const firstLetter = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "?";

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="page logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>

        <button
          className="header__account-btn"
          onClick={handleProfileClick}
          type="button"
        >
          <p className="header__username">{currentUser?.name}</p>

          <div className="header__avatar-wrapper">
            <img
              className="header__avatar"
              src={avatarToShow}
              alt="User avatar"
            />
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;

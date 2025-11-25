import "./SideBar.css";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const { user } = useContext(UserContext);

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  const avatarToShow = user?.avatar;

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        {avatarToShow ? (
          <img
            className="sidebar__avatar"
            src={avatarToShow}
            alt={user?.name}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{firstLetter}</div>
        )}

        <p className="sidebar__username">{user?.name}</p>
      </div>

      <button className="sidebar__edit-button" onClick={onEditProfile}>
        Change profile data
      </button>

      <button className="sidebar__sign-out-button" onClick={onSignOut}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;

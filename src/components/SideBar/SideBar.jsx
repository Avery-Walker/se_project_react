import "./SideBar.css";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

function SideBar({ onEditProfile }) {
  const { user } = useContext(UserContext);

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  const avatarToShow = user?.avatar || null;

  return (
    <div className="sidebar">
      {avatarToShow ? (
        <img className="sidebar__avatar" src={avatarToShow} alt={user?.name} />
      ) : (
        <div className="sidebar__avatar-placeholder">{firstLetter}</div>
      )}

      <p className="sidebar__username">{user?.name}</p>

      <button className="sidebar__edit-button" onClick={onEditProfile}>
        Edit Profile
      </button>

      <button className="sidebar__sign-out-button" onClick={onSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default SideBar;

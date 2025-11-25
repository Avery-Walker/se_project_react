import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import notLikedIcon from "../../assets/notliked.svg";
import likedIcon from "../../assets/liked.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const user = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === user?._id);

  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />

      {user && (
        <div className="card__like-container">
          <button
            className={likeButtonClassName}
            onClick={handleLike}
            aria-label="like button"
          >
            <img
              src={isLiked ? likedIcon : notLikedIcon}
              alt={isLiked ? "liked" : "not liked"}
              className="card__like-icon"
            />
          </button>

          <span className="card__like-count">{item.likes?.length || 0}</span>
        </div>
      )}
    </li>
  );
}

export default ItemCard;

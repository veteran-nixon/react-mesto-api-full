import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_active' : ''}`);
    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (`element__trash-button ${isOwn ? 'element__trash-button_visible' : ''}`);

    function handleClick() {
        props.onCardClick(props.card);
      }

      function handleLikeClick() {
          props.onCardLike(props.card)
      }

      function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <div className="element">
            <img className="element__image" src={props.card.link} onClick={handleClick} alt={props.card.name} />
            <div className="element__caption">
                <h2 className="element__caption-heading">{props.card.name}</h2>
                <div className="element__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="like"></button>
                    <span className="element__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
            <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName} aria-label="trash"></button>
        </div>
    )
}

export default Card;

import React from "react"

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_picture ${props.card && 'popup_opened'}`}>
            <figure className="popup__container popup__container_type_picture">
                <button onClick={props.onClose} type="button" className="popup__close-icon" aria-label="close"></button>
                <img className="popup__image" src={props.card && props.card.link} alt={props.card && props.card.name} />
                <figcaption className="popup__heading popup__heading_type_picture">{props.card && props.card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;
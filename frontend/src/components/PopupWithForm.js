import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup ${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__close-icon" aria-label="close"></button>
                <h2 className="popup__heading">{props.title}</h2>
                <form onSubmit={props.handleSubmit} className="popup__form" name={`${props.name}-form`}>
                {props.children}
                <button type="submit" className="popup__submit-button" aria-label="submit" id={`${props.name}__submit-button`}>{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;
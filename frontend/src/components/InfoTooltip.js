import React from "react";
import succesImage from '../images/succes_image.svg';
import failImage from '../images/fail_image.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__close-icon" aria-label="close"></button>
                <img className="popup__info-tooltip-image" src={props.isSucces ? succesImage : failImage} alt={props.name} />
                <h2 className="popup__info-tooltip-heading">{props.isSucces ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;
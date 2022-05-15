import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    React.useEffect(() => {
        setCardName('')
        setCardLink('')
    }, [props.isOpen]);

    function handleChangeCardName(event) {
        setCardName(event.target.value)
    }

    function handleChangeCardLink(event) {
        setCardLink(event.target.value)
    }

    function handleSubmit(event) {
        // Запрещаем браузеру переходить по адресу формы
        event.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onLoadNewCard({
          name: cardName,
          link: cardLink,
        });

        props.onClose();
      }

    return (
        <PopupWithForm title="Новое место" name="card" handleSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить">
            <label className="popup__field">
                <input value={cardName} onChange={handleChangeCardName} className="popup__input popup__input_type_card-add-heading" id="heading-input" type="text" name="heading" placeholder="Название" autoComplete="off" required minLength="2" maxLength="30" />
                <span className="popup__input-error heading-input-error"></span>
            </label> 
            <label className="popup__field">
                <input value={cardLink} onChange={handleChangeCardLink} className="popup__input popup__input_type_card-add-link" id="link-input" type="url" name="link" placeholder="Ссылка на картинку" autoComplete="off" required />
                <span className="popup__input-error link-input-error"></span>
            </label>
      </PopupWithForm>
    )
}

export default AddPlacePopup;
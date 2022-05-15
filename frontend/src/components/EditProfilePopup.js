import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(event) {
        setName(event.target.value)
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value)
    }

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    
    React.useEffect(() => {
        if (currentUser.name) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    function handleSubmit(event) {
        // Запрещаем браузеру переходить по адресу формы
        event.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });

        props.onClose();
      }

  

    return (
        <PopupWithForm title="Редактировать профиль" name="profile" handleSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить">
            <label className="popup__field">
                <input value={name} onChange={handleChangeName} className="popup__input popup__input_type_profile-name" id="name-input" type="text" name="name" placeholder="Имя" autoComplete="off" required />
                <span className="popup__input-error name-input-error"></span>
            </label>
            <label className="popup__field">
                <input value={description} onChange={handleChangeDescription} className="popup__input popup__input_type_profile-bio" id="bio-input" type="text" name="about" placeholder="О себе" autoComplete="off" required />
                <span className="popup__input-error bio-input-error"></span>
            </label>
      </PopupWithForm>
    )
}

export default EditProfilePopup;
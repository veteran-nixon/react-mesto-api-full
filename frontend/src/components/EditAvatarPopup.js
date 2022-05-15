import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(event) {
      event.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });

        props.onClose();
      }
      
    return (
        <PopupWithForm title="Обновить аватар" name="avatar" handleSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить">
        <label className="popup__field">
          <input ref={avatarRef} className="popup__input popup__input_type_avatar" id="avatar-input" type="url" name="avatar" placeholder="Ссылка на новый аватар" autoComplete="off" required />
          <span className="popup__input-error avatar-input-error"></span>
        </label>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;
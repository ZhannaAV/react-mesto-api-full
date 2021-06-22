import React from "react";
import PopupWithForm from "./PopupWithForm";

//https://github.com/ZhannaAV/portfolio/blob/main/image/avatar.jpg?raw=true

function EditAvatarPopup(props) {
    const {isOpen, onClose, onUpdateAvatar, btnText} = props
    const avatarRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm isOpen={isOpen ? 'popup_opened' : ''} onClose={onClose} btnText={btnText}
                       name='avatar' title='Обновить аватар' onSubmit={handleSubmit}>
            <fieldset className="popup__input-field">
                <input id="avatar" className="popup__input popup__input_type_avatar" type="url"
                       name="avatar"
                       placeholder="Ссылка на изображение"
                       required ref={avatarRef}/>
                <span className="popup__input-error avatar-error"/>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup
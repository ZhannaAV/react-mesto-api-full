import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext)
    const {isOpen, onClose, onUpdateUser, btnText} = props
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

//если данные корректировались, но не сохранились - обновляет значение полей на прежнее
    function close() {
        onClose()
        setName(currentUser.name);
        setDescription(currentUser.about);
    }

    return (
        <PopupWithForm isOpen={isOpen && 'popup_opened'} onClose={close} onSubmit={handleSubmit} btnText={btnText}
                       name='edit-profile'
                       title='Редактировать профиль'>
            <fieldset className="popup__input-field">
                <input id="profile-name" className="popup__input popup__input_type_name" type="text"
                       name="name"
                       placeholder="Имя"
                       minLength="2" maxLength="40"
                       required onChange={handleChangeName} value={name}/>
                <span className="popup__input-error profile-name-error"></span>
                <input id="about" className="popup__input popup__input_type_about" type="text" name="about"
                       placeholder="О себе"
                       minLength="2" maxLength="200"
                       required onChange={handleChangeDescription} value={description}/>
                <span className="popup__input-error about-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup
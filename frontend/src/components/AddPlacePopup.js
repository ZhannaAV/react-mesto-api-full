import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const {isOpen, onAddPlace, onClose, btnText} = props
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    React.useEffect(() => {
        if (!isOpen) {
            setName('');
            setLink('')
            }
    },[isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({name, link});
    }

    return (
        <PopupWithForm isOpen={isOpen && 'popup_opened'} onClose={onClose} onSubmit={handleSubmit} btnText={btnText}
                       name='add-card'
                       title='Новое место'>
            <fieldset className="popup__input-field">
                <input id="place-name" className="popup__input popup__input_type_place" type="text"
                       name="name"
                       placeholder="Название"
                       minLength="2" maxLength="30"
                       required onChange={handleChangeName} value={name}/>
                <span className="popup__input-error place-name-error"></span>
                <input id="link" className="popup__input popup__input_type_url" type="url" name="link"
                       placeholder="Ссылка на картинку"
                       required onChange={handleChangeLink} value={link}/>
                <span className="popup__input-error link-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup
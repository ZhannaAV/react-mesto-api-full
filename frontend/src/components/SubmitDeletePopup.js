import React from "react";
import PopupWithForm from "./PopupWithForm";

function SubmitDeletePopup(props){
    const {isOpen, onClose, btnText, onCardDelete} = props

    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete()
    }

    return(
        <PopupWithForm isOpen={isOpen && 'popup_opened'} name={'submit'} title='Вы уверены?' onClose={onClose} btnText={btnText} onSubmit={handleSubmit}/>
    )
}
export default SubmitDeletePopup
import React from 'react'

function PopupWithForm(props) {
    const {name, isOpen,onSubmit, title, children, onClose, btnText} = props
    const form = (name === 'submit') ? 'popup__form popup__form_for_submit' : 'popup__form'
    return (
        <div className={`popup popup_for_${name} ${isOpen}`}>
            <form className={form} name={`form-${name}`} onSubmit={onSubmit}>
                <h2 className="popup__title">{title}</h2>
                {children}
                <button className="popup__submit-button" type="submit">{btnText}</button>
                <button className="popup__close" type="button" aria-label="закрыть окно"
                        onClick={onClose}/>
            </form>
        </div>
    )
}

export default PopupWithForm
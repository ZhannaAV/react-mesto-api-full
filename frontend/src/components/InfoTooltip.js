import React from 'react'
import okIcon from '../images/ok.svg'
import notOkIcon from '../images/not-ok.svg'

function InfoTooltip(props) {
    const {isOpen, onClose, status, message} = props

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__window">
                <img className="popup__icon" src={status ? okIcon : notOkIcon} alt="галочка"/>
                <h2 className="popup__title popup__title_for_tooltip">{message}</h2>
                <button onClick={onClose} className="popup__close popup__close_for_tooltip" type="button"
                        aria-label="закрыть окно"/>
            </div>
        </div>
    )
}

export default InfoTooltip
import React from 'react'

function ImagePopup(props) {
    const {card} = props;
    return (
        <div className={`popup popup_for_image ${card && 'popup_opened'}`}>
            <figure className="popup__figure">
                <img className="popup__image"
                     src={card ? card.link : ''}
                     alt={card ? card.name : ''}/>
                <figcaption className="popup__figcaption">{card ? card.name : ''}</figcaption>
                <button onClick={props.onClose} className="popup__close" type="button"
                        aria-label="закрыть окно"/>
            </figure>
        </div>
    )
}

export default ImagePopup
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
    const{card} = props

    const currentUser = React.useContext(CurrentUserContext)

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner === currentUser._id;
    const cardDeleteBtnClassName = `card__delete ${!isOwn && 'card__delete_hidden'}`

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeBtnClassName = `card__like ${isLiked && 'card__like_active'}`


    function handleClick() {
        props.onCardClick(card);
    }

    function handleLikeClick(){
        props.onCardLike(card)
    }

    function handleDeleteClick(){
        props.onCardDelete(card)
    }

    return (
        <li className="card">
            <div className="card__image" onClick={handleClick}
                 style={{backgroundImage: `url(${card.link})`}}/>
            <div className="card__caption">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-group">
                    <button className={cardLikeBtnClassName} type="button" aria-label="поставить лайк" onClick={handleLikeClick}/>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
            </div>
            <button className={cardDeleteBtnClassName} type="button" aria-label="удалить карточку" onClick={handleDeleteClick}/>
        </li>
    )
}

export default Card
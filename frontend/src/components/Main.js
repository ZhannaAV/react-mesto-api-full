import React from 'react'
import avatarBtn from '../images/Avatar_button.svg'
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Main(props) {
    const {onEditAvatar, onAddPlace, onEditProfile, onCardClick, onCardLike, onCardDelete, cards} = props;
    const currentUser = React.useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-block">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя"/>
                    <button className="profile__avatar-button" type="button" aria-label="изменить аватар"
                            onClick={onEditAvatar}>
                        <img className="profile__avatar-svg" src={avatarBtn}
                             alt="значок редактирования"/>
                    </button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" aria-label="изменить профайл"
                            onClick={onEditProfile}/>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="добавить карточку"
                        onClick={onAddPlace}/>
            </section>
            <ul className="cards">
                {cards.map(card => (
                        <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike}
                              onCardDelete={onCardDelete}/>
                ))}
            </ul>
        </main>
    )
}

export default Main
import React from 'react'
import {Route, Switch, useHistory} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import ImagePopup from "./ImagePopup"
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from '../utils/api'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import SubmitDeletePopup from "./SubmitDeletePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import {SignContext} from "../contexts/SignContext";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth"

function App() {
    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false)
    const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setPlacePopupOpen] = React.useState(false)
    const [isSubmitPopupOpen, setSubmitPopupOpen] = React.useState(false)
    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [cardForDelete, setCardForDelete] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [isLoad, setIsLoad] = React.useState(false)
    const [loggedIn, setLoggedIn] = React.useState(false)//статус авторизации
    const [isSignUp, setSignUp] = React.useState(false)//статус регистрации
    let loadTextBtn = isLoad ? 'Сохранение..' : 'Сохранить'
    const [emailSign, setEmailSign] = React.useState('')//для почты в хедер
    const history = useHistory()


    React.useEffect(() => {
        if (localStorage.getItem('token')) api.getInitialProfile()
            .then(() => setLoggedIn(true))
    }, [])


    React.useEffect(() => {
        if (loggedIn) Promise.all([api.getInitialProfile(), api.getInitialCards()])
                .then(([userData, cards]) => {
                    setCurrentUser(userData);
                    setEmailSign(userData.email)
                    setCards(cards)
                    history.push('/')
                })
                .catch((err) => console.log(err))
    }, [loggedIn])


    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleEditAvatarClick() {
        setAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setPlacePopupOpen(true)
    }

    function showInfoTooltip(status) {
        setInfoTooltipOpen(true)
        setSignUp(status)
    }

    function closeAllPopups() {
        setAvatarPopupOpen(false)
        setProfilePopupOpen(false)
        setPlacePopupOpen(false)
        setSubmitPopupOpen(false)
        setSelectedCard(null)
        setInfoTooltipOpen(false)
    }

    function handleUpdateUser({name, about}) {
        setIsLoad(true)
        api.changeInfoProfile({name, about})
            .then(res => {
                setCurrentUser(res)
                setProfilePopupOpen(false)
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoad(false))

    }

    function handleUpdateAvatar({avatar}) {
        setIsLoad(true)
        api.changeAvatarProfile({avatar})
            .then(res => {
                setCurrentUser(res)
                setAvatarPopupOpen(false)
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoad(false))
    }

    //обновляет стейт карточек после полож. ответа api об изм лайка
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err))
    }

//открывает попап для подтверждения удаления
    function handleCardDeleteChoice(card) {
        setSubmitPopupOpen(true)
        setCardForDelete(card)
    }

//окончательно удаляет карточку
    function handleSubmitDeleteCard() {
        api.deleteCard(cardForDelete._id)
            .then(() => {
                setCards(cards.filter((c) => cardForDelete._id !== c._id))
                setSubmitPopupOpen(false)
            })
            .catch((err) => console.log(err))

    }

    //добавляет карточки
    function handleAddPlaceSubmit({name, link}) {
        setIsLoad(true)
        api.postNewCard({name, link})
            .then(res => {
                setCards([res, ...cards])
                setPlacePopupOpen(false)
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoad(false))
    }

    function handleRegister(email, password) {
        auth.register(email, password)
            .then(() => {
                showInfoTooltip(true) //открываем попап InfoTooltip
                history.push('/signin')
            })
            .catch((err) => {
                showInfoTooltip(false)//открываем попап InfoTooltip
                console.log(err)
            })
    }

    function handleLogin(email, password) {
        auth.authorize(email, password)
            .then((res) => {
                localStorage.setItem('token', res.token);
                setLoggedIn(true)
            })
            .catch((err) => {
                showInfoTooltip(false) //удобно для юзера видеть сообщение о неудаче и здесь
                console.log(err)
            })
    }

    return (
        <SignContext.Provider value={{loggedIn, setLoggedIn, emailSign, setEmailSign}}>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="App">
                    <div className="page__container">
                        <Header/>
                        <Switch>
                            <Route path='/signin'>
                                <Login onLogin={handleLogin}/>
                            </Route>

                            <Route path='/signup'>
                                <Register onRegister={handleRegister}/>
                            </Route>

                            <Route exact path='/'>
                                <ProtectedRoute component={Main} loggedIn={loggedIn}
                                                onEditAvatar={handleEditAvatarClick}
                                                onEditProfile={handleEditProfileClick}
                                                onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}
                                                onCardLike={handleCardLike}
                                                onCardDelete={handleCardDeleteChoice} cards={cards}/>
                            </Route>
                        </Switch>
                        {loggedIn && <Footer/>}

                        {/*попап редактирования аватара*/}
                        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                         onUpdateAvatar={handleUpdateAvatar} btnText={loadTextBtn}/>

                        {/*попап редактирования профайла*/}
                        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                          onUpdateUser={handleUpdateUser} btnText={loadTextBtn}/>

                        {/*попап добавления карточек*/}
                        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen}
                                       onClose={closeAllPopups} btnText={loadTextBtn}/>

                        {/*попап с картинкой*/}
                        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>

                        {/*{попап подтверждения}*/}
                        <SubmitDeletePopup isOpen={isSubmitPopupOpen} onClose={closeAllPopups}
                                           onCardDelete={handleSubmitDeleteCard} btnText={'Да'}/>
                        <InfoTooltip isOpen={isInfoTooltipOpen} status={isSignUp} onClose={closeAllPopups}
                                     message={isSignUp ? "Вы успешно зарегистрировались" : "Что-то пошло не" +
                                         " так!Попробуйте ещё раз."}/>
                    </div>
                </div>
            </CurrentUserContext.Provider>
        </SignContext.Provider>
    )
}

export default App;

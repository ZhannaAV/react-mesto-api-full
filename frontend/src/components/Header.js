import React from 'react'
import Logo from "../images/logo.svg";
import {Link, useLocation} from 'react-router-dom'
import {SignContext} from "../contexts/SignContext"

function Header() {
    const logContext = React.useContext(SignContext)
    const {loggedIn, setLoggedIn, emailSign} = logContext
    const [isBurgerOpen, setIsBurgerOpen] = React.useState(false)
    const {pathname} = useLocation()
    const signSwitch = () => {
        switch (pathname) {
            case '/signup':
                return {
                    to: "/signin",
                    title: "Войти"
                }
            default:
                return {
                    to: "/signup",
                    title: "Регистрация"
                }
        }
    }

    function handleUnlogged() {
        setLoggedIn(false)
        localStorage.setItem('token', '');
        handleBurgerMenuClose()

    }

    function handleBurgerMenuOpen() {
        setIsBurgerOpen(true)
    }

    function handleBurgerMenuClose() {
        setIsBurgerOpen(false)
    }

    return (
        <header className="header">
            <div
                className={`header__sign-block header__sign-block_type_mobile ${isBurgerOpen && "header__sign-block_opened"}`}>
                <p className="header__text">{emailSign}</p>
                <button className="header__button header__button_type_mobile" onClick={handleUnlogged}>Выйти</button>
            </div>
            <div className="header__inner">
                <img className="header__logo" src={Logo} alt="Логотип место россия"/>
                {loggedIn &&
                <div className="header__sign-block header__sign-block_type_desktop">
                    <p className="header__text">{emailSign}</p>
                    <button className="header__button" onClick={handleUnlogged}>Выйти</button>
                </div>}
                {loggedIn &&
                <>
                    <button onClick={handleBurgerMenuOpen}
                            className={`header__btn header__btn_type_burger ${isBurgerOpen && "header__btn_hidden"}`}/>
                    <button onClick={handleBurgerMenuClose}
                            className={`header__btn header__btn_type_close ${!isBurgerOpen && "header__btn_hidden"}`}/>
                </>}

                {!loggedIn &&
                <Link to={signSwitch().to}>
                    <button className="header__button header__button_unlogged">{signSwitch().title}</button>
                </Link>
                }
            </div>
        </header>
    )
}

export default Header


/*    const signUp = {
        to: "/sign-up",
        title: "Регистрация"
    }
    const signIn = {
        to: "/sign-in",
        title: "Войти"
    }
    //устанавливает находится ли юзер на странице входа
    const [isSignIn, setIsSignIn] = React.useState(true)

    //переключает значение при переключении между страницей регистрации и входа
    function handleUseRouteMatch() {
        setIsSignIn(!isSignIn)
    }*/

//устанавливает, что юзер не авторизован при клике на кнопку выхода
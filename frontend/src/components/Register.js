import React from 'react';
import {Link, withRouter} from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;
        this.props.onRegister(email, password)
    }

    render() {
        return (
            <section className="sign">
                <h2 className="sign__title">Регистрация</h2>
                <form className="sign__form" name="form-sign-up" onSubmit={this.handleSubmit}>
                    <fieldset className="sign__field">
                        <input id="sign-email" className="sign__input sign__input_type_email" type="email"
                               name="email"
                               placeholder="Email"
                               required onChange={this.handleChange} value={this.state.email}/>
                        <span className="sign__input-error sign-email-error"/>
                        <input id="sign-password" className="sign__input sign__input_type_password" type="password"
                               name="password"
                               placeholder="Пароль"
                               required onChange={this.handleChange} value={this.state.password}/>
                        <span className="sign__input-error sign-password-error"/>
                    </fieldset>
                    <button type="submit" className="sign__button">Зарегистрироваться</button>
                </form>
                <p className="sign__text">
                    Уже зарегистрированы?<Link className="sign__link" to="/sign-in"> Войти</Link>
                </p>
            </section>
        )
    }
}

export default withRouter(Register)
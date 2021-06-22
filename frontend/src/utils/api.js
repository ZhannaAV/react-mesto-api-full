import {baseUrl, personalData} from "./constants";

class Api {
    constructor(baseUrl, personalData) {
        this._baseUrl = baseUrl;
        this._cohortId = personalData.cohortId;
        this._token = personalData.token
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

//возвращает массив со всеми данными профиля с сервера
    getInitialProfile() {
        return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
            headers: {
                authorization: `${this._token}`
            }
        })
            .then(this._checkResponse);
    }

//меняет данные профайла на сервере и возвращает все данные профиля
    changeInfoProfile({name, about}) {
        return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkResponse);
    }

    //меняет данные профайла на сервере и возвращает все данные профиля
    changeAvatarProfile({avatar}) {
        return fetch(`${this._baseUrl}/${this._cohortId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .then(this._checkResponse);
    }

//возвращает массив со всеми данными профиля с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
            headers: {
                authorization: `${this._token}`,
            }
        })
            .then(this._checkResponse);
    }

    //добавляет карточку на сервер и возвращает ответ
    postNewCard({name, link}) {
        return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkResponse)
    }

    //удаляет карточку
    deleteCard(cardID) {
        return fetch(`${this._baseUrl}/${this._cohortId}/cards/${cardID}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`
            }
        })
            .then(this._checkResponse)
    }

//добавление и убирание лайка
    changeLikeCardStatus(cardId, isLiked) {
        const method = isLiked ? 'DELETE' : 'PUT';
        return fetch(`${this._baseUrl}/${this._cohortId}/cards/likes/${cardId}`, {
            method: method,
            headers: {
                authorization: `${this._token}`
            }
        })
            .then(this._checkResponse);
    }
}
const api = new Api(baseUrl, personalData);
export default api

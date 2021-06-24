// export const authUrl = 'https://auth.nomoreparties.co';
import {baseUrl} from "./constants";

function checkResponse(res){
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
        return fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
            .then(res => checkResponse(res))
    }

export const authorize = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then(res => checkResponse(res))
}




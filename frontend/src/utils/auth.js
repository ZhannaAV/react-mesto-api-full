export const authUrl = 'https://auth.nomoreparties.co';

function checkResponse(res){
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
        return fetch(`${authUrl}/signup`, {
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
    return fetch(`${authUrl}/signin`, {
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

export const getContent = (token) => {
    return fetch(`${authUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })
        .then(res => checkResponse(res))
}



class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getAllData() {
        return Promise.all([this.getUser(), this.getCard()])
    }

    getUser() {
        return fetch(`${this._url}/users/me`, { headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json',
        }, })
            .then(this._checkResponse)
    }

    getCard() {
        return fetch(`${this._url}/cards`, { headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json',
        }, })
            .then(this._checkResponse)
    }

    createNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._checkResponse)
    }

    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse)
    }

    editAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkResponse)
    }

    deleteCard(data) {
        return fetch(`${this._url}/cards/${data}`, {
            method: 'DELETE',
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json',
            },
        })
        .then(this._checkResponse)
    }

    putLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json',
            },
        })
        .then(this._checkResponse)
    }


    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json',
            },
        })
        .then(this._checkResponse)
    }
}

const api = new Api({
    url: 'http://api.mesto.dolganev.nomoredomains.xyz',
  });

  export default api;


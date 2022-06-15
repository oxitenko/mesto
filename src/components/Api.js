export class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      "Content-type": "application/JSON",
      authorization: "7becf5ad-f16c-4c69-8323-9b239c6a2ce7",
    };
  }

  _confirmStatusOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._confirmStatusOk);
  }

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.placename,
        link: data.linkplace,
      }),
    }).then(this._confirmStatusOk);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._confirmStatusOk);
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.profi,
      }),
    }).then(this._confirmStatusOk);
  }

  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._confirmStatusOk);
  }

  likeCard(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._confirmStatusOk);
  }

  deleteLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._confirmStatusOk);
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._confirmStatusOk);
  }
}

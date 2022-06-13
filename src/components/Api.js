export class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      "Content-type": "application/JSON",
      authorization: "7becf5ad-f16c-4c69-8323-9b239c6a2ce7",
    };
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Возникла ошибка");
    });
  }

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Возникла ошибка");
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Возникла ошибка");
    });
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.profi,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Возникла ошибка");
    });
  }

  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Возникла ошибка");
    });
  }

  likeCard(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        likes: data.likes,
      }),
    });
  }
}

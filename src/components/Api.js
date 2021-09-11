export default class Api {
  constructor(token, cohort) {
    this._token = token;
    this._cohort = cohort;
  }

  _checkRes (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._checkRes(res);
      })
  }

  getUserId() {
    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._checkRes(res);
      })
  }

  getCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._checkRes(res);
      })
  }
  x;

  changeProfile(item) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.nameInput,
        about: item.jobInput,
      }),
    })
      .then((res) => {
        return this._checkRes(res);
      })
  }

  changeProfileAvatar(item) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: `${this._token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: `${item.urlAvatarInput}`,
        }),
      }
    )
      .then((res) => {
        return this._checkRes(res);
      })
  }

  addCard(name, link) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      method: "POST",
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        return this._checkRes(res);
      })
      .then((res) => {
        return res;
      })
  }

  deleteCard(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `${this._token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return this._checkRes(res);
      })
  }

  likeCard(idCard) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohort}/cards/likes/${idCard}`,
      {
        method: "PUT",
        headers: {
          authorization: `${this._token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return this._checkRes(res);
      })
  }

  dislikeCard(idCard) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohort}/cards/likes/${idCard}`,
      {
        method: "DELETE",
        headers: {
          authorization: `${this._token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return this._checkRes(res);
      })
  }
}

export default class Api {
  constructor(token, cohort) {
    this._token = token;
    this._cohort = cohort;
  }

  getUserInfo() {
    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserId() {
    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      headers: {
        authorization: `${this._token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
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
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
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
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
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
        if (res.ok) {
          res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
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
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
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
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

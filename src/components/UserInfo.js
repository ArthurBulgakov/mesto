export default class UserInfo {
  constructor({ name, description }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
  }

  getUserInfo() {
    return {
      profileName: this._name.textContent,
      profileDescription: this._description.textContent,
    };
  }

  setUserInfo(userData) {
    if (userData.name !== '') {
      this._name.textContent = userData.name;
    } else {
      console.log('Что-то не так с именем')
    }
    if (userData.about !== '') {
      this._description.textContent = userData.about;
    } else {
      console.log('Что-то не так с описанием')
    }
  }
}

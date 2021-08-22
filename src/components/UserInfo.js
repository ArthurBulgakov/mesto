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

  setUserInfo(item) {
    this._name.textContent = item.nameInput;
    this._description.textContent = item.jobInput;
  }

}

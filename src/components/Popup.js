export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._overlay = this._popup.querySelector(".popup__overlay");
    this._handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };
    this._escHandler = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._escHandler);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._escHandler);
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
    this._overlay.addEventListener("click", this.close.bind(this));
  }
}

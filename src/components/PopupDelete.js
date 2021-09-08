import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._form = this._popup.querySelector(".popup__form");
  }

  setEventListeners(cardId) {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteCard(cardId);
      this.close();
    });
  }
}

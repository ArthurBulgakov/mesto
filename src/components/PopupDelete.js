import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._form = this._popup.querySelector(".popup__form");
  }

  open (cardId, element) {
    this._cardId = cardId;
    this._element = element;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteCard(this._cardId, this._element);
    });
  }
}

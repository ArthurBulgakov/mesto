import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (caption, image) => {
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupTitle = this._popup.querySelector(".popup__title");
    this._popupTitle.textContent = caption;
    this._popupImage.setAttribute("src", `${image}`);
    this._popupImage.setAttribute("alt", `${caption}`);
    super.open();
  };
}

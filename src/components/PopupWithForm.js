import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, handleCreate) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".popup__save-button");
    this.handleCreate = handleCreate;
  }

  open() {
    if (this._popupSelector === ".popup_type_edit") {
      this.handleCreate();
    }
    super.open();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  close() {
    super.close();
    if (
      this._popupSelector === ".popup_type_add" ||
      this._popupSelector === ".popup_type_avatar"
    ) {
      this._form.reset();
    }
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._submitButton);
      this.close();
    });
  };
}

import { config } from "./config.js";

export default class FormValidator {
  constructor (config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  errorCleaner = () => {
    const errorFields = Array.from(this._form.querySelectorAll(`.${this._inputErrorClass}`));
    errorFields.forEach((errorField) => {
      errorField.classList.remove(`.${this._errorClass}`);
      errorField.textContent = '';
    })
  }

  _checkValidity(inputElement) {
    const form = this._form;
    if (!inputElement.validity.valid) {
      const errorElement = form.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = inputElement.validationMessage;
    } else {
      const errorElement = form.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }
  
  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkValidity(inputElement);
      this.toggleButtonState();
    })
  })
  }

  _handleFormInput() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    this._setEventListeners();
  }

  enableValidation() {
    this._handleFormInput();
  }
}
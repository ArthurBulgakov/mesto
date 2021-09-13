/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Api)\n/* harmony export */ });\nclass Api {\n  constructor(token, cohort) {\n    this._token = token;\n    this._cohort = cohort;\n  }\n\n  _checkRes(res) {\n    if (res.ok) {\n      return res.json();\n    }\n\n    return Promise.reject(`Ошибка: ${res.status}`);\n  }\n\n  getUserInfo() {\n    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {\n      headers: {\n        authorization: `${this._token}`,\n        \"Content-Type\": \"application/json\"\n      }\n    }).then(res => {\n      return this._checkRes(res);\n    });\n  }\n\n  getUserId() {\n    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {\n      headers: {\n        authorization: `${this._token}`,\n        \"Content-Type\": \"application/json\"\n      }\n    }).then(res => {\n      return this._checkRes(res);\n    });\n  }\n\n  getCards() {\n    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {\n      headers: {\n        authorization: `${this._token}`,\n        \"Content-Type\": \"application/json\"\n      }\n    }).then(res => {\n      return this._checkRes(res);\n    });\n  }\n\n  x;\n\n  changeProfile(item) {\n    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {\n      method: \"PATCH\",\n      headers: {\n        authorization: `${this._token}`,\n        \"Content-Type\": \"application/json\"\n      },\n      body: JSON.stringify({\n        name: item.nameInput,\n        about: item.jobInput\n      })\n    }).then(res => {\n      return this._checkRes(res);\n    });\n  }\n\n  changeProfileAvatar(item) {\n    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`, {\n      method: \"PATCH\",\n      headers: {\n        authorization: `${this._token}`,\n        \"Content-Type\": \"application/json\"\n      },\n      body: JSON.stringify({\n        avatar: `${item.urlAvatarInput}`\n      })\n    }).then(res => {\n      return this._checkRes(res);\n    });\n  }\n\n  addCard(name, link) {\n    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {\n      method: \"POST\",\n      headers: {\n        authorization: `${this._token}`,\n        \"Content-Type\": \"application/json\"\n      },\n      body: JSON.stringify({\n        name: name,\n        link: link\n      })\n    }).then(res => {\n      return this._checkRes(res);\n    }).then(res => {\n      return res;\n    });\n  }\n\n  deleteCard(cardId) {\n    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${cardId}`, {\n      method: \"DELETE\",\n      headers: {\n        authorization: `${this._token}`,\n        \"Content-Type\": \"application/json\"\n      }\n    }).then(res => {\n      return this._checkRes(res);\n    });\n  }\n\n  likeCard(idCard) {\n    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/likes/${idCard}`, {\n      method: \"PUT\",\n      headers: {\n        authorization: `${this._token}`,\n        \"Content-Type\": \"application/json\"\n      }\n    }).then(res => {\n      return this._checkRes(res);\n    });\n  }\n\n  dislikeCard(idCard) {\n    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/likes/${idCard}`, {\n      method: \"DELETE\",\n      headers: {\n        authorization: `${this._token}`,\n        \"Content-Type\": \"application/json\"\n      }\n    }).then(res => {\n      return this._checkRes(res);\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/Api.js?");

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Card)\n/* harmony export */ });\nclass Card {\n  constructor(cardData, template, handleCardClick, userId, handleDeletePopup, handleLikes) {\n    this._name = cardData.name;\n    this._link = cardData.link;\n    this._likes = cardData.likes;\n    this._cardId = cardData._id;\n    this._ownerId = cardData.owner._id;\n    this._userId = userId;\n    this._template = template;\n    this._handleCardClick = handleCardClick;\n    this._handleDeletePopup = handleDeletePopup;\n    this._handleLikes = handleLikes;\n    this._element = this._getTemplate();\n    this._elementImage = this._element.querySelector(\".element__image\");\n    this._elementTitle = this._element.querySelector(\".element__title\");\n    this._elementLike = this._element.querySelector(\".element__like\");\n    this._elementDeleteBtn = this._element.querySelector(\".element__remove\");\n    this._elementLikeCounter = this._element.querySelector(\".element__like-counter\");\n  }\n\n  _getTemplate() {\n    const element = document.querySelector(this._template).content.querySelector(\".element\").cloneNode(true);\n    return element;\n  }\n\n  _likeCounter(likes) {\n    this._elementLikeCounter.textContent = likes.length;\n  }\n\n  _renderLikes(likes) {\n    this._likes = likes;\n\n    if (this._likes.find(item => {\n      return item._id === this._userId;\n    })) {\n      this._elementLike.classList.add(\"element__like_liked\");\n    } else {\n      this._elementLike.classList.remove(\"element__like_liked\");\n    }\n\n    this._likeCounter(likes);\n  }\n\n  _setCardListeners(image, like, dltBtn, element) {\n    image.addEventListener(\"click\", () => {\n      this._handleCardClick(this._name, this._link);\n    });\n    like.addEventListener(\"click\", () => {\n      this._handleLikes(this._cardId, this._likes).then(res => {\n        this._renderLikes(res);\n      });\n    });\n    dltBtn.addEventListener(\"click\", () => {\n      this._handleDeletePopup(this._cardId, element);\n    });\n  }\n\n  generateCard() {\n    this._elementImage.setAttribute(\"src\", this._link);\n\n    this._elementImage.setAttribute(\"alt\", this._name);\n\n    this._elementTitle.textContent = this._name;\n\n    this._likeCounter(this._likes);\n\n    if (this._userId !== this._ownerId) {\n      this._elementDeleteBtn.remove();\n    }\n\n    this._setCardListeners(this._elementImage, this._elementLike, this._elementDeleteBtn, this._element);\n\n    this._renderLikes(this._likes);\n\n    return this._element;\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/Card.js?");

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FormValidator)\n/* harmony export */ });\n/* harmony import */ var _constants_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/config */ \"./src/constants/config.js\");\n\nclass FormValidator {\n  constructor(config, form) {\n    this._inputSelector = config.inputSelector;\n    this._submitButtonSelector = config.submitButtonSelector;\n    this._inactiveButtonClass = config.inactiveButtonClass;\n    this._inputErrorClass = config.inputErrorClass;\n    this._errorClass = config.errorClass;\n    this._form = form;\n    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));\n    this._buttonElement = this._form.querySelector(this._submitButtonSelector);\n  }\n\n  errorCleaner = () => {\n    const errorFields = Array.from(this._form.querySelectorAll(`.${this._inputErrorClass}`));\n    errorFields.forEach(errorField => {\n      errorField.classList.remove(`.${this._errorClass}`);\n      errorField.textContent = \"\";\n    });\n\n    this._inputList.forEach(input => {\n      input.classList.remove(_constants_config__WEBPACK_IMPORTED_MODULE_0__.config.popupInputError);\n    });\n  };\n\n  _checkValidity(inputElement) {\n    const form = this._form;\n\n    if (!inputElement.validity.valid) {\n      const errorElement = form.querySelector(`.${inputElement.id}-error`);\n      inputElement.classList.add(_constants_config__WEBPACK_IMPORTED_MODULE_0__.config.popupInputError);\n      errorElement.classList.add(this._errorClass);\n      errorElement.textContent = inputElement.validationMessage;\n    } else {\n      const errorElement = form.querySelector(`.${inputElement.id}-error`);\n      errorElement.classList.remove(this._errorClass);\n      inputElement.classList.remove(_constants_config__WEBPACK_IMPORTED_MODULE_0__.config.popupInputError);\n      errorElement.textContent = \"\";\n    }\n  }\n\n  _hasInvalidInput() {\n    return this._inputList.some(inputElement => {\n      return !inputElement.validity.valid;\n    });\n  }\n\n  toggleButtonState() {\n    if (this._hasInvalidInput()) {\n      this._buttonElement.classList.add(this._inactiveButtonClass);\n\n      this._buttonElement.setAttribute(\"disabled\", true);\n    } else {\n      this._buttonElement.classList.remove(this._inactiveButtonClass);\n\n      this._buttonElement.removeAttribute(\"disabled\");\n    }\n  }\n\n  _setEventListeners() {\n    this.toggleButtonState();\n\n    this._inputList.forEach(inputElement => {\n      inputElement.addEventListener(\"input\", () => {\n        this._checkValidity(inputElement);\n\n        this.toggleButtonState();\n      });\n    });\n  }\n\n  _handleFormInput() {\n    this._form.addEventListener(\"submit\", function (evt) {\n      evt.preventDefault();\n    });\n\n    this._setEventListeners();\n  }\n\n  enableValidation() {\n    this._handleFormInput();\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/FormValidator.js?");

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Popup)\n/* harmony export */ });\nclass Popup {\n  constructor(popupSelector) {\n    this._popup = document.querySelector(popupSelector);\n    this._closeButton = this._popup.querySelector(\".popup__close-button\");\n    this._overlay = this._popup.querySelector(\".popup__overlay\");\n\n    this._handleEscClose = evt => {\n      if (evt.key === \"Escape\") {\n        this.close();\n      }\n    };\n\n    this._escHandler = this._handleEscClose.bind(this);\n  }\n\n  open() {\n    this._popup.classList.add(\"popup_opened\");\n\n    document.addEventListener(\"keyup\", this._escHandler);\n  }\n\n  close() {\n    this._popup.classList.remove(\"popup_opened\");\n\n    document.removeEventListener(\"keyup\", this._escHandler);\n  }\n\n  setEventListeners() {\n    this._closeButton.addEventListener(\"click\", this.close.bind(this));\n\n    this._overlay.addEventListener(\"click\", this.close.bind(this));\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/Popup.js?");

/***/ }),

/***/ "./src/components/PopupDelete.js":
/*!***************************************!*\
  !*** ./src/components/PopupDelete.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopupDelete)\n/* harmony export */ });\n/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ \"./src/components/Popup.js\");\n\nclass PopupDelete extends _Popup__WEBPACK_IMPORTED_MODULE_0__.default {\n  constructor(popupSelector, handleDeleteCard) {\n    super(popupSelector);\n    this._handleDeleteCard = handleDeleteCard;\n    this._form = this._popup.querySelector(\".popup__form\");\n  }\n\n  open(cardId, element) {\n    this._cardId = cardId;\n    this._element = element;\n    super.open();\n  }\n\n  setEventListeners() {\n    super.setEventListeners();\n\n    this._form.addEventListener(\"submit\", evt => {\n      evt.preventDefault();\n\n      this._handleDeleteCard(this._cardId, this._element);\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/PopupDelete.js?");

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopupWithForm)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\nclass PopupWithForm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__.default {\n  constructor(popupSelector, handleFormSubmit) {\n    super(popupSelector);\n    this._popupSelector = popupSelector;\n    this._handleFormSubmit = handleFormSubmit;\n    this._form = this._popup.querySelector(\".popup__form\");\n    this._submitButton = this._popup.querySelector(\".popup__save-button\");\n  }\n\n  _getInputValues() {\n    this._formValues = {};\n    this._inputList = this._form.querySelectorAll(\".popup__input\");\n\n    this._inputList.forEach(input => this._formValues[input.name] = input.value);\n\n    return this._formValues;\n  }\n\n  close() {\n    super.close();\n\n    this._form.reset();\n  }\n\n  setEventListeners = () => {\n    super.setEventListeners();\n\n    this._form.addEventListener(\"submit\", evt => {\n      evt.preventDefault();\n\n      this._handleFormSubmit(this._getInputValues(), this._submitButton);\n    });\n  };\n}\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithForm.js?");

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopupWithImage)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\nclass PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__.default {\n  constructor(popupSelector) {\n    super(popupSelector);\n  }\n\n  open = (caption, image) => {\n    this._popupImage = this._popup.querySelector(\".popup__image\");\n    this._popupTitle = this._popup.querySelector(\".popup__title\");\n    this._popupTitle.textContent = caption;\n\n    this._popupImage.setAttribute(\"src\", `${image}`);\n\n    this._popupImage.setAttribute(\"alt\", `${caption}`);\n\n    super.open();\n  };\n}\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithImage.js?");

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Section)\n/* harmony export */ });\nclass Section {\n  constructor(updateCards, containerSelector) {\n    this.updateCards = updateCards;\n    this._container = document.querySelector(containerSelector);\n  }\n\n  addItem(element) {\n    this._container.append(element);\n  }\n\n  clear() {\n    this._container.innerHTML = \"\";\n  }\n\n  renderItems() {\n    this.clear();\n    this.updateCards();\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/Section.js?");

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UserInfo)\n/* harmony export */ });\nclass UserInfo {\n  constructor({\n    name,\n    description\n  }) {\n    this._name = document.querySelector(name);\n    this._description = document.querySelector(description);\n  }\n\n  getUserInfo() {\n    return {\n      profileName: this._name.textContent,\n      profileDescription: this._description.textContent\n    };\n  }\n\n  setUserInfo(userData) {\n    if (userData.name !== '') {\n      this._name.textContent = userData.name;\n    } else {\n      console.log('Что-то не так с именем');\n    }\n\n    if (userData.about !== '') {\n      this._description.textContent = userData.about;\n    } else {\n      console.log('Что-то не так с описанием');\n    }\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/UserInfo.js?");

/***/ }),

/***/ "./src/constants/config.js":
/*!*********************************!*\
  !*** ./src/constants/config.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"config\": () => (/* binding */ config)\n/* harmony export */ });\nconst config = {\n  formSelector: \".popup__form\",\n  inputSelector: \".popup__input\",\n  submitButtonSelector: \".popup__save-button\",\n  inactiveButtonClass: \"popup__save-button_disabled\",\n  inputErrorClass: \"popup__error\",\n  popupInputError: \"popup__input_error\",\n  errorClass: \"popup__error_active\",\n  elementsContainer: \".elements\",\n  popupAdd: \".popup_type_add\",\n  poupEdit: \".popup_type_edit\",\n  popupCard: \".popup_type_card\",\n  popupDelete: \".popup_type_delete\",\n  popupAvatar: \".popup_type_avatar\",\n  profileAvatarContainer: \".profile__avatar-container\",\n  profileName: \".profile__name\",\n  profileDescription: \".profile__description\",\n  profileAvatar: \".profile__avatar\",\n  likeCounter: \".element__like-counter\",\n  nameInputId: \"nameInput\",\n  jobinputId: \"jobInput\"\n};\n\n\n//# sourceURL=webpack://mesto/./src/constants/config.js?");

/***/ }),

/***/ "./src/constants/userData.js":
/*!***********************************!*\
  !*** ./src/constants/userData.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"userData\": () => (/* binding */ userData)\n/* harmony export */ });\nconst userData = {\n  token: \"94660682-be27-455f-89a8-a19436e7ed47\",\n  cohort: \"cohort-27\"\n};\n\n//# sourceURL=webpack://mesto/./src/constants/userData.js?");

/***/ }),

/***/ "./src/page/index.js":
/*!***************************!*\
  !*** ./src/page/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _page_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../page/index.css */ \"./src/page/index.css\");\n/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Card.js */ \"./src/components/Card.js\");\n/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormValidator.js */ \"./src/components/FormValidator.js\");\n/* harmony import */ var _constants_config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/config.js */ \"./src/constants/config.js\");\n/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Section.js */ \"./src/components/Section.js\");\n/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PopupWithImage.js */ \"./src/components/PopupWithImage.js\");\n/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithForm.js */ \"./src/components/PopupWithForm.js\");\n/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/UserInfo.js */ \"./src/components/UserInfo.js\");\n/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Api.js */ \"./src/components/Api.js\");\n/* harmony import */ var _components_PopupDelete_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/PopupDelete.js */ \"./src/components/PopupDelete.js\");\n/* harmony import */ var _constants_userData_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../constants/userData.js */ \"./src/constants/userData.js\");\n/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/utils.js */ \"./src/utils/utils.js\");\n\n\n\n\n\n\n\n\n\n\n\n\nconst editButton = document.querySelector(\".profile__edit-button\");\nconst addButton = document.querySelector(\".profile__add-button\");\nconst popupFormEdit = document.getElementById(\"popupFormEdit\");\nconst popupFormAdd = document.getElementById(\"popupFormAdd\");\nconst popupFormAvatar = document.getElementById(\"popupFormAvatar\");\nconst cardTemplateSelector = \"#cardTemplate\";\nconst profileAvatarContainer = document.querySelector(_constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config.profileAvatarContainer);\nconst profileAvatar = document.querySelector(_constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config.profileAvatar);\nconst formValidatorEdit = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__.default(_constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config, popupFormEdit);\nconst formValidatorAdd = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__.default(_constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config, popupFormAdd);\nconst formValidatorAvatar = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__.default(_constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config, popupFormAvatar);\nconst api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_8__.default(_constants_userData_js__WEBPACK_IMPORTED_MODULE_10__.userData.token, _constants_userData_js__WEBPACK_IMPORTED_MODULE_10__.userData.cohort);\nlet userId = null;\nconst userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_7__.default({\n  name: _constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config.profileName,\n  description: _constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config.profileDescription\n});\nconst popupCard = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_5__.default(_constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config.popupCard);\nconst popupEditProfile = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__.default(_constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config.poupEdit, (item, submitButton) => {\n  const text = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_11__.changeButtonText)(submitButton);\n  api.changeProfile(item).then(() => {\n    updateUserData();\n  }).then(() => {\n    popupEditProfile.close();\n  }).catch(err => {\n    console.log(err);\n  }).finally(() => {\n    submitButton.textContent = text;\n  });\n});\nconst popupAvatar = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__.default(_constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config.popupAvatar, (item, submitButton) => {\n  const text = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_11__.changeButtonText)(submitButton);\n  api.changeProfileAvatar(item).then(() => {\n    updateUserData();\n  }).then(() => {\n    popupAvatar.close();\n  }).catch(err => {\n    console.log(err);\n  }).finally(() => {\n    submitButton.textContent = text;\n  });\n});\n\nconst handleDeletePopup = (cardId, element) => {\n  popupDelete.open(cardId, element);\n};\n\nconst handleDeleteCard = (cardId, element) => {\n  api.deleteCard(cardId).then(() => {\n    (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_11__.removeElementFromDOM)(element);\n  }).then(() => {\n    popupDelete.close();\n  }).catch(err => {\n    console.log(err);\n  });\n};\n\nconst handleLikes = async (cardId, likes) => {\n  let newLikes = null;\n\n  if (likes.find(item => {\n    return item._id === userId;\n  })) {\n    try {\n      const res = await api.dislikeCard(cardId);\n      newLikes = res.likes;\n    } catch (e) {\n      console.log(e);\n    }\n  } else {\n    try {\n      const res = await api.likeCard(cardId);\n      newLikes = res.likes;\n    } catch (e) {\n      console.log(e);\n    }\n  }\n\n  return newLikes;\n};\n\nconst popupDelete = new _components_PopupDelete_js__WEBPACK_IMPORTED_MODULE_9__.default(_constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config.popupDelete, handleDeleteCard);\n\nconst updateCardsData = () => {\n  api.getCards().then(res => {\n    res.forEach(card => {\n      createCard(card, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes);\n    });\n  }).catch(err => {\n    console.log(err);\n  });\n};\n\nconst cardsList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_4__.default(updateCardsData, _constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config.elementsContainer);\nconst popupAdd = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__.default(_constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config.popupAdd, (item, submitButton) => {\n  const text = (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_11__.changeButtonText)(submitButton);\n  api.addCard(item.placeNameInput, item.urlPlaceInput).then(res => {\n    (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_11__.addCardToDOM)(generateCard(res, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes), _constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config);\n  }).then(() => {\n    popupAdd.close();\n  }).catch(err => {\n    console.log(err);\n  }).finally(() => {\n    submitButton.textContent = text;\n  });\n});\n\nconst generateCard = (item, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes) => {\n  const cardElem = new _components_Card_js__WEBPACK_IMPORTED_MODULE_1__.default(item, cardTemplateSelector, handleCardClick, userId, handleDeletePopup, handleLikes);\n  const cardElement = cardElem.generateCard();\n  return cardElement;\n};\n\nconst createCard = (item, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes) => {\n  cardsList.addItem(generateCard(item, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes));\n};\n\nconst handleCardClick = (caption, image) => {\n  popupCard.open(caption, image);\n};\n\nconst updateUserData = async () => {\n  try {\n    const userData = await api.getUserInfo();\n    userId = userData._id;\n    userInfo.setUserInfo(userData);\n    profileAvatar.src = userData.avatar;\n  } catch (e) {\n    console.log(e);\n  }\n};\n\neditButton.addEventListener(\"click\", () => {\n  const values = userInfo.getUserInfo();\n  popupEditProfile.open();\n  (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_11__.fillInputsPopupEditProfile)(values, _constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config.nameInputId, _constants_config_js__WEBPACK_IMPORTED_MODULE_3__.config.jobinputId);\n  formValidatorEdit.errorCleaner();\n  formValidatorEdit.toggleButtonState();\n});\naddButton.addEventListener(\"click\", () => {\n  popupAdd.open();\n  formValidatorAdd.errorCleaner();\n  formValidatorAdd.toggleButtonState();\n});\nprofileAvatarContainer.addEventListener(\"click\", () => {\n  popupAvatar.open();\n  formValidatorAvatar.errorCleaner();\n});\nupdateUserData().then(() => {\n  cardsList.renderItems();\n}).catch(err => {\n  console.log(err);\n});\npopupEditProfile.setEventListeners();\npopupCard.setEventListeners();\npopupAdd.setEventListeners();\npopupAvatar.setEventListeners();\npopupDelete.setEventListeners();\nformValidatorEdit.enableValidation();\nformValidatorAdd.enableValidation();\nformValidatorAvatar.enableValidation();\n\n//# sourceURL=webpack://mesto/./src/page/index.js?");

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"changeButtonText\": () => (/* binding */ changeButtonText),\n/* harmony export */   \"removeElementFromDOM\": () => (/* binding */ removeElementFromDOM),\n/* harmony export */   \"addCardToDOM\": () => (/* binding */ addCardToDOM),\n/* harmony export */   \"fillInputsPopupEditProfile\": () => (/* binding */ fillInputsPopupEditProfile)\n/* harmony export */ });\nconst changeButtonText = button => {\n  const originalText = button.textContent;\n  button.textContent = 'Сохранение...';\n  return originalText;\n};\n\nconst removeElementFromDOM = element => {\n  element.remove();\n};\n\nconst addCardToDOM = (item, config) => {\n  const elementList = document.querySelector(config.elementsContainer);\n  elementList.prepend(item);\n};\n\nconst fillInputsPopupEditProfile = (values, nameInputId, descriptionInputId) => {\n  const nameInput = document.getElementById(`${nameInputId}`);\n  const descriptionInput = document.getElementById(`${descriptionInputId}`);\n  nameInput.value = values.profileName;\n  descriptionInput.value = values.profileDescription;\n};\n\n\n\n//# sourceURL=webpack://mesto/./src/utils/utils.js?");

/***/ }),

/***/ "./src/page/index.css":
/*!****************************!*\
  !*** ./src/page/index.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto/./src/page/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/page/index.js");
/******/ 	
/******/ })()
;
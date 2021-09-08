import { _ } from "core-js";

export default class Card {
  constructor(
    cardData,
    template,
    handleCardClick,
    userId,
    handleDeletePopup,
    handleLikes
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._userId = userId;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleDeletePopup = handleDeletePopup;
    this._handleLikes = handleLikes;
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementLike = this._element.querySelector(".element__like");
    this._elementDeleteBtn = this._element.querySelector(".element__remove");
    this._elementLikeCounter = this._element.querySelector(
      ".element__like-counter"
    );
  }

  _getTemplate() {
    const element = document
      .querySelector(this._template)
      .content.querySelector(".element")
      .cloneNode(true);
    return element;
  }

  renderLikes() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._elementLike.classList.add("element__like_liked");
      }
    });
  }

  _setCardListeners(image, like, dltBtn) {
    image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    like.addEventListener("click", () =>
      this._handleLikes(this._cardId, this._elementLike)
    );
    dltBtn.addEventListener("click", () =>
      this._handleDeletePopup(this._cardId)
    );
  }

  generateCard() {
    this._elementImage.setAttribute("src", this._link);
    this._elementImage.setAttribute("alt", this._name);
    this._elementTitle.textContent = this._name;
    this._elementLikeCounter.textContent = this._likes.length;
    if (this._userId !== this._ownerId) {
      this._elementDeleteBtn.remove();
    }
    this._setCardListeners(
      this._elementImage,
      this._elementLike,
      this._elementDeleteBtn
    );
    this.renderLikes();
    return this._element;
  }
}

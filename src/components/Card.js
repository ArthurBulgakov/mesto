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

  _likeCounter (likes) {
    this._elementLikeCounter.textContent = likes.length;
  }

  _renderLikes(likes) {
    this._likes = likes;
    if (this._likes.find(item => { return item._id === this._userId})) {
      this._elementLike.classList.add("element__like_liked");
    } else {
      this._elementLike.classList.remove("element__like_liked");
    }
    this._likeCounter(likes);
  }

  _setCardListeners(image, like, dltBtn, element) {
    image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    like.addEventListener("click", () => {
      this._handleLikes(this._cardId, this._likes)
      .then((res) => {
        this._renderLikes(res);
      });
     
    });
    dltBtn.addEventListener("click", () => {
      this._handleDeletePopup(this._cardId, element)
    });
  }

  generateCard() {
    this._elementImage.setAttribute("src", this._link);
    this._elementImage.setAttribute("alt", this._name);
    this._elementTitle.textContent = this._name;
    this._likeCounter(this._likes);
    if (this._userId !== this._ownerId) {
      this._elementDeleteBtn.remove();
    }
    this._setCardListeners(
      this._elementImage,
      this._elementLike,
      this._elementDeleteBtn,
      this._element
    );
    this._renderLikes(this._likes);
    return this._element;
  }
}

export default class Card {
  constructor (cardData, template, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate () {
    const element = document
    .querySelector(this._template)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return element;
  }

  _toggleLike () {
    this._elementLike.classList.toggle('element__like_liked');
  }

  _removeCard () {
    this._elementDeleteBtn.closest('.element').remove();
  }

  _setCardListeners (image, like, dltBtn) {
    like.addEventListener('click', () => this._toggleLike());
    dltBtn.addEventListener('click', () => this._removeCard());
    image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  generateCard () {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDeleteBtn = this._element.querySelector('.element__remove');
    this._elementImage.setAttribute('src', this._link);
    this._elementImage.setAttribute('alt', this._name);
    this._elementTitle.textContent = this._name;
    this._setCardListeners(this._elementImage, this._elementLike, this._elementDeleteBtn)
    return this._element
  }
}
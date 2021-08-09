export default class Card {
  constructor (cardData, template) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._template = template;
  }

  _getTemplate () {
    const element = document
    .querySelector(this._template)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return element;
  }

  _toggleLike (like) {
    like.classList.toggle('element__like_liked');
  }

  _removeCard (dltBtn) {
    dltBtn.closest('.element').remove();
  }

  _openPopupCard () {
    const popupCard = document.querySelector('.popup_type_card');
    const popupCardTitle = document.querySelector('.popup__title_type_card');
    const popupImage = document.querySelector('.popup__image');
    popupCardTitle.textContent = this._elementTitle.textContent;
    popupImage.setAttribute("src", `${this._elementImage.src}`);
    popupImage.setAttribute("alt", `${this._elementTitle.textContent}`);
    popupCard.classList.add('popup_opened');
  }

  _cardListeners (image, like, dltBtn, element) {
    like.addEventListener('click', () => this._toggleLike(like));
    dltBtn.addEventListener('click', () => this._removeCard(dltBtn));
    image.addEventListener('click', () => this._openPopupCard(element));
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
    this._cardListeners(this._elementImage, this._elementLike, this._elementDeleteBtn, this._element)
    return this._element
  }
}
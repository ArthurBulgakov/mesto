export default class Card {
  constructor (cardData, template, openPopupCard) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._template = template;
    this._openPopupCard = openPopupCard;
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

  _setCardListeners (image, like, dltBtn, element) {
    like.addEventListener('click', () => this._toggleLike());
    dltBtn.addEventListener('click', () => this._removeCard());
    image.addEventListener('click', () => {
      this._openPopupCard(this._elementTitle, this._elementImage, element) //спасибо за подробные объяснения, из теоретической части я как-то не усвоил что можно передавать функции извне в конструктор и исользовать их!
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
    this._setCardListeners(this._elementImage, this._elementLike, this._elementDeleteBtn, this._element)
    return this._element
  }
}
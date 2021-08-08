export default class Card {
  constructor (initialCards) {
    this._name = initialCards.name
    this._link = initialCards.link
    this.isLiked = false
  }

  _getTemplate () {
    const element = document
    .querySelector('#cardTemplate')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return element;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').setAttribute('src', this._link);
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element
  }

}
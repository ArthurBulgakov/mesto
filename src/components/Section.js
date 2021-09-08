export default class Section {
  constructor(updateCards, containerSelector) {
    this.updateCards = updateCards;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();
    this.updateCards();
  }
}

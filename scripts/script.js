const adventerName = document.querySelector('.profile__name');
const adventerJob = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type-edit');
const popupAddCard = document.querySelector('.popup_type-add');
const popupCard = document.querySelector('.popup_type-card'); // У меня уже есть переменная popupImage
const popupCardTitle = document.querySelector('.popup__title_type-card');
const popupImage = document.querySelector('.popup__image');
const closeEditProfilePopupBtn = document.querySelector('.popup__close-button_type-edit');
const closeAddCardPopupBtn = document.querySelector('.popup__close-button_type-add');
const closeCardPopupBtn = document.querySelector('.popup__close-button_type-card');
const saveButton = document.querySelector('.popup__save-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.getElementById('nameInput');
const jobInput = document.getElementById('jobInput');
const elements = document.querySelectorAll('.element');
const cardNameInput = document.getElementById('placeNameInput');
const cardLinkInput = document.getElementById('urlPlaceInput');
const formEdit = document.querySelector('.popup_type-edit');
const formAdd = document.querySelector('.popup_type-add');
const elementsWrapper = document.querySelector('.elements');
const cardTemplate = document.querySelector('#cardTemplate').content;
const cardElem = cardTemplate.querySelector('.element');

const createCard = (element, card) => {
  const clonedElement = element.cloneNode(true);
  const clonedElementImage = clonedElement.querySelector('.element__image')
  clonedElementImage.src = card.link;
  clonedElementImage.alt = card.name;
  clonedElement.querySelector('.element__title').textContent = card.name;

  setCardListeners(clonedElement);
  return clonedElement
}

const addCard = (element, card) => {
  elementsWrapper.prepend(createCard(element, card));
}

const setCardListeners = (element) => {
    const like = element.querySelector('.element__like');
    const remove = element.querySelector('.element__remove');
    const elemPopup = element.querySelector('.element__image');
    like.addEventListener('click', (evt) => toggleLike(evt));
    remove.addEventListener('click', (evt) => removeCard(evt));
    elemPopup.addEventListener('click', () => openPopupCard(element));
}

const toggleLike = (evt) => {
  const el = evt.currentTarget;
  el.classList.toggle('element__like_liked');
}

const removeCard = (evt) => {
  const el = evt.currentTarget;
  const deletedCard = el.closest('.element');
  deletedCard.remove();
}

function openPopupEdit () {
  nameInput.value = adventerName.textContent;
  jobInput.value = adventerJob.textContent;
  openPopup(popupEditProfile);
};

function openPopupAdd () {
  openPopup(popupAddCard);
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
};

function openPopupCard (element) {
  const elTitle = element.querySelector('.element__title');
  popupCardTitle.textContent = elTitle.textContent;
  popupImage.setAttribute("src", `${element.querySelector('.element__image').src}`);
  popupImage.setAttribute("alt", `${elTitle.textContent}`);
  openPopup(popupCard);
};

function closeAddCardPopup (evt) {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  closePopup(evt);
}

function closePopup (evt) {
  const el = evt.currentTarget;
  const closesPopup = el.closest('.popup');
  closesPopup.classList.remove('popup_opened');
};

function submitEditProfileForm (evt) {
  evt.preventDefault();
  closePopup(evt);
  adventerName.textContent = nameInput.value;
  adventerJob.textContent = jobInput.value;
}

function submitAddCardForm (evt) {
  evt.preventDefault();
  addCard(cardElem, {name: `${cardNameInput.value}`, link: `${cardLinkInput.value}`});
  closePopup(evt);
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
closeEditProfilePopupBtn.addEventListener('click', closePopup);
closeAddCardPopupBtn.addEventListener('click', closeAddCardPopup);
closeCardPopupBtn.addEventListener('click', closePopup);
formEdit.addEventListener('submit', submitEditProfileForm);
formAdd.addEventListener('submit', submitAddCardForm);

initialCards.forEach(card => {
  addCard(cardElem, card);
 })

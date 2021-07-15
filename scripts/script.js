const adventerName = document.querySelector('.profile__name');
const adventerJob = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupCard = document.querySelector('.popup_type_card');
const popupCardTitle = document.querySelector('.popup__title_type_card');
const popupImage = document.querySelector('.popup__image');
const closeEditProfilePopupBtn = document.querySelector('.popup__close-button_type_edit');
const closeAddCardPopupBtn = document.querySelector('.popup__close-button_type_add');
const closeCardPopupBtn = document.querySelector('.popup__close-button_type_card');
const saveButton = document.querySelector('.popup__save-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.getElementById('nameInput');
const jobInput = document.getElementById('jobInput');
const elements = document.querySelectorAll('.element');
const cardNameInput = document.getElementById('placeNameInput');
const cardLinkInput = document.getElementById('urlPlaceInput');
const formEdit = document.querySelector('.popup_type_edit');
const formAdd = document.querySelector('.popup_type_add');
const elementsWrapper = document.querySelector('.elements');
const cardTemplate = document.querySelector('#cardTemplate').content;
const cardElem = cardTemplate.querySelector('.element');
const overlayPopupCard = document.querySelector('.popup__overlay_type_card');
const overlayPopupEditProfile = document.querySelector('.popup__overlay_type_edit');
const overlayPopupAddCard = document.querySelector('.popup__overlay_type_add');


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
  evt.currentTarget.classList.toggle('element__like_liked');
}

const removeCard = (evt) => {
  evt.currentTarget.closest('.element').remove();
}

function openPopupEdit () {
  nameInput.value = adventerName.textContent;
  jobInput.value = adventerJob.textContent;
  errorCleaner(config);
  openPopup(popupEditProfile);
};

function openPopupAdd () {
  errorCleaner(config);
  openPopup(popupAddCard);
}

function openPopup (popup) {
  const inputs = Array.from(popup.querySelectorAll(config.inputSelector));
  const button = popup.querySelector(config.submitButtonSelector);
  popup.classList.add('popup_opened');
  cardNameInput.value = '';
  cardLinkInput.value = '';
  document.addEventListener('keyup', closePopupByEsc);
  toggleButtonState(inputs, button, config);
};

function openPopupCard (element) {
  const elTitle = element.querySelector('.element__title');
  popupCardTitle.textContent = elTitle.textContent;
  popupImage.setAttribute("src", `${element.querySelector('.element__image').src}`);
  popupImage.setAttribute("alt", `${elTitle.textContent}`);
  openPopup(popupCard);
};

function handlePopup (evt) {
  const el = evt.currentTarget;
  const closesPopup = el.closest('.popup');
  closePopup(closesPopup);
}

function closeAddCardPopup (evt) {
  handlePopup(evt);
}

function closePopup (closesPopup) {
  closesPopup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupByEsc);
};

function submitEditProfileForm (evt) {
  evt.preventDefault();
  handlePopup(evt);
  adventerName.textContent = nameInput.value;
  adventerJob.textContent = jobInput.value;
}

function submitAddCardForm (evt) {
  evt.preventDefault();
  addCard(cardElem, {name: `${cardNameInput.value}`, link: `${cardLinkInput.value}`});
  closeAddCardPopup(evt);
}

const closePopupClickOverlay = (evt) => {
    closeAddCardPopup(evt);
}

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popups = Array.from(document.querySelectorAll('.popup'));
    popups.forEach(popup => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    })
  }
}


editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
closeEditProfilePopupBtn.addEventListener('click', handlePopup);
closeAddCardPopupBtn.addEventListener('click', closeAddCardPopup);
closeCardPopupBtn.addEventListener('click', handlePopup);
formEdit.addEventListener('submit', submitEditProfileForm);
formAdd.addEventListener('submit', submitAddCardForm);
overlayPopupCard.addEventListener('click', handlePopup);
overlayPopupEditProfile.addEventListener('click', handlePopup);
overlayPopupAddCard.addEventListener('click', handlePopup);



initialCards.forEach(card => {
  addCard(cardElem, card);
 })
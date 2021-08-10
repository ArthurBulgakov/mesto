import Card from "./Card.js";
import FormValidtor from "./FormValidator.js";
import { initialCards } from "./initial-сards.js";
import { config } from "./config.js";

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
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.getElementById('nameInput');
const jobInput = document.getElementById('jobInput');
const cardNameInput = document.getElementById('placeNameInput');
const cardLinkInput = document.getElementById('urlPlaceInput');
const formEdit = document.querySelector('.popup_type_edit');
const formAdd = document.querySelector('.popup_type_add');
const elementsWrapper = document.querySelector('.elements');
const overlayPopupCard = document.querySelector('.popup__overlay_type_card');
const overlayPopupEditProfile = document.querySelector('.popup__overlay_type_edit');
const overlayPopupAddCard = document.querySelector('.popup__overlay_type_add');
const popupFormEdit = document.getElementById('popupFormEdit');
const popupFormAdd = document.getElementById('popupFormAdd');
const formValidatorEdit = new FormValidtor(config, popupFormEdit);
const formValidatorAdd = new FormValidtor(config, popupFormAdd);
const cardTemplateSelector = '#cardTemplate';


function openPopupEdit () {
  nameInput.value = adventerName.textContent;
  jobInput.value = adventerJob.textContent;
  formValidatorEdit.toggleButtonState();
  formValidatorEdit.errorCleaner();
  openPopup(popupEditProfile);
};

function openPopupAdd () {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  formValidatorAdd.toggleButtonState();
  formValidatorAdd.errorCleaner();
  openPopup(popupAddCard);
}

function openPopupCard (caption, image) {
  popupCardTitle.textContent = caption.textContent;
  popupImage.setAttribute("src", `${image.src}`);
  popupImage.setAttribute("alt", `${caption.textContent}`);
  openPopup(popupCard)
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupByEsc);
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
  const cardElem = new Card({name: `${cardNameInput.value}`, link: `${cardLinkInput.value}`}, cardTemplateSelector, openPopupCard);
  const cardElement = cardElem.generateCard();
  elementsWrapper.prepend(cardElement);
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
const renderElements = () => {
  elementsWrapper.innerHTML = '';
  initialCards.forEach(card => {
    const cardElem = new Card(card, cardTemplateSelector, openPopupCard);
    const cardElement = cardElem.generateCard();
    elementsWrapper.append(cardElement);
   })
}

const validation = () => {
  formValidatorEdit.enableValidation();
  formValidatorAdd.enableValidation();
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

renderElements();
validation();


let adventerName = document.querySelector('.profile__name');
let adventerJob = document.querySelector('.profile__description');
let editButton = document.querySelector('.profile__edit-button');
let popupEdit = document.querySelector('.popup_type-edit');
let popupAdd = document.querySelector('.popup_type-add');
let popupCard = document.querySelector('.popup_type-card');
let popupCardTitle = document.querySelector('.popup__title_type-card');
let popupImage = document.querySelector('.popup__image');
let closeButton = document.querySelector('.popup__close-button_type-edit');
let closeButtonAdd = document.querySelector('.popup__close-button_type-add');
let closeButtonCard = document.querySelector('.popup__close-button_type-card');
let saveButton = document.querySelector('.popup__save-button');
let addButton = document.querySelector('.profile__add-button');
let nameInput = document.getElementById('nameInput');
let jobInput = document.getElementById('jobInput');
let elements = document.querySelectorAll('.element');
let cardNameInput = document.getElementById('placeNameInput');
let cardLinkInput = document.getElementById('urlPlaceInput');
let formEdit = document.querySelector('.popup_type-edit');
let formAdd = document.querySelector('.popup_type-add');
const elementsWrapper = document.querySelector('.elements');
const cardTemplate = document.querySelector('#cardTemplate').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const renderCards = () => {
  const cardElem = cardTemplate.querySelector('.element');

  initialCards.forEach((card, index) => {
   renderSingleCard(cardElem, card, index);
  })
}

const renderSingleCard = (element, card, index) => {
  const clonedElement = element.cloneNode(true);
  clonedElement.dataset.index = index;
  if (element) {
    clonedElement.querySelector('.element__image').src = card.link;
    clonedElement.querySelector('.element__image').alt = card.name;
    clonedElement.querySelector('.element__title').textContent = card.name;
    elementsWrapper.append(clonedElement);
  } else {
    clonedElement.querySelector('.element__image').src = cardLinkInput.value;
    clonedElement.querySelector('.element__image').alt = cardNameInput.value;
    clonedElement.querySelector('.element__title').textContent = cardNameInput.value;
    elementsWrapper.prepend(clonedElement);
  }
  setButtonListeners(clonedElement, index);

}

const setButtonListeners = (element, index) => {
    let like = element.querySelector('.element__like');
    let remove = element.querySelector('.element__remove');
    let elemPopup = element.querySelector('.element__image');
    like.addEventListener('click', (evt) => makeLike(evt));
    remove.addEventListener('click', () => removeCard(index));
    elemPopup.addEventListener('click', () => openPopupCard(element));
}

let makeLike = (evt) => {
  let el = evt.currentTarget;
  el.classList.toggle('element__like_liked');
}

let removeCard = (index) => {
  elementsWrapper.querySelector(`[data-index="${index}"]`).remove();
}


function openPopupEdit () {
  popupEdit.classList.add('popup_opened');
  nameInput.value = adventerName.textContent;
  jobInput.value = adventerJob.textContent;
};

function openPopupAdd () {
  popupAdd.classList.add('popup_opened');
};

function openPopupCard (element) {
  popupCard.classList.add('popup_opened');
  popupCardTitle.textContent = element.querySelector('.element__title').textContent;
  popupImage.setAttribute("src", `${element.querySelector('.element__image').src}`);
  popupImage.setAttribute("alt", `${element.querySelector('.element__title').textContent}`);
};

function closePopup () {
  if (popupEdit.classList.contains("popup_opened")) {
    popupEdit.classList.remove('popup_opened')
  } else if (popupAdd.classList.contains("popup_opened")){
    popupAdd.classList.remove('popup_opened')
  } else if (popupCard.classList.contains("popup_opened")){
    popupCard.classList.remove('popup_opened')
  }
};


function saveParams (evt) {
  evt.preventDefault();
  closePopup();
  adventerName.textContent = nameInput.value;
  adventerJob.textContent = jobInput.value;
}

function handlerSubmit (evt) {
  evt.preventDefault();
  renderSingleCard;
  closePopup();
  cardNameInput.value = '';
  cardLinkInput.value = '';
}


editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
closeButton.addEventListener('click', closePopup);
closeButtonAdd.addEventListener('click', closePopup);
closeButtonCard.addEventListener('click', closePopup);
formEdit.addEventListener('submit', saveParams);
formAdd.addEventListener('submit', handlerSubmit);
renderCards();

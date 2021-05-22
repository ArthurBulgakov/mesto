let adventerName = document.querySelector('.profile__name');
let adventerJob = document.querySelector('.profile__description');
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let nameInput = document.getElementById('nameInput')
let jobInput = document.getElementById('jobInput')
let elements = document.querySelectorAll('.element')
let formElement = document.querySelector('.popup__form')

function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = adventerName.textContent;
  jobInput.value = adventerJob.textContent;
};

function closePopup () {
  popup.classList.remove('popup_opened');
};

function saveParams (evt) {
  evt.preventDefault();
  closePopup();
  adventerName.textContent = nameInput.value;
  adventerJob.textContent = jobInput.value;
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', saveParams);
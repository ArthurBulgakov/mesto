let adventerName = document.querySelector('.profile__name');
let adventerDescription = document.querySelector('.profile__description');
let edit_button = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let close_button = document.querySelector('.popup__close-button');
let save_button = document.querySelector('.popup__save-button');
let popupName = document.querySelector('.popup__name')
let popupDescription = document.querySelector('.popup__description')

function openPopup () {
  popup.classList.add('popup_opened');
  popupName.value = adventerName.textContent;
  popupDescription.value = adventerDescription.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function saveParams (evt) {
  evt.preventDefault();
  console.log('кнопка нажалась')
  if (popupName.value !== '' && popupDescription.value !== '') {
    closePopup();
    adventerName.textContent = popupName.value;
    adventerDescription.textContent = popupDescription.value;
  } else if (popupName.value === '' && popupDescription.value !== '') {
    closePopup();
    adventerDescription.textContent = popupDescription.value;
  } else if (popupName.value !== '' && popupDescription.value === '') {
    closePopup();
    adventerName.textContent = popupName.value;
  } else {
    closePopup();
  };
}

edit_button.addEventListener('click', openPopup);
close_button.addEventListener('click', closePopup);
save_button.addEventListener('click', saveParams);

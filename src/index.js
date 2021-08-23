import './pages/index.css';
import Card from "./components/Card.js";
import FormValidtor from "./components/FormValidator.js";
import { initialCards } from "./constants/initial-сards.js";
import { config } from "./constants/config.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const nameInput = document.getElementById("nameInput");
const jobInput = document.getElementById("jobInput");
const popupFormEdit = document.getElementById("popupFormEdit");
const popupFormAdd = document.getElementById("popupFormAdd");
const formValidatorEdit = new FormValidtor(config, popupFormEdit);
const formValidatorAdd = new FormValidtor(config, popupFormAdd);
const cardTemplateSelector = "#cardTemplate";
const userInfo = new UserInfo({
  name: config.profileName,
  description: config.profileDescription,
});
const popupCard = new PopupWithImage(config.popupCard);
const popupEdit = new PopupWithForm(
  config.poupEdit,
  (item) => {
    userInfo.setUserInfo(item);
  },
  () => {
    const values = userInfo.getUserInfo();
    nameInput.value = values.profileName;
    jobInput.value = values.profileDescription;
  
  }
);

const createCard = (item, cardTemplateSelector, handleCardClick) => {
  const cardElem = new Card(item, cardTemplateSelector, handleCardClick);
  const cardElement = cardElem.generateCard();
  cardsList.addItem(cardElement);
}
const popupAdd = new PopupWithForm(config.popupAdd, (item) => {
  createCard({ name: item.placeNameInput, link: item.urlPlaceInput }, cardTemplateSelector, handleCardClick)
});

const handleCardClick = (caption, image) => {
  popupCard.open(caption, image);
};

const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      createCard (item, cardTemplateSelector, handleCardClick);
    },
  },
  config.elementsContainer
);

editButton.addEventListener("click", () => popupEdit.open());
addButton.addEventListener("click", () => popupAdd.open());

popupCard.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
cardsList.renderItems();
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

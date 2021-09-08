import "./pages/index.css";
import Card from "./components/Card.js";
import FormValidtor from "./components/FormValidator.js";
import { config } from "./constants/config.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";
import PopupDelete from "./components/PopupDelete.js";
import { userData } from "./constants/userData.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const nameInput = document.getElementById("nameInput");
const jobInput = document.getElementById("jobInput");
const popupFormEdit = document.getElementById("popupFormEdit");
const popupFormAdd = document.getElementById("popupFormAdd");
const popupFormAvatar = document.getElementById("popupFormAvatar");
const cardTemplateSelector = "#cardTemplate";
const profileName = document.querySelector(config.profileName);
const profileDescription = document.querySelector(config.profileDescription);
const profileAvatarContainer = document.querySelector(config.profileAvatarContainer);
const profileAvatar = document.querySelector(config.profileAvatar);
const formValidatorEdit = new FormValidtor(config, popupFormEdit);
const formValidatorAdd = new FormValidtor(config, popupFormAdd);
const formValidatorAvatar = new FormValidtor(config, popupFormAvatar);
const api = new Api(userData.token, userData.cohort);
let userId = null;

const userInfo = new UserInfo({
  name: config.profileName,
  description: config.profileDescription,
});

const popupCard = new PopupWithImage(config.popupCard);

const changeButtonText = (button) => {
  let originalText = button.textContent
  button.textContent ='Сохранение...'
  return originalText
}

const popupEdit = new PopupWithForm(
  config.poupEdit,
  async (item, submitButton) => {
    let text = changeButtonText(submitButton);
    await api.changeProfile(item)
    .then(() => {
      submitButton.textContent = text;
    })
    .then(() => {
    updateUserData();
    })
  },
  () => {
    const values = userInfo.getUserInfo();
    nameInput.value = values.profileName;
    jobInput.value = values.profileDescription;
  }
);



const popupAvatar = new PopupWithForm (
  config.popupAvatar,
  async (item, submitButton) => {
   let text = changeButtonText(submitButton);
    await api.changeProfileAvatar(item)
      .then(() => {
          submitButton.textContent = text;
        })
      .then(() => {
        updateUserData();
      })
  }
)

const handleDeletePopup = (cardId) => {
  popupDelete.open();
  popupDelete.setEventListeners(cardId)
}

const handleDeleteCard = async (cardId) => {
  await api.deleteCard(cardId).then(() => {
    cardsList.renderItems();
  });
}

const handleLikes = (cardId, likeBtn) => {
  if (likeBtn.classList.contains("element__like_liked")) {
    api.dislikeCard(cardId).then(() => {
      cardsList.renderItems()
    });
  } else {
    api.likeCard(cardId).then(() => {
      cardsList.renderItems()
    });
   }
}


const popupDelete = new PopupDelete(config.popupDelete, handleDeleteCard);

const updateCardsData = async () => {
  let cardsData = await api.getCards();
  cardsData.forEach((card) => {
    createCard(card, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes);
  });
};

const cardsList = new Section(updateCardsData, config.elementsContainer);

const popupAdd = new PopupWithForm(
  config.popupAdd, 
  async (item, submitButton) => {
    let text = changeButtonText(submitButton);
    await api.addCard(item.placeNameInput, item.urlPlaceInput)
    .then(() => {
      submitButton.textContent = text;
     })
    .then(() => {
      cardsList.renderItems()
     })
});

const createCard = (item, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes) => {
  const cardElem = new Card(
    item,
    cardTemplateSelector,
    handleCardClick,
    userId,
    handleDeletePopup,
    handleLikes
  );
  const cardElement = cardElem.generateCard();
  cardsList.addItem(cardElement);
};

const handleCardClick = (caption, image) => {
 popupCard.open(caption, image);
};

const updateUserData = async () => {
  let userData = await api.getUserInfo();
  userId = userData._id;
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.src = userData.avatar;
};

editButton.addEventListener("click", () => {
  popupEdit.open();
  formValidatorEdit.errorCleaner();
  formValidatorEdit.toggleButtonState();
});

addButton.addEventListener("click", () => {
  popupAdd.open();
  formValidatorAdd.errorCleaner();
  formValidatorAdd.toggleButtonState();
});

profileAvatarContainer.addEventListener("click", () => {
  popupAvatar.open();
  formValidatorAvatar.errorCleaner();
  popupAvatar.setEventListeners();
})

updateUserData().then(() => {
  cardsList.renderItems();
});
popupEdit.setEventListeners();
popupCard.setEventListeners();
popupAdd.setEventListeners();
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
formValidatorAvatar.enableValidation();

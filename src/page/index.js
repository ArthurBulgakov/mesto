import "../page/index.css";
import Card from "../components/Card.js";
import FormValidtor from "../components/FormValidator.js";
import { config } from "../constants/config.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete.js";
import { userData } from "../constants/userData.js";
import { changeButtonText, removeElementFromDOM } from "../utils/utils.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupFormEdit = document.getElementById("popupFormEdit");
const popupFormAdd = document.getElementById("popupFormAdd");
const popupFormAvatar = document.getElementById("popupFormAvatar");
const cardTemplateSelector = "#cardTemplate";
const profileAvatarContainer = document.querySelector(config.profileAvatarContainer);
const profileAvatar = document.querySelector(config.profileAvatar);
const formValidatorEdit = new FormValidtor(config, popupFormEdit);
const formValidatorAdd = new FormValidtor(config, popupFormAdd);
const formValidatorAvatar = new FormValidtor(config, popupFormAvatar);
const api = new Api(userData.token, userData.cohort);
let userId = null;
let newLikes =null;


const userInfo = new UserInfo({
  name: config.profileName,
  description: config.profileDescription,
});

const popupCard = new PopupWithImage(config.popupCard);

const popupEditProfile = new PopupWithForm(
  config.poupEdit,
  (item, submitButton) => {
    const text = changeButtonText(submitButton);
    api.changeProfile(item)
    .then(() => {
    updateUserData();
    })
    .then(() => {
      popupEditProfile.close();
    })
    .then(() => {
      submitButton.textContent = text;
    })
    .catch((err) => {
      console.log(err);
    })
  }
);

const popupAvatar = new PopupWithForm (
  config.popupAvatar,
  (item, submitButton) => {
   const text = changeButtonText(submitButton);
   api.changeProfileAvatar(item)
      .then(() => {
        updateUserData();  
      })
      .then(() => {
        popupAvatar.close();
      })
      .then(() => {
        submitButton.textContent = text;
      })
      .catch((err) => {
        console.log(err);
      })
  }
)

const handleDeletePopup = (cardId, element) => {
  popupDelete.open();
  popupDelete.setEventListeners(cardId, element)
}

const handleDeleteCard = (cardId, element) => {
 api.deleteCard(cardId)
  .then(() => {
  removeElementFromDOM(element)
  })
  .then(() => {
    popupDelete.close();
  })
  .catch((err) => {
    console.log(err)
  })
}

const handleLikes = async (cardId, likes) => {
  if (likes.find(item => { return item._id === userId})) {
    const res = await api.dislikeCard(cardId)
    newLikes = res.likes
  } else {
    const res = await api.likeCard(cardId)
    newLikes = res.likes
  }
  return newLikes
}


const popupDelete = new PopupDelete(config.popupDelete, handleDeleteCard);

const updateCardsData = async () => {
  try {
    api.getCards().then((res) => {
      res.forEach((card) => {
        createCard(card, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes);
      });
    })
  } catch (e) {
    console.log(e)
  }
};

const cardsList = new Section(updateCardsData, config.elementsContainer);

const popupAdd = new PopupWithForm(
  config.popupAdd, 
  (item, submitButton) => {
    const text = changeButtonText(submitButton);
    api.addCard(item.placeNameInput, item.urlPlaceInput)
    .then(() => {
      cardsList.renderItems();
     })
     .then(() => {
      popupAdd.close();
     })
    .then(() => {
      submitButton.textContent = text;
     })
    .catch((err) => {
      console.log(err);
    })
});

const generateCard = (item, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes) => {
  const cardElem = new Card(
    item,
    cardTemplateSelector,
    handleCardClick,
    userId,
    handleDeletePopup,
    handleLikes
  );
  const cardElement = cardElem.generateCard();
  return cardElement
}

const createCard = (item, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes) => {
  cardsList.addItem(generateCard(item, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes));
};

const handleCardClick = (caption, image) => {
 popupCard.open(caption, image);
};

const updateUserData = async () => {
  const userData = await api.getUserInfo();
  userId = userData._id;
  userInfo.setUserInfo(userData)
  profileAvatar.src = userData.avatar;
};

editButton.addEventListener("click", () => {
  const values = userInfo.getUserInfo();
  popupEditProfile.open();
  popupEditProfile.fillInputs(values, config.nameInputId, config.jobinputId)
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
})

updateUserData().then(() => {
  cardsList.renderItems();
});
popupEditProfile.setEventListeners();
popupCard.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
formValidatorAvatar.enableValidation();

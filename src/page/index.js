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
import { addCardToDOM, changeButtonText, removeElementFromDOM, fillInputsPopupEditProfile} from "../utils/utils.js";

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
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = text;
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
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButton.textContent = text;
      })
  }
)

const handleDeletePopup = (cardId, element) => {
  popupDelete.open(cardId, element);
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
  let newLikes = null;
  if (likes.find(item => { return item._id === userId})) {
    try {const res = await api.dislikeCard(cardId)
    newLikes = res.likes}
    catch (e) {
      console.log(e)
    }
  } else {
   try { const res = await api.likeCard(cardId)
    newLikes = res.likes } 
  catch (e) {
      console.log(e)
    }
  }
  return newLikes
}


const popupDelete = new PopupDelete(config.popupDelete, handleDeleteCard);

const updateCardsData = () => {
    api.getCards()
    .then((res) => {
      res.forEach((card) => {
        createCard(card, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes);
      });
    })
    .catch((err) => {
      console.log(err)
    })
};

const cardsList = new Section(updateCardsData, config.elementsContainer);

const popupAdd = new PopupWithForm(
  config.popupAdd, 
  (item, submitButton) => {
    const text = changeButtonText(submitButton);
    api.addCard(item.placeNameInput, item.urlPlaceInput)
    .then((res) => {
      addCardToDOM(generateCard(res, cardTemplateSelector, handleCardClick, handleDeletePopup, handleLikes), config);
     })
     .then(() => {
      popupAdd.close();
     })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = text;
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
  try {const userData = await api.getUserInfo();
  userId = userData._id;
  userInfo.setUserInfo(userData)
  profileAvatar.src = userData.avatar;}
  catch (e) {
    console.log(e)
  }
};

editButton.addEventListener("click", () => {
  const values = userInfo.getUserInfo();
  popupEditProfile.open();
  fillInputsPopupEditProfile(values, config.nameInputId, config.jobinputId)
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

updateUserData()
  .then(() => {
    cardsList.renderItems();
  })
  .catch((err) => {
    console.log(err)
  })
;
popupEditProfile.setEventListeners();
popupCard.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
popupDelete.setEventListeners()
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
formValidatorAvatar.enableValidation();

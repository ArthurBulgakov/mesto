const changeButtonText = (button) => {
  const originalText = button.textContent
  button.textContent ='Сохранение...'
  return originalText
}

const removeElementFromDOM = (element) => {
  element.remove();
}

const addCardToDOM = (item, config) => {
  const elementList = document.querySelector(config.elementsContainer)
  elementList.prepend(item)
}

const fillInputsPopupEditProfile = (values, nameInputId, descriptionInputId) => {
  const nameInput = document.getElementById(`${nameInputId}`);
  const descriptionInput = document.getElementById(`${descriptionInputId}`);
  nameInput.value = values.profileName;
  descriptionInput.value = values.profileDescription;
}

export {changeButtonText, removeElementFromDOM, addCardToDOM, fillInputsPopupEditProfile}
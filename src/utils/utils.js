const changeButtonText = (button) => {
  const originalText = button.textContent
  button.textContent ='Сохранение...'
  return originalText
}

const removeElementFromDOM = (element) => {
  element.remove();
}

export {changeButtonText, removeElementFromDOM}
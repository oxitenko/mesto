const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function enableValidation(config) {
  const form = Array.from(document.querySelectorAll(config.formSelector));

  form.forEach((formElm) => {
    formElm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElm, config);
  });
}

function setEventListeners(formElm, config) {
  const inputs = Array.from(formElm.querySelectorAll(config.inputSelector));
  toggleButtonState(formElm, config, inputs);
  inputs.forEach((element) => {
    element.addEventListener("input", () => {
      inputValidation(element, config);
      toggleButtonState(formElm, config, inputs);
    });
  });
}

function inputValidation(element, config) {
  if (!element.validity.valid) {
    showError(element, config.inputErrorClass, config.errorClass);
  } else {
    hideError(element, config.inputErrorClass, config.errorClass);
  }
}

function showError(element, inputErrorClass, errorClass) {
  const errorNode = document.querySelector(`.${element.id}-error`);
  element.classList.add(config.inputErrorClass);
  errorNode.classList.add(config.errorClass);
  errorNode.textContent = element.validationMessage;
}

function hideError(element, inputErrorClass, errorClass) {
  const errorNode = document.querySelector(`.${element.id}-error`);
  element.classList.remove(config.inputErrorClass);
  errorNode.classList.remove(config.errorClass);
  errorNode.textContent = "";
}

function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(formElm, config, inputs) {
  const button = Array.from(
    formElm.querySelectorAll(config.submitButtonSelector)
  );
  button.forEach((btnEl) => {
    if (hasInvalidInput(inputs)) {
      btnEl.classList.add(config.inactiveButtonClass);
      btnEl.setAttribute("disabled", "");
    } else {
      btnEl.classList.remove(config.inactiveButtonClass);
      btnEl.removeAttribute("disabled", "");
    }
  });
}

function cleanError(config, modalWindow) {
  const inputsModal = Array.from(
    modalWindow.querySelectorAll(config.inputSelector)
  );
  inputsModal.forEach((inputElm) => {
    hideError(inputElm, config.inputErrorClass, config.errorClass);
  });
}

enableValidation(config);

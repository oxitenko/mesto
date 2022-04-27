function enableValidation(config) {
  const form = Array.from(document.querySelectorAll(config.formSelector));

  form.forEach((formelm) => {
    formelm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formelm, config);
  });
}

function setEventListeners(formelm, config) {
  const inputs = Array.from(formelm.querySelectorAll(config.inputSelector));
  inputs.forEach((element) => {
    element.addEventListener("input", () => {
      inputValidation(element, config);
      toggleButtonState(formelm, config, inputs);
    });
  });
}

function inputValidation(element, config) {
  if (!element.validity.valid) {
    showError(element, config);
  } else {
    hideError(element, config);
  }
}

function showError(element, config) {
  const errorNode = document.querySelector(`.${element.id}-error`);
  element.classList.add(config.inputErrorClass);
  errorNode.classList.add(config.errorClass);
  errorNode.textContent = element.validationMessage;
}

function hideError(element, config) {
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

function toggleButtonState(formelm, config, inputs) {
  const button = Array.from(
    formelm.querySelectorAll(config.submitButtonSelector)
  );
  button.forEach((btnEl) => {
    if (hasInvalidInput(inputs)) {
      btnEl.classList.add(config.inactiveButtonClass);
      btnEl.setAttribute("disabled", true);
    } else {
      btnEl.classList.remove(config.inactiveButtonClass);
      btnEl.removeAttribute("disabled", true);
    }
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

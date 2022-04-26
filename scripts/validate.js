function enableValidation(config) {
  const form = Array.from(document.querySelectorAll(config.formSelector));

  const inputs = Array.from(document.querySelectorAll(config.inputSelector));

  const button = Array.from(
    document.querySelectorAll(config.submitButtonSelector)
  );

  form.forEach((formelm) => {
    setEventListeners(
      inputs,
      button,
      config.inputErrorClass,
      config.errorClass,
      config.inactiveButtonClass,
      config.submitButtonSelector
    );
  });

  hasInvalidInput(inputs);
  toggleButtonState(inputs, button, config.inactiveButtonClass);
  inputValidation(element, config.inputErrorClass, config.errorClass);
}

function setEventListeners(
  inputs,
  button,
  inputErrorClass,
  errorClass,
  inactiveButtonClass
) {
  inputs.forEach((element) => {
    element.addEventListener("input", () => {
      inputValidation(element, inputErrorClass, errorClass);
      toggleButtonState(inputs, button, inactiveButtonClass);
    });
  });
}

function inputValidation(element, inputErrorClass, errorClass) {
  const errorNode = document.querySelector(`.${element.id}-error`);
  if (!element.validity.valid) {
    element.classList.add(inputErrorClass);
    errorNode.classList.add(errorClass);
    errorNode.textContent = element.validationMessage;
  } else {
    element.classList.remove(inputErrorClass);
    errorNode.classList.remove(errorClass);
    errorNode.textContent = "";
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputs, button, inactiveButtonClass) {
  button.forEach((btnEl) => {
    if (hasInvalidInput(inputs)) {
      btnEl.classList.add(inactiveButtonClass);
      btnEl.setAttribute("disabled", true);
    } else {
      btnEl.classList.remove(inactiveButtonClass);
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
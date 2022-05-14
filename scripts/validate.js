import { modalWindowAdd, modalWindowEdit } from "./index.js";
import { FormValidator } from "./FormValidator.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const cardFormValidator = new FormValidator(config, modalWindowAdd);
export const profileFormValidator = new FormValidator(config, modalWindowEdit);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

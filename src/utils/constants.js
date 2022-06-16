export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const modalWindowEdit = document.querySelector(".popup_type_edit-card");
export const modalWindowAdd = document.querySelector(".popup_type_add-card");
export const modalWindowView = document.querySelector(".popup_type_img-view");
export const buttonOpenWindowEdit = document.querySelector(
  ".profile__button-edit"
);
export const modalWindowUpdateAvatar = document.querySelector(
  ".popup_type_update-avatar"
);
export const nameInput = document.querySelector(".popup__input_enter_name");
export const jobInput = document.querySelector(".popup__input_enter_job");
export const buttonOpenWindowAdd = document.querySelector(
  ".profile__button-add"
);
export const buttonOpenUpdateAvatar = document.querySelector(
  ".profile__container"
);
export const modalWindowDeleteCardConfirm = document.querySelector(
  ".popup_type_delete-card"
);

export const buttonOpenDeleteCard =
  document.querySelectorAll(".card__trashbox");

export const imageSelector = ".popup__pic";
export const captionSelector = ".popup__caption";
export const cardsContainer = ".elements__container";
export const popupWithAddForm = ".popup_type_add-card";
export const popupWithImage = ".popup_type_img-view";
export const popupWithEditForm = ".popup_type_edit-card";
export const popupWithEditAvatar = ".popup_type_update-avatar";
export const nameSelector = ".profile__name";
export const profiSelector = ".profile__profi";
export const avatarSelector = ".profile__avatar";
export const popupWithDeleteForm = ".popup_type_delete-card";

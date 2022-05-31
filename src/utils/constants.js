import cardHakone from "../images/main-hakone.jpg";
import cardNara from "../images/main-nara.jpg";
import cardMiyadzima from "../images/main-miyajima.jpg";
import cardElbrus from "../images/main-elbrus.png";
import cardDombai from "../images/main-dombai.png";
import cardKarachaevsk from "../images/main-karachaevsk.jpg";

export const initialCards = [
  {
    name: "Хаконе",
    link: cardHakone,
  },

  {
    name: "Нара",
    link: cardNara,
  },

  {
    name: "Миядзима",
    link: cardMiyadzima,
  },

  {
    name: "Гора Эльбрус",
    link: cardElbrus,
  },

  {
    name: "Домбай",
    link: cardDombai,
  },

  {
    name: "Карачаево-Черкессия",
    link: cardKarachaevsk,
  },
];

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
export const nameInput = document.querySelector(".popup__input_enter_name");
export const jobInput = document.querySelector(".popup__input_enter_job");
export const buttonOpenWindowAdd = document.querySelector(
  ".profile__button-add"
);

export const imageSelector = ".popup__pic";
export const captionSelector = ".popup__caption";
export const cardsContainer = ".elements__container";
export const popupWithAddForm = ".popup_type_add-card";
export const popupWithImage = ".popup_type_img-view";
export const popupWithEditForm = ".popup_type_edit-card";
export const nameSelector = ".profile__name";
export const profiSelector = ".profile__profi";

import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { cardFormValidator, profileFormValidator } from "./validate.js";

export const modalWindowEdit = document.querySelector(".popup_type_edit-card");
const buttonCloseWindowEdit = modalWindowEdit.querySelector(
  ".popup__close-button"
);
export const modalWindowAdd = document.querySelector(".popup_type_add-card");
const buttonCloseWindowAdd = modalWindowAdd.querySelector(
  ".popup__close-button"
);
const modalWindowView = document.querySelector(".popup_type_img-view");
const buttonCloseWindowView = modalWindowView.querySelector(
  ".popup__close-button"
);
const buttonOpenWindowEdit = document.querySelector(".profile__button-edit");
const formProfileFill = document.querySelector(".popup__form");
const formCardFill = document.querySelector(".popup__form_element-add");
const nameInput = document.querySelector(".popup__input_enter_name");
const jobInput = document.querySelector(".popup__input_enter_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profi");
const buttonOpenWindowAdd = document.querySelector(".profile__button-add");
const cardNameInput = document.querySelector(".popup__input_enter_placename");
const cardLinkInput = document.querySelector(".popup__input_enter_linkplace");
const popupViewPic = document.querySelector(".popup__pic");
const popupViewCaption = document.querySelector(".popup__caption");
const cardsContainer = document.querySelector(".elements__container");

initialCards.forEach((data) => {
  const card = new Card(data, ".template__card", ".card__pic", (item) =>
    handleOpenImagePopup(item)
  );
  const cardElement = card.generateCard();

  cardsContainer.append(cardElement);
});

function handleOpenImagePopup(item) {
  popupViewPic.src = item.link;
  popupViewPic.alt = item.name;
  popupViewCaption.textContent = item.name;
  openModalWindow(modalWindowView);
}

function handleAddNewCard(evt) {
  evt.preventDefault();
  const elementCard = new Card(
    { name: cardNameInput.value, link: cardLinkInput.value },
    ".template__card",
    ".card__pic",
    (item) => handleOpenImagePopup(item)
  );
  const newCardOnPage = elementCard.generateCard();
  cardsContainer.append(newCardOnPage);
  closeModalWindow(modalWindowAdd);
  cardNameInput.value = "";
  cardLinkInput.value = "";
}

function openModalWindow(modalWindow) {
  modalWindow.classList.add("popup_opened");
  document.addEventListener("keydown", handleCloseOnEsc);
  cardFormValidator.resetValidation();
  profileFormValidator.resetValidation();
}

function handleCloseOnEsc(event) {
  if (event.key === "Escape") {
    const modalWindowActive = document.querySelector(".popup_opened");
    closeModalWindow(modalWindowActive);
  }
}

function closeModalWindow(modalWindow) {
  modalWindow.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleCloseOnEsc);
}

function handleFillProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModalWindow(modalWindowEdit);
}

buttonOpenWindowEdit.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModalWindow(modalWindowEdit);
});

buttonOpenWindowAdd.addEventListener("click", function () {
  const inputsAddCard = Array.from(
    modalWindowAdd.querySelectorAll(".popup__input")
  );
  openModalWindow(modalWindowAdd);
});

buttonCloseWindowEdit.addEventListener("click", function () {
  closeModalWindow(modalWindowEdit);
});

buttonCloseWindowAdd.addEventListener("click", function () {
  closeModalWindow(modalWindowAdd);
});

buttonCloseWindowView.addEventListener("click", function () {
  closeModalWindow(modalWindowView);
});

formProfileFill.addEventListener("submit", handleFillProfile);
formCardFill.addEventListener("submit", handleAddNewCard);

modalWindowEdit.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup_opened")
  ) {
    closeModalWindow(modalWindowEdit);
  }
});

modalWindowAdd.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup_opened")
  ) {
    closeModalWindow(modalWindowAdd);
  }
});

modalWindowView.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup_opened")
  ) {
    closeModalWindow(modalWindowView);
  }
});

import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { cardFormValidator, profileFormValidator } from "./validate.js";

const modalWindows = document.querySelectorAll(".popup");
export const modalWindowEdit = document.querySelector(".popup_type_edit-card");
export const modalWindowAdd = document.querySelector(".popup_type_add-card");
const modalWindowView = document.querySelector(".popup_type_img-view");
const buttonOpenWindowEdit = document.querySelector(".profile__button-edit");
const formProfileFill = document.querySelector(".popup__form");
const formCardFill = document.querySelector(".popup__form_element-add");
export const nameInput = document.querySelector(".popup__input_enter_name");
export const jobInput = document.querySelector(".popup__input_enter_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profi");
const buttonOpenWindowAdd = document.querySelector(".profile__button-add");
export const cardNameInput = document.querySelector(
  ".popup__input_enter_placename"
);
export const cardLinkInput = document.querySelector(
  ".popup__input_enter_linkplace"
);
const popupViewPic = document.querySelector(".popup__pic");
const popupViewCaption = document.querySelector(".popup__caption");
const cardsContainer = document.querySelector(".elements__container");

function createCard(data) {
  const card = new Card(data, ".template__card", ".card__pic", (item) =>
    handleOpenImagePopup(item)
  );
  const cardElement = card.generateCard();
  return cardElement;
}

(function renderCardsOnPage() {
  const wallRender = initialCards.map(createCard);
  cardsContainer.append(...wallRender);
})();

function handleAddNewCard(evt) {
  evt.preventDefault();
  const newCardOnPage = createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });
  cardsContainer.prepend(newCardOnPage);
  closeModalWindow(modalWindowAdd);
  formCardFill.reset();
}

function handleOpenImagePopup(item) {
  popupViewPic.src = item.link;
  popupViewPic.alt = item.name;
  popupViewCaption.textContent = item.name;
  openModalWindow(modalWindowView);
}

function openModalWindow(modalWindow) {
  modalWindow.classList.add("popup_opened");
  document.addEventListener("keydown", handleCloseOnEsc);
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
  profileFormValidator.resetValidation();
});

buttonOpenWindowAdd.addEventListener("click", function () {
  openModalWindow(modalWindowAdd);
  cardFormValidator.resetValidation();
});

modalWindows.forEach((modalWindow) => {
  modalWindow.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup_opened")) {
      closeModalWindow(modalWindow);
    }
    if (event.target.classList.contains("popup__close-button")) {
      closeModalWindow(modalWindow);
    }
  });
});

formProfileFill.addEventListener("submit", handleFillProfile);
formCardFill.addEventListener("submit", handleAddNewCard);

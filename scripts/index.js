import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { cardFormValidator, profileFormValidator } from "./validate.js";
import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";

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

const imageSelector = ".popup__pic";
const captionSelector = ".popup__caption";
const popupSelector = ".popup";
const cardsContainer = ".elements__container";
const popupWithAddForm = ".popup_type_add-card";

const createCardSample = (data) => {
  const card = new Card(data, ".template__card", ".card__pic", (item) =>
    handleOpenImagePopup(item)
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = createCardSample(cardItem);
      cardList.addItem(card);
    },
  },
  cardsContainer
);

cardList.renderItems(initialCards);

const popupAddCard = new PopupWithForm(popupWithAddForm, {
  handleFormSubmit: (data) => {
    const inputs = { name: data.placename, link: data.linkplace };
    const card = createCardSample(inputs);
    cardList.addItem(card);
    popupAddCard.close();
  },
});

function handleOpenImagePopup(item) {
  popupViewPic.src = item.link;
  popupViewPic.alt = item.name;
  popupViewCaption.textContent = item.name;
  openModalWindow(modalWindowView);
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

buttonOpenWindowAdd.addEventListener("click", () => {
  popupAddCard.open();
  cardFormValidator.resetValidation();
});

formProfileFill.addEventListener("submit", handleFillProfile);

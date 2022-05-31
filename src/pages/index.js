import "./index.css";

import { Card } from "../components/Card.js";
import {
  initialCards,
  config,
  modalWindowEdit,
  modalWindowAdd,
  modalWindowView,
  buttonOpenWindowEdit,
  nameInput,
  jobInput,
  buttonOpenWindowAdd,
  imageSelector,
  captionSelector,
  cardsContainer,
  popupWithAddForm,
  popupWithImage,
  popupWithEditForm,
  nameSelector,
  profiSelector,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

const createCardSample = (data) => {
  const card = new Card(data, ".template__card", {
    handleCardClick: () => {
      popupViewImg.open(data);
    },
  });
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

popupAddCard.setEventListeners();

const popupViewImg = new PopupWithImage(
  popupWithImage,
  imageSelector,
  captionSelector
);

popupViewImg.setEventListeners();

const user = new UserInfo({ nameSelector, profiSelector });

const popupEditProfile = new PopupWithForm(popupWithEditForm, {
  handleFormSubmit: (data) => {
    user.setUserInfo(data);
    popupEditProfile.close();
  },
});

popupEditProfile.setEventListeners();

buttonOpenWindowEdit.addEventListener("click", () => {
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.profi;
  popupEditProfile.open();
  profileFormValidator.resetValidation();
});

buttonOpenWindowAdd.addEventListener("click", () => {
  popupAddCard.open();
  cardFormValidator.resetValidation();
});

const cardFormValidator = new FormValidator(config, modalWindowAdd);
const profileFormValidator = new FormValidator(config, modalWindowEdit);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

import "./index.css";

import { Card } from "../components/Card.js";
import {
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
  avatarSelector,
  popupWithEditAvatar,
  buttonOpenUpdateAvatar,
  modalWindowUpdateAvatar,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-43");

const createCardSample = (data) => {
  const card = new Card(data, ".template__card", {
    handleCardClick: () => {
      popupViewImg.open(data);
    },
  });
  api
    .likeCard(data)
    .then((res) => card.handleLikeCount(res))
    .catch((err) => console.log(err));
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCardSample(data);
      cardList.addItem(card);
    },
  },
  cardsContainer
);

api
  .getCards()
  .then((cards) => cardList.renderItems(cards))
  .catch((err) => console.log(err));

const popupAddCard = new PopupWithForm(popupWithAddForm, {
  handleFormSubmit: (data) => {
    const inputs = { name: data.placename, link: data.linkplace };
    api
      .postNewCard(inputs)
      .then((inputs) => {
        const card = createCardSample(inputs);
        cardList.addItem(card);
      })
      .catch((err) => console.log(err));
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

const user = new UserInfo(nameSelector, profiSelector, avatarSelector);

api
  .getUserInfo()
  .then((userData) => {
    user.setUserInfo(userData);
  })
  .catch((err) => console.log(err));

const popupEditProfile = new PopupWithForm(popupWithEditForm, {
  handleFormSubmit: (data) => {
    api
      .editUserInfo(data)
      .then((res) => user.setUserInfo(res))
      .catch((err) => console.log(err));
    popupEditProfile.close();
  },
});

popupEditProfile.setEventListeners();

const popupEditUserAvatar = new PopupWithForm(popupWithEditAvatar, {
  handleFormSubmit: (data) => {
    api
      .editUserAvatar(data)
      .then((res) => user.editUserAvatar(res))
      .catch((err) => console.log(err));
    popupEditUserAvatar.close();
  },
});

popupEditUserAvatar.setEventListeners();

buttonOpenUpdateAvatar.addEventListener("click", () => {
  popupEditUserAvatar.open();
  avatarFormValidator.resetValidation();
});

buttonOpenWindowEdit.addEventListener("click", () => {
  api
    .getUserInfo()
    .then((res) => {
      nameInput.value = res.name;
      jobInput.value = res.about;
    })
    .catch((err) => console.log(err));
  popupEditProfile.open();
  profileFormValidator.resetValidation();
});

buttonOpenWindowAdd.addEventListener("click", () => {
  popupAddCard.open();
  cardFormValidator.resetValidation();
});

const cardFormValidator = new FormValidator(config, modalWindowAdd);
const profileFormValidator = new FormValidator(config, modalWindowEdit);
const avatarFormValidator = new FormValidator(config, modalWindowUpdateAvatar);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

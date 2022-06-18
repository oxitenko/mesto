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
  modalWindowDeleteCardConfirm,
  popupWithDeleteForm,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
let userID = null;

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-43");

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userID = userData._id;
    user.setUserInfo(userData);
    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));

const createCardSample = (data) => {
  const card = new Card(data, ".template__card", userID, {
    handleCardClick: () => {
      popupViewImg.open(data);
    },
    handleLikeCard: (data) => {
      api
        .likeCard(data)
        .then((res) => card.likeCard(res))
        .catch((err) => console.log(err));
    },
    handleDeleteLike: (data) => {
      api
        .deleteLike(data)
        .then((res) => card.deleteLike(res))
        .catch((err) => console.log(err));
    },
    handleDeleteCard: (data) => {
      popupDeleteCard.open();
      popupDeleteCard.setSubmitAction(() => {
        api
          .deleteCard(data)
          .then(() => {
            card.deleteCard();
            popupDeleteCard.close();
          })
          .catch((err) => console.log(err));
      });
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
};

const popupDeleteCard = new PopupWithConfirm(popupWithDeleteForm);
popupDeleteCard.setEventListeners();

const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCardSample(data);
      cardList.addItem(card);
    },
  },
  cardsContainer
);

const popupAddCard = new PopupWithForm(popupWithAddForm, {
  handleFormSubmit: (data) => {
    popupAddCard.updateLoading(true, "Создать");
    api
      .postNewCard(data)
      .then((res) => {
        const card = createCardSample(res);
        cardList.addItem(card);
        popupAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAddCard.updateLoading(false, "Создать");
      });
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

const popupEditProfile = new PopupWithForm(popupWithEditForm, {
  handleFormSubmit: (data) => {
    popupEditProfile.updateLoading(true);
    api
      .editUserInfo(data)
      .then((res) => {
        user.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditProfile.updateLoading(false);
      });
  },
});

popupEditProfile.setEventListeners();

const popupEditUserAvatar = new PopupWithForm(popupWithEditAvatar, {
  handleFormSubmit: (data) => {
    popupEditUserAvatar.updateLoading(true);
    api
      .editUserAvatar(data)
      .then((res) => {
        user.setUserInfo(res);
        popupEditUserAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditUserAvatar.updateLoading(false);
      });
  },
});

popupEditUserAvatar.setEventListeners();

buttonOpenUpdateAvatar.addEventListener("click", () => {
  popupEditUserAvatar.open();
  avatarFormValidator.resetValidation();
});

buttonOpenWindowEdit.addEventListener("click", () => {
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
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

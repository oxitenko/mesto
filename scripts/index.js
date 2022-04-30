const modalWindowEdit = document.querySelector(".popup_type_edit-card");
const buttonCloseWindowEdit = modalWindowEdit.querySelector(
  ".popup__close-button"
);
const modalWindowAdd = document.querySelector(".popup_type_add-card");
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
const cardsContainer = document.querySelector(".elements__container");
const cardsTemplate = document.querySelector(".template__card");
const buttonOpenWindowAdd = document.querySelector(".profile__button-add");
const cardNameInput = document.querySelector(".popup__input_enter_placename");
const cardLinkInput = document.querySelector(".popup__input_enter_linkplace");
const popupViewPic = document.querySelector(".popup__pic");
const popupViewCaption = document.querySelector(".popup__caption");

function addCardsOnPage() {
  const wallRender = initialCards.map(getCard);
  cardsContainer.append(...wallRender);
}

function getCard(item) {
  const cardsElement = cardsTemplate.content.cloneNode(true);
  const titleCard = cardsElement.querySelector(".template__title");
  const imageCard = cardsElement.querySelector(".template__pic");
  const buttonDeleteCard = cardsElement.querySelector(".template__trashbox");
  const buttonLikeCard = cardsElement.querySelector(".template__like");

  titleCard.textContent = item.name;
  imageCard.src = item.link;
  imageCard.alt = item.name;

  buttonDeleteCard.addEventListener("click", handleDeleteCard);
  buttonLikeCard.addEventListener("click", handleLikeCard);
  imageCard.addEventListener("click", function () {
    popupViewPic.src = item.link;
    popupViewPic.alt = item.name;
    popupViewCaption.textContent = item.name;
    openModalWindow(modalWindowView);
  });

  return cardsElement;
}

addCardsOnPage();

function openModalWindow(modalWindow) {
  modalWindow.classList.add("popup_opened");

  document.addEventListener("keydown", closeOnEsc);

  const overlay = Array.from(document.querySelectorAll(".popup"));
  overlay.forEach((overlayElm) => {
    overlayElm.addEventListener("click", (event) => {
      if (event.target === overlayElm) {
        closeModalWindow(modalWindow);
      }
    });
  });

  cleanError(config, modalWindow);
}

function closeOnEsc(event) {
  const modalWindowActive = document.querySelector(".popup_opened");
  if (event.key === "Escape") {
    closeModalWindow(modalWindowActive);
  }
}

function closeModalWindow(modalWindow) {
  modalWindow.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
}

function handleDeleteCard(evt) {
  const deleteCard = evt.target.closest(".template__item");
  deleteCard.remove();
}

function handleLikeCard(evt) {
  evt.target.classList.toggle("template__like_active");
}

function handleAddNewCard(evt) {
  evt.preventDefault();
  const newCardOnPage = getCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });
  cardsContainer.prepend(newCardOnPage);
  closeModalWindow(modalWindowAdd);
  cardNameInput.value = "";
  cardLinkInput.value = "";
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
  toggleButtonState(modalWindowAdd, config, inputsAddCard);
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

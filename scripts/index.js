const modalWindow = document.querySelector(".popup");
const modalWindowEdit = document.querySelector(".popup_element-edit");
const closeButtonEdit = modalWindowEdit.querySelector(".popup__close-button");
const modalWindowAdd = document.querySelector(".popup_element-add");
const closeButtonAdd = modalWindowAdd.querySelector(".popup__close-button");
const modalWindowView = document.querySelector(".popup_element-imgview");
const closeButtonView = modalWindowView.querySelector(".popup__close-button");
const editButton = document.querySelector(".profile__button-edit");
const formElement = document.querySelector(".popup__form");
const formElementAdd = document.querySelector(".popup__form_element-add");
const nameInput = document.querySelector(".popup__input_enter_name");
const jobInput = document.querySelector(".popup__input_enter_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profi");
const cardsContainer = document.querySelector(".elements__container");
const cardsTemplate = document.querySelector(".elements__template");
const addButton = document.querySelector(".profile__button-add");
const placenameInput = document.querySelector(".popup__input_enter_placename");
const placelinkInput = document.querySelector(".popup__input_enter_linkplace");
const popupViewPic = document.querySelector(".popup__pic");
const popupViewCaption = document.querySelector(".popup__caption");

const initialCards = [
  {
    name: "Хаконе",
    link: "images/main-hakone.jpg",
  },

  {
    name: "Нара",
    link: "images/main-nara.jpg",
  },

  {
    name: "Миядзима",
    link: "images/main-miyajima.jpg",
  },

  {
    name: "Гора Эльбрус",
    link: "images/main-elbrus.png",
  },

  {
    name: "Домбай",
    link: "images/main-dombai.png",
  },

  {
    name: "Карачаево-Черкессия",
    link: "images/main-karachaevsk.jpg",
  },
];

function addCardsOnPage() {
  const wallRender = initialCards.map(getCards);
  cardsContainer.append(...wallRender);
}

function getCards(item) {
  const cardsElement = cardsTemplate.content.cloneNode(true);
  const titleCard = cardsElement.querySelector(".elements__title");
  const imageCard = cardsElement.querySelector(".elements__pic");
  const deleteButton = cardsElement.querySelector(".elements__trashbox");
  const likeButton = cardsElement.querySelector(".elements__like");

  titleCard.textContent = item.name;
  imageCard.src = item.link;
  imageCard.alt = item.name;

  deleteButton.addEventListener("click", handlerDeleteCard);
  likeButton.addEventListener("click", handlerLikeCard);
  imageCard.addEventListener("click", function (evt) {
    if (!modalWindowView.classList.contains("popup_opened")) {
      const el = evt.target;
      popupViewPic.src = el.getAttribute("src");
      popupViewPic.alt = el.getAttribute("alt");
      popupViewCaption.textContent = el.getAttribute("alt");
    }
    OpenModalWindow(modalWindowView);
  });

  return cardsElement;
}

addCardsOnPage();

function OpenModalWindow(modalWindow) {
  modalWindow.classList.add("popup_opened");
}

function CloseModalWindow(modalWindow) {
  modalWindow.classList.remove("popup_opened");
}

function handlerDeleteCard(evt) {
  const deletaCard = evt.target.closest(".elements__item");
  deletaCard.remove();
}

function handlerLikeCard(evt) {
  evt.target.classList.toggle("elements__like_active");
}

function handlerAddNewCard(evt) {
  evt.preventDefault();
  const newCardOnPage = getCards({
    name: placenameInput.value,
    link: placelinkInput.value,
  });
  cardsContainer.prepend(newCardOnPage);
  CloseModalWindow(modalWindowAdd);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  CloseModalWindow(modalWindowEdit);
}

editButton.addEventListener("click", function () {
  if (!modalWindowEdit.classList.contains("popup_opened")) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  OpenModalWindow(modalWindowEdit);
});

addButton.addEventListener("click", function () {
  OpenModalWindow(modalWindowAdd);
});

closeButtonEdit.addEventListener("click", function () {
  CloseModalWindow(modalWindowEdit);
});
closeButtonAdd.addEventListener("click", function () {
  CloseModalWindow(modalWindowAdd);
});
closeButtonView.addEventListener("click", function () {
  CloseModalWindow(modalWindowView);
});

formElement.addEventListener("submit", formSubmitHandler);
formElementAdd.addEventListener("submit", handlerAddNewCard);

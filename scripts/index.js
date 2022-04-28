const modalWindowEdit = document.querySelector(".popup_element-edit");
const buttonCloseWindowEdit = modalWindowEdit.querySelector(
  ".popup__close-button"
);
const modalWindowAdd = document.querySelector(".popup_element-add");
const buttonCloseWindowAdd = modalWindowAdd.querySelector(
  ".popup__close-button"
);
const modalWindowView = document.querySelector(".popup_element-imgview");
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
const cardsTemplate = document.querySelector(".elements__template");
const buttonOpenWindowAdd = document.querySelector(".profile__button-add");
const cardNameInput = document.querySelector(".popup__input_enter_placename");
const cardLinkInput = document.querySelector(".popup__input_enter_linkplace");
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
  const buttonDeleteCard = cardsElement.querySelector(".elements__trashbox");
  const buttonLikeCard = cardsElement.querySelector(".elements__like");

  titleCard.textContent = item.name;
  imageCard.src = item.link;
  imageCard.alt = item.name;

  buttonDeleteCard.addEventListener("click", handlerDeleteCard);
  buttonLikeCard.addEventListener("click", handlerLikeCard);
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

  document.addEventListener("keydown", (event) => {
    if (
      event.target.classList.contains("popup__opened") ||
      event.key === "Escape"
    ) {
      closeModalWindow(modalWindow);
    }
  });

  document.addEventListener("click", (event) => {
    const overlay = Array.from(document.querySelectorAll(".popup"));
    overlay.forEach((overlayelm) => {
      if (event.target === overlayelm) {
        closeModalWindow(modalWindow);
      }
    });
  });

  cleanError(config, modalWindow);
}

function closeModalWindow(modalWindow) {
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
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });
  cardsContainer.prepend(newCardOnPage);
  cardNameInput.value = "";
  cardLinkInput.value = "";
  closeModalWindow(modalWindowAdd);
}

function handlerFillProfile(evt) {
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

formProfileFill.addEventListener("submit", handlerFillProfile);
formCardFill.addEventListener("submit", handlerAddNewCard);

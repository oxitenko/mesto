let modalWindow = document.querySelector('.popup');
let addButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__profi');

function OpenCloseModalWindow() {
    modalWindow.classList.toggle('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    OpenCloseModalWindow();
}

addButton.addEventListener('click', OpenCloseModalWindow);
closeButton.addEventListener('click', OpenCloseModalWindow);
formElement.addEventListener('submit', formSubmitHandler);







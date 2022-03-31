let modalWindow = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_enter_name');
let jobInput = document.querySelector('.popup__input_enter_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__profi');

function OpenCloseModalWindow() {
    if (!modalWindow.classList.contains('popup_opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;    
    }
    modalWindow.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    OpenCloseModalWindow();
}

editButton.addEventListener('click', OpenCloseModalWindow);
closeButton.addEventListener('click', OpenCloseModalWindow);
formElement.addEventListener('submit', formSubmitHandler);





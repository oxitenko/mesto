import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    this._buttonSubmit = this._popupForm.querySelector(".popup__submit-button");
  }

  updateLoading(
    isLoading,
    messageInitial = "Сохранить",
    messageLoading = "Сохранение..."
  ) {
    if (isLoading) {
      this._buttonSubmit.textContent = messageLoading;
    } else {
      this._buttonSubmit.textContent = messageInitial;
    }
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (event.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
    document.addEventListener("keydown", this._handleEscClose);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

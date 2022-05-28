import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, captionSelector) {
    super(popupSelector);
    this._imageSelector = document.querySelector(imageSelector);
    this._captionSelector = document.querySelector(captionSelector);
  }

  open(data) {
    this._imageSelector.src = data.link;
    this._imageSelector.alt = dana.name;
    this._captionSelector.textContent = data.name;
    super.open();
  }
}

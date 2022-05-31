import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, captionSelector) {
    super(popupSelector);
    this._imageSelector = this._popup.querySelector(imageSelector);
    this._captionSelector = this._popup.querySelector(captionSelector);
  }

  open(data) {
    this._imageSelector.src = data.link;
    this._imageSelector.alt = data.name;
    this._captionSelector.textContent = data.name;
    super.open();
  }
}

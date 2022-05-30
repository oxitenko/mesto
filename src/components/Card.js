export class Card {
  constructor(data, cardSelector, imageSelector, { handleCardClick }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._imageSelector = imageSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeCard(btn) {
    btn.classList.toggle("card__like_active");
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__trashbox")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    const buttonLike = this._element.querySelector(".card__like");
    buttonLike.addEventListener("click", () => {
      this._handleLikeCard(buttonLike);
    });
    this._element
      .querySelector(this._imageSelector)
      .addEventListener("click", () => this._handleCardClick(this._data));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(this._imageSelector).src = this._link;
    this._element.querySelector(this._imageSelector).alt = this._name;

    return this._element;
  }
}

export class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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
    this._element = null;
  }

  _handleLikeCard() {
    this._buttonLike.classList.toggle("card__like_active");
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__trashbox")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeCard();
    });
    this._imageSelector.addEventListener("click", () =>
      this._handleCardClick(this._data)
    );
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector(".card__like");
    this._imageSelector = this._element.querySelector(".card__pic");
    this._element.querySelector(".card__title").textContent = this._name;
    this._imageSelector.src = this._link;
    this._imageSelector.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}

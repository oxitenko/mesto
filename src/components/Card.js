export class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
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
    this._imageCard.addEventListener("click", () =>
      this._handleCardClick(this._data)
    );
  }

  handleLikeCount() {
    this._likeNumber.textContent = String(this._likes.length);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector(".card__like");
    this._imageCard = this._element.querySelector(".card__pic");
    this._element.querySelector(".card__title").textContent = this._name;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._likeNumber = this._element.querySelector(".card__counter");

    this._setEventListeners();

    return this._element;
  }
}

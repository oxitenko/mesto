export class Card {
  constructor(
    data,
    cardSelector,
    myID,
    { handleCardClick, handleLikeCard, handleDeleteLike, handleDeleteCard }
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._myID = myID;
    this._owner = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLike = handleDeleteLike;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  isLikeState() {
    const myLike = this._data.likes.some((item) => item._id === this._myID);
    if (myLike) {
      this._deleteLike();
    } else {
      this._likeCard();
    }
    this._likeNumber.textContent = String(data.likes.length);
  }

  _checkLikeOwner() {
    this._data.likes.forEach((item) => {
      if (item._id === this._owner) {
        this._likeCard(this._data);
      }
    });
  }

  _likeCard() {
    this._buttonLike.classList.add("card__like_active");
    this._handleLikeCard(this._data);
  }

  _deleteLike() {
    this._buttonLike.classList.remove("card__like_active");
    this._handleDeleteLike(this._data);
  }

  _setEventListeners() {
    this._trashbox.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });
    this._buttonLike.addEventListener("click", this.isLikeState);
    this._imageCard.addEventListener("click", () =>
      this._handleCardClick(this._data)
    );
  }

  _chekCardOwner() {
    if (this._myID !== this._owner) {
      this._trashbox.remove();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._trashbox = this._element.querySelector(".card__trashbox");
    this._buttonLike = this._element.querySelector(".card__like");
    this._imageCard = this._element.querySelector(".card__pic");
    this._element.querySelector(".card__title").textContent = this._name;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._likeNumber = this._element.querySelector(".card__counter");
    this._checkLikeOwner();
    this._chekCardOwner();

    this._setEventListeners();

    return this._element;
  }
}

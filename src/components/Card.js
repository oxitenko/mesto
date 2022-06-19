import { data } from "autoprefixer";

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

  _getLikeInfo = () => this._data.likes.some((item) => item._id === this._myID);

  _changeLikeState = () => {
    if (this._getLikeInfo()) {
      this._handleDeleteLike(this._data);
    } else {
      this._handleLikeCard(this._data);
    }
  };

  _updateLikeState(data) {
    this._data.likes = data.likes;
    this._likeNumber.textContent = String(this._data.likes.length);
  }

  likeCard(data) {
    this._buttonLike.classList.add("card__like_active");
    this._updateLikeState(data);
  }

  deleteLike(data) {
    this._buttonLike.classList.remove("card__like_active");
    this._updateLikeState(data);
  }

  _setEventListeners() {
    this._trashbox.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });
    this._buttonLike.addEventListener("click", this._changeLikeState);
    this._imageCard.addEventListener("click", () =>
      this._handleCardClick(this._data)
    );
  }

  _chekCardOwner() {
    if (this._myID !== this._owner) {
      this._trashbox.remove();
    }
  }

  _checkLikeOwner() {
    if (this._getLikeInfo()) {
      this.likeCard(this._data);
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
    this._updateLikeState(this._data);

    this._setEventListeners();

    return this._element;
  }
}

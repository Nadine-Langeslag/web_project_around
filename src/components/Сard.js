export default class Card {
  constructor(
    image,
    name,
    cardTemplate,
    handleClick,
    /* handeldelete */
    handleDelete,
    handleLike,
    cardId,
  ) {
    this._image = image; //link de la tarjeta
    this._name = name;
    this._cardTemplate = cardTemplate; //Selector de la clase de card
    this._handleClick = handleClick;
    this._handleDelete = handleDelete;
    this._cardId = cardId;
    this._handleLike = handleLike;
  }
  _getTemplate() {
    const template = document.querySelector(this._cardTemplate).content;
    this._card = template.querySelector(".elements__card").cloneNode(true);
    this._card.querySelector(".elements__image").src = this._image;
    this._card.querySelector(".elements__image").alt = this._name;
    this._card.querySelector(".elements__title").textContent = this._name;
    //Activar los eventos para cada una de las tarjetas que estar en la pagina
    /* this._setEventListeners(); */
    return this._card; //Una vez que colocamos todos los valores a la tarjeta, la retornamos como un objeto
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    this._card
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => {
        this._handleDelete(this._card);
      });

    this._card
      .querySelector(".elements__like-button")
      .addEventListener("click", () => {
        this._handleLike(this._cardId);
      });
    /* this._card
      .querySelector(".elements__like-button")
      .addEventListener("click", () => {
        this._card
          .querySelector(".elements__like-button")
          .classList.toggle("elements__like-button_active");
      }); */

    this._card
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleClick(this._name, this._link);
      });
  }
  handleLike() {
    this._card
      .querySelector(".elements__like-button")
      .classList.toggle("elements__like-button_active");
  }

  renderCard() {
    return this._getTemplate();
  }
}

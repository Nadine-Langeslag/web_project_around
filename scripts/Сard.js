export default class Card {
  constructor(image, name, cardTemplate, handleClick) {
    this._image = image; //link de la tarjeta
    this._name = name;
    this._cardTemplate = cardTemplate; //Selector de la clase de card
    this._handleClick = handleClick;
  }
  _getTemplate() {
    const template = document.querySelector(this._cardTemplate).content;
    this._card = template.querySelector(".elements__card").cloneNode(true);
    this._card.querySelector(".elements__image").src = this._image;
    this._card.querySelector(".elements__image").alt = this._name;
    this._card.querySelector(".elements__title").textContent = this._name;
    //Activar los eventos para cada una de las tarjetas que estar en la pagina
    this._setEventListeners();
    return this._card; //Una vez que colocamos todos los valores a la tarjeta, la retornamos como un objeto
  }

  _setEventListeners() {
    this._card
      .querySelector(".elements__delete-button")
      .addEventListener("click", function () {
        this._card.remove();
      });

    this._card
      .querySelector(".elements__like-button")
      .addEventListener("click", function () {
        this._card
          .querySelector(".elements__like-button")
          .classList.toggle("elements__like-button_active");
      });

    this._card
      /* .querySelector(".elements__card") */
      .addEventListener("click", () => {
        this._handleClick();
      });
  }

  renderCard() {
    return this._getTemplate();
  }
}

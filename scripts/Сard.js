export default class Card {
  constructor(image, name, cardTemplate) {
    this._image = image;
    this._name = name;
    this._cardTemplate = cardTemplate;
  }
  _getTemplate() {
    const template = document.querySelector(this._cardTemplate).content;
    this._card = template.querySelector(".elements__template").cloneNode(true);
    this._card.querySelector(".elements__image").src = link;
    this._card.querySelector(".elements__image").alt = name;
    this._card.querySelector(".elements__title").textContent = name;
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
  }

  renderCard() {
    this._getTemplate();
    this._setEventListeners();
    return this._card;
  }
}

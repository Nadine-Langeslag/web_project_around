import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(PopupSelector, hadleSubmit) {
    super(PopupSelector);
    this._hadleSubmit = hadleSubmit;
  }

  _setEventListeners() {
    super._setEventListeners();
    /* submit del formulario */
    this._popup
      .querySelector(".popup__form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const inputValues = this._getInputValue(event.target);
        this._hadleSubmit(inputValues);
      });
  }

  _getInputValue(popup__content) {
    const inputs = popup__content.querySelectorAll(".popup__input");
    const inputValues = {};
    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
}

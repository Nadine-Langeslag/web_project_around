import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitButton = this._popup.querySelector(".popup__save-button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _setEventListeners() {
    super._setEventListeners();
    /* submit del formulario */
    this._popup
      .querySelector(".popup__form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const inputValues = this._getInputValue(event.target);
        this._handleSubmit(inputValues);
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
  renderLoading(isLoading, loadingText = "Guardando...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}

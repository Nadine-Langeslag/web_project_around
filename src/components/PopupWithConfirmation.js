import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }

  _setEventListeners() {
    super._setEventListeners();
    /* submit del formulario */
    this._popup
      .querySelector(".popup__form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this._handleSubmit();
      });
  }
}

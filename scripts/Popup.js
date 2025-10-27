export default class Popup {
  constructor(PopupSelector) {
    this._popup = document.querySelector(PopupSelector);
    this._setEventListeners();
  }
  _setEventListeners() {
    /* Close popup click on close button */
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", () => {
        this.close();
      });

    /* Close popup click outside */
    this._popup.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup_open")) {
        this.close();
      }
    });
  }

  /* Close popup Esc */
  _handleEscEvent = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  open() {
    this._popup.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscEvent);
  }

  close() {
    this._popup.classList.remove("popup_open");
    document.addEventListener("keydown", this._handleEscEvent);
  }
}

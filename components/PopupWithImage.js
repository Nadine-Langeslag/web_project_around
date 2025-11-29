import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(PopupSelector) {
    super(PopupSelector);
  }

  open(name, link) {
    super.open();
    console.log(this._popup);
    this._popup.querySelector(".image-popup__image").src = link;
    this._popup.querySelector(".image-popup__image").alt = name;
  }
}

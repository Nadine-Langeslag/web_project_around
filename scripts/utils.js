import Card from "./Сard.js";

export const formProperties = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup_error",
  errorClass: "error_visible",
};

/* profile elements */
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__ocupation");

/* Profile form */
const profileForm = document.querySelector(".popup__profile");
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");
const saveButton = document.querySelector(".popup__save-button");
const popupInput = document.querySelector(".popup__input");

/* Buttons */
const profileEditButton = document.querySelector(".profile__edit-button");
const popupCloseButtons = Array.from(
  document.querySelectorAll(".popup__close-button")
);
/* Card form */
const addCardForm = document.querySelector(".popup__card");
const titleInput = document.querySelector(".popup__input_title");
const urlInput = document.querySelector(".popup__input_url");
const cardButton = document.querySelector(".profile__add-button");
/* Card elements */

const cardTemplate = document
  .querySelector(".elements__template")
  .content.querySelector(".elements__card");
const cardImage = document.querySelector(".elements__image");
const cardDeleteButton = document.querySelector(".elements__delete-button");
const cardTitle = document.querySelector(".elements__title");
const cardLikeButton = document.querySelector(".elements__like-button");

/* Cards image popup */

const imagePopup = document.querySelector(".popup_image");
const imagePopupImg = document.querySelector(".image-popup__image");
const imagePopupTitle = document.querySelector(".image-popup__title");

const popups = Array.from(document.querySelectorAll(".popup"));

/* Eddit Profile popop */

function editProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
}

profileForm.addEventListener("submit", editProfile);

profileEditButton.addEventListener("click", function () {
  profileForm.classList.add("popup_open");
  document.addEventListener("keydown", escapeClose);
});
popupCloseButtons.forEach(function (popupCloseButton) {
  popupCloseButton.addEventListener("click", function () {
    document.querySelector(".popup_open").classList.remove("popup_open");
  });
});

saveButton.addEventListener("click", function () {
  profileForm.classList.remove("popup_open");
});

cardButton.addEventListener("click", function () {
  addCardForm.classList.add("popup_open");
  document.addEventListener("keydown", escapeClose);
});
/* Close popup with esc & click outside */

function clickOutPopupEvent(event) {
  if (event.target.classList.contains("popup_open")) {
    event.target.classList.remove("popup_open");
  }
}

function escapeClose(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_open");
    openPopup.classList.remove("popup_open");

    document.removeEventListener("keydown", escapeClose);
  }
}

popups.forEach(function (popup) {
  popup.addEventListener("click", clickOutPopupEvent);
});

//data -> image (link), name de la tarjeta
const createCard = (data) => {
  return new Card(data.link, data.name, ".elements__template")._getTemplate();
};

const renderCard = (data, containerCards) => {
  containerCards.prepend(createCard(data));
};

export { renderCard, addCardForm, profileForm };

import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import Card from "./Сard.js";
/* import { renderCard } from "./utils.js"; */

//-------- Profile Edit -----------
/* Popop profile edit */
const PopupProfile = new PopupWithForm(".popup__profile", (inputValues) => {
  UserInfo.setUserInfo(inputValues.name, inputValues.about);
});

/* Popup User info --> change + save info*/
const userInfo = new UserInfo(".profile__name", ".profile__ocupation");
const popoEdidtProfile = new PopupWithForm(".popup__profile", (formData) => {
  userInfo.setUserInfo(formData.name, formData.about);
  PopupProfile.close();
});
popoEdidtProfile._setEventListeners();

/* Edit profile button */
const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", () => {
  PopupProfile.open();
});

//-------- Initial Cards info -----------
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

//-------- Add Card -----------
/* open popup add card */
const sectionElements = document.querySelector(".elements");

const PopupAddCard = new PopupWithForm(".popup__card", (inputValues) => {
  UserInfo.setUserInfo(inputValues.title, inputValues.url);
});

/* add card info + save + add card*/

const createCard = (data) => {
  return new Card(data.link, data.name, ".elements__template")._getTemplate();
};

const renderCard = (data, containerCards) => {
  containerCards.prepend(createCard(data));
};

for (let i = 0; i < initialCards.length; i++) {
  renderCard(
    { name: initialCards[i].name, link: initialCards[i].link },
    sectionElements
  );
}

/* const titleInput = document.querySelector(".popup__input_title");
const urlInput = document.querySelector(".popup__input_url");

const pupupAddCard = new PopupWithForm(".popup__card", (inputValues) => {
  const createCard = (inputValues) => {
    return new Card(
      inputValues.link,
      inputValues.name,
      ".elements__template"
    )._getTemplate();
  };

  const renderCard = (inputValues, containerCards) => {
    containerCards.prepend(createCard(inputValues));
  };
});

for (let i = 0; i < initialCards.length; i++) {
  //const card = cardCreation(initialCards[i].name, initialCards[i].link);
  //sectionElements.append(card);
  renderCard(
    { name: initialCards[i].name, link: initialCards[i].link },
    Section
  );
}
addCardForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = titleInput.value;
  const url = urlInput.value;
  renderCard({ name, link: url }, Section);
}); */

/* Add card button */

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  PopupAddCard.open();
});

//-------- Form validators  -----------

const formProperties = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup_error",
  errorClass: "error_visible",
};

const formCardValidator = new FormValidator(PopupAddCard, formProperties);
formCardValidator.enableValidation();

const formProfileValidator = new FormValidator(PopupProfile, formProperties);
formProfileValidator.enableValidation();

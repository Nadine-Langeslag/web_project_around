import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Сard.js";
import Api from "../components/Api.js";
/* import { renderCard } from "./utils.js"; */

//-------- Api  -----------

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "da965d4f-711c-4187-a2a3-c288d32d0c23",
    "Content-Type": "application/json",
  },
});

//-------- Profile Edit -----------

/* Popup User info --> change + save info*/
const userInfo = new UserInfo(".profile__name", ".profile__occupation");
const popupEditProfile = new PopupWithForm(".popup__profile", (formData) => {
  userInfo.setUserInfo(formData.name, formData.about);
  popupEditProfile.close();
});
popupEditProfile._setEventListeners();

/* Edit profile button */
const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", () => {
  popupEditProfile.open();
});

// Cargar información del usuario al iniciar la página
api
  .getUserInfo()
  .then((userData) => {
    // Actualizar la información del usuario en la página
    userInfo.setUserInfo(userData.name, userData.about);
  })
  .catch((err) => {
    console.log(err);
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
/* const sectionElements = document.querySelector(".elements"); */
const sectionElements = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      sectionElements.addItem(cardElement);
    },
  },
  ".elements"
);

/* add card info + save + add card*/

const PopupAddCard = new PopupWithForm(".popup__card", (formData) => {
  //Mapeo para que los nombres coincidan
  const cardData = {
    name: formData.title,
    link: formData.url,
  };

  // Handle adding new card
  const newCard = createCard(cardData);
  sectionElements.prepend(newCard);
  PopupAddCard.close();
});

const createCard = (data) => {
  const card = new Card(data.link, data.name, ".elements__template", () => {
    const popupImage = new PopupWithImage(".popup_image");
    popupImage.open(data.name, data.link);
  });
  const cardElement = card._getTemplate();
  card._setEventListeners();
  return cardElement;
};

const renderCard = (data, containerCards) => {
  containerCards.prepend(createCard(data));
};

/* for (let i = 0; i < initialCards.length; i++) {
  sectionElements.prepend(createCard(initialCards[i]));
}
 */
/* Add card button */

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  PopupAddCard.open();
});

/* Card info with api */
api
  .getInitialCards()
  .then((cardsData) => {
    // Aquí crearás las tarjetas con los datos del servidor
    cardsData.forEach((cardData) => {
      const card = createCard(cardData);
      sectionElements.addItem(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//-------- Form validators  -----------

const pupupCardElement = document.querySelector(".popup__card");
const pupupEdidProfileElement = document.querySelector(".popup__profile");

const formProperties = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup_error",
  errorClass: "error_visible",
};

const formCardValidator = new FormValidator(pupupCardElement, formProperties);
formCardValidator.enableValidation();

const formProfileValidator = new FormValidator(
  pupupEdidProfileElement,
  formProperties
);
formProfileValidator.enableValidation();

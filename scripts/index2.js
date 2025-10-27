import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import {
  renderCard,
  formProperties,
  profileForm,
  addCardForm,
} from "../scripts/utils.js";

/* Popup User info --> change info */
const userinfo = new UserInfo(".profile__name", ".profile__ocupation");
const popoEdidtProfile = new PopupWithForm(".popup__profile", (formData) => {
  userinfo.SetUserInfo(formData.name, formData.about);
});
popoEdidtProfile._setEventListeners();

/* Form validators */
const formCardValidator = new FormValidator(addCardForm, formProperties);
formCardValidator.enableValidation();

const formProfileValidator = new FormValidator(profileForm, formProperties);
formProfileValidator.enableValidation();

//Popup Image Elements
const titleInput = document.querySelector(".popup__input_title");
const urlInput = document.querySelector(".popup__input_url");

// Card Elements
const sectionElements = document.querySelector(".elements"); //Sección donde guardaremos las tarjetas

/* Initial Cards info */
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

/* Card Template */

/* function cardCreation(name, link) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".elements__image").src = link;
  card.querySelector(".elements__image").alt = name;
  card.querySelector(".elements__title").textContent = name;

  card
    .querySelector(".elements__delete-button")
    .addEventListener("click", function () {
      card.remove();
    });

  card
    .querySelector(".elements__like-button")
    .addEventListener("click", function () {
      card
        .querySelector(".elements__like-button")
        .classList.toggle("elements__like-button_active");
    });

  card.querySelector(".elements__image").addEventListener("click", function () {
    imagePopup.classList.add("popup_open");
    imagePopupImg.src = link;
    imagePopupImg.alt = name;
    imagePopupTitle.textContent = name;
  });
  return card;
} */

for (let i = 0; i < initialCards.length; i++) {
  //const card = cardCreation(initialCards[i].name, initialCards[i].link);
  //sectionElements.append(card);
  renderCard(
    { name: initialCards[i].name, link: initialCards[i].link },
    sectionElements
  );
}

addCardForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = titleInput.value;
  const url = urlInput.value;
  renderCard({ name, link: url }, sectionElements);
});

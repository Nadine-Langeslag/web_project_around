import FormValidator from "./FormValidator.js";
import { formProperties, profileForm, addCardForm } from "../scripts/utils.js";

const formCardValidator = new FormValidator(addCardForm, formProperties);
formCardValidator.enableValidation();

const formProfileValidator = new FormValidator(profileForm, formProperties);
formProfileValidator.enableValidation();

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

function cardCreation(name, link) {
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
}

for (let i = 0; i < initialCards.length; i++) {
  const card = cardCreation(initialCards[i].name, initialCards[i].link);
  sectionElements.append(card);
}

addCardForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = titleInput.value;
  const url = urlInput.value;
  const card = cardCreation(name, url);
  sectionElements.prepend(card);
  addCardForm.classList.remove("popup_open");
});

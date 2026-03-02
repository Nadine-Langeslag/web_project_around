import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Сard.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
/* const popupEditProfile = new PopupWithForm(".popup__profile", (formData) => {
  userInfo.setUserInfo(formData.name, formData.about);
  popupEditProfile.close();
});
popupEditProfile._setEventListeners(); */

const popupEditProfile = new PopupWithForm(".popup__profile", (formData) => {
  popupEditProfile.renderLoading(true);
  api
    .updateUserInfo(formData.name, formData.about) // Envía al servidor
    .then((userData) => {
      userInfo.setUserInfo(userData.name, userData.about); // Actualiza la página
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });
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
    const profileImage = document.querySelector(".profile__picture");
    profileImage.src = userData.avatar;
  })
  .catch((err) => {
    console.log(err);
  });
//-------- Profile Picture Update -----------

const popupUpdateProfilePicture = new PopupWithForm(
  ".popup__profile-picture",
  (formData) => {
    popupUpdateProfilePicture.renderLoading(true);
    console.log("Datos del formulario:", formData);
    api
      .updateProfilePicture(formData.avatar)
      .then((userData) => {
        console.log("Respuesta del servidor:", userData);
        const profileImage = document.querySelector(".profile__picture");
        console.log("Elemento encontrado:", profileImage);
        profileImage.src = userData.avatar;
        popupUpdateProfilePicture.close();
      })
      .catch((err) => {
        console.log("Error al actualizar foto de perfil:", err);
      })
      .finally(() => {
        popupUpdateProfilePicture.renderLoading(false);
      });
  },
);
popupUpdateProfilePicture._setEventListeners();

const profilePictureEditButton = document.querySelector(
  ".profile-picture__edit-button",
);
profilePictureEditButton.addEventListener("click", () => {
  popupUpdateProfilePicture.open();
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
      return createCard(cardData);
    },
  },
  ".elements",
);

/* add card info + save + add card*/

const PopupAddCard = new PopupWithForm(".popup__card", (formData) => {
  //Mapeo para que los nombres coincidan
  const cardData = {
    name: formData.title,
    link: formData.url,
  };
  PopupAddCard.renderLoading(true, "Creando...");
  // Handle adding new card with api
  api
    .addCard(cardData.name, cardData.link) // ← Necesitas este método en tu Api
    .then((newCardFromServer) => {
      // Usar los datos del servidor (que incluyen _id)
      const newCard = createCard(newCardFromServer);
      sectionElements.addItem(newCardFromServer);
      PopupAddCard.close();
    })
    .catch((err) => {})

    .finally(() => {
      PopupAddCard.renderLoading(false);
    });
});

const createCard = (data) => {
  const card = new Card(
    data.link,
    data.name,
    ".elements__template",
    () => {
      // Callback para abrir imagen
      const popupImage = new PopupWithImage(".popup_image");
      popupImage.open(data.name, data.link);
    },
    () => {
      // Callback para eliminar tarjeta
      const deleteCardPopup = new PopupWithConfirmation(
        ".popup_confirmation",
        () => {
          // Primero eliminar del servidor
          api
            .deleteCard(data._id)
            .then(() => {
              // Solo si el servidor responde exitosamente, eliminar del DOM
              card.deleteCard();
              deleteCardPopup.close();
            })
            .catch((err) => {
              console.log("Error al eliminar:", err);
            });
        },
      );

      deleteCardPopup._setEventListeners();
      deleteCardPopup.open();
    },
    // Callback para manejar like/unlike
    () => {
      if (data.isLiked) {
        // Si ya tiene like, quitarlo
        api
          .removeLike(data._id)
          .then(() => {
            data.isLiked = false; // Actualizar el estado local
            card.handleLike();
          })
          .catch((err) => {
            console.log("Error al quitar like:", err);
          });
      } else {
        // Si no tiene like, agregarlo
        api
          .addLike(data._id)
          .then(() => {
            data.isLiked = true; // Actualizar el estado local
            card.handleLike();
          })
          .catch((err) => {
            console.log("Error al agregar like:", err);
          });
      }
    },
    data._id,
  );

  const cardElement = card._getTemplate();
  console.log(cardElement);
  card._setEventListeners();
  return cardElement;
};

/* Add card button */

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  PopupAddCard.open();
});

/* Card info with api */
api
  .getInitialCards()
  .then((cardsData) => {
    /*  console.log(cardsData); */
    sectionElements.renderItems(cardsData);
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
  formProperties,
);
formProfileValidator.enableValidation();

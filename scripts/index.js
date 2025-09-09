/* profile elements */
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__ocupation");

/* Profile form */
const profileForm = document.querySelector(".popup__profile");
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");
const saveButton = document.querySelector(".popup__save-button")
const popupInput = document.querySelector(".popup__input")

/* Buttons */
const profileEditButton = document.querySelector(".profile__edit-button")
const popupCloseButtons = Array.from(document.querySelectorAll(".popup__close-button"))

/* Card form */
const addCardForm = document.querySelector(".popup__card")
const titleInput = document.querySelector(".popup__input_title");
const urlInput = document.querySelector(".popup__input_url");
const cardButton = document.querySelector(".profile__add-button")

/* Card elements */
const sectionElements = document.querySelector(".elements")
const cardTemplate = document.querySelector(".elements__template").content.querySelector(".elements__card")
const cardImage = document.querySelector(".elements__image")
const cardDeleteButton = document.querySelector(".elements__delete-button")
const cardTitle = document.querySelector(".elements__title")
const cardLikeButton = document.querySelector(".elements__like-button")

/* Cards image popup */

const imagePopup = document.querySelector(".popup_image")
const imagePopupImg = document.querySelector('.image-popup__image');
const imagePopupTitle = document.querySelector(".image-popup__title")

const popups = Array.from(document.querySelectorAll('.popup'))


/* Initial Cards info */
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

/* Eddit Profile popop */

function editProfile (event){
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
}

profileForm.addEventListener("submit", editProfile)

profileEditButton.addEventListener("click",function(){
    profileForm.classList.add("popup_open")
})
popupCloseButtons.forEach(function(popupCloseButton){
  popupCloseButton.addEventListener("click",function(){
    document.querySelector('.popup_open').classList.remove("popup_open");
})
})


saveButton.addEventListener("click",function(){
    profileForm.classList.remove("popup_open")
})



cardButton.addEventListener("click",function(){
    addCardForm.classList.add("popup_open")
   /*  document.addEventListener('keydown', escapeClose); */
})
/* Close popup with esc & click outside */

 function clickOutPopupEvent(event){
    if(event.target.classList.contains("popup_open")){
        event.target.classList.remove("popup_open");
    }
}

function escapeClose(event){
    if(event.key === "Escape"){
        const openPopup = document.querySelector("popup_open");
        openPopup.classList.remove("popup_open");

        document.removeEventListener('keydown', escapeClose);
    }    
}

popups.forEach(function(popup){
  popup.addEventListener( "click", clickOutPopupEvent); 
  })



/* Card Template */

function cardCreation(name, link){
const card = cardTemplate.cloneNode(true);
  card.querySelector(".elements__image").src = link;
  card.querySelector(".elements__image").alt = name;
  card.querySelector(".elements__title").textContent = name;

  card.querySelector(".elements__delete-button").addEventListener("click", function(){
    card.remove();
  })

  card.querySelector(".elements__like-button").addEventListener("click", function(){
    card.querySelector(".elements__like-button").classList.toggle("elements__like-button_active")
  })

  card.querySelector('.elements__image').addEventListener('click', function(){
    imagePopup.classList.add('popup_open');
    imagePopupImg.src = link;
    imagePopupImg.alt = name;
    imagePopupTitle.textContent = name;
    })
  return card;

}

for(let i=0;i<initialCards.length;i++){
  const card = cardCreation (initialCards[i].name, initialCards[i].link)
  sectionElements.append(card);
}

addCardForm.addEventListener("submit",function(event){
    event.preventDefault();
    const name = titleInput.value;
    const url = urlInput.value;
    const card = cardCreation (name, url)
    sectionElements.prepend(card);
     addCardForm.classList.remove("popup_open")
})


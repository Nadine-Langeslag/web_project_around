let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__ocupation");
let profileForm = document.querySelector(".form");
let nameInput = document.querySelector(".form__input_name");
let aboutInput = document.querySelector(".form__input_about");
let saveButton = document.querySelector(".form__save-button")
let formInput = document.querySelector(".form__input")

let profileEditButton = document.querySelector(".profile__edit-button")
let formCloseButton = document.querySelector(".form__close-button")



function editProfile (event){
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
}

profileForm.addEventListener("submit", editProfile)

profileEditButton.addEventListener("click",function(){
    profileForm.classList.add("form_open")
})

formCloseButton.addEventListener("click",function(){
    profileForm.classList.remove("form_open")
})

saveButton.addEventListener("input", function(){
    if (formInput.value() !== " "){
        saveButton.style.background = "black";
        saveButton.style.color = "white";
    }else{
    button.style.background = "white";
    button.style.color = "#C4C4C4";

    }
})

saveButton.addEventListener("click",function(){
    profileForm.classList.remove("form_open")
})

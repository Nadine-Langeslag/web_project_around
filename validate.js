function enableValidation(formProperties) {
  const forms = Array.from(
    document.querySelectorAll(formProperties.formSelector)
  );

  forms.forEach((form) => {
    const formInputs = Array.from(
      form.querySelectorAll(formProperties.inputSelector)
    );
    const formSubmitButton = form.querySelector(
      formProperties.submitButtonSelector
    );

    const allInputValids = formInputs.every((element) => {
      return element.validity.valid;
    });
    if (allInputValids) {
      formSubmitButton.disabled = false;
      formSubmitButton.classList.remove(formProperties.inactiveButtonClass);
    } else {
      formSubmitButton.disabled = true;
      formSubmitButton.classList.add(formProperties.inactiveButtonClass);
    }

    formInputs.forEach((formInput) => {
      formInput.addEventListener("input", () => {
        const errorMessage = form.querySelector(`.error__${formInput.name}`);
        if (formInput.validity.valid) {
          errorMessage.textContent = "";
          formInput.classList.remove(formProperties.inputErrorClass);
        } else {
          errorMessage.textContent = formInput.validationMessage;
          formInput.classList.add(formProperties.inputErrorClass);
        }

        const allInputValids = formInputs.every((element) => {
          return element.validity.valid;
        });
        if (allInputValids) {
          formSubmitButton.disabled = false;
          formSubmitButton.classList.remove(formProperties.inactiveButtonClass);
        } else {
          formSubmitButton.disabled = true;
          formSubmitButton.classList.add(formProperties.inactiveButtonClass);
        }
      });
    });
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup_error",
  errorClass: "error_visible",
});

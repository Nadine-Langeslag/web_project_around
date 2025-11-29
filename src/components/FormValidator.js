export default class FormValidator {
  constructor(formElement, formProperties) {
    this._formElement = formElement;
    this._formProperties = formProperties;
  }

  _setEventListener() {
    this._formInputs.forEach((formInput) => {
      formInput.addEventListener("input", () => {
        const errorMessage = this._formElement.querySelector(
          `.error__${formInput.name}`
        );
        if (formInput.validity.valid) {
          this._hideErrorMessage(formInput, errorMessage);
        } else {
          this._showErrorMessage(formInput, errorMessage);
        }
        this._toggleSubmitButton();
      });
    });
  }

  _hideErrorMessage(formInput, errorMessage) {
    errorMessage.textContent = "";
    formInput.classList.remove(this._formProperties.inputErrorClass);
  }

  _showErrorMessage(formInput, errorMessage) {
    errorMessage.textContent = formInput.validationMessage;
    formInput.classList.add(this._formProperties.inputErrorClass);
  }

  _isFormValid() {
    const allInputValids = this._formInputs.every((element) => {
      return element.validity.valid;
    });
    return allInputValids;
  }

  _toggleSubmitButton() {
    if (this._isFormValid()) {
      this._formSubmitButton.disabled = false;
      this._formSubmitButton.classList.remove(
        this._formProperties.inactiveButtonClass
      );
    } else {
      this._formSubmitButton.disabled = true;
      this._formSubmitButton.classList.add(
        this._formProperties.inactiveButtonClass
      );
    }
  }

  enableValidation() {
    this._formInputs = Array.from(
      this._formElement.querySelectorAll(this._formProperties.inputSelector)
    );
    this._formSubmitButton = this._formElement.querySelector(
      this._formProperties.submitButtonSelector
    );
    this._setEventListener();
  }
}

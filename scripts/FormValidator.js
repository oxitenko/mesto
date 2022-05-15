export class FormValidator {
  constructor(config, elementForm, inputs) {
    this._config = config;
    this._elementForm = elementForm;
    this._inputs = inputs;
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._inputValidation(inputEl);
        this._toggleButtonState();
      });
    });
  }

  _inputValidation(inputEl) {
    if (!inputEl.validity.valid) {
      this._showError(inputEl);
    } else {
      this._hideError(inputEl);
    }
  }

  _showError(inputEl) {
    const errorNode = this._elementForm.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(this._config.inputErrorClass);
    errorNode.classList.add(this._config.errorClass);
    errorNode.textContent = inputEl.validationMessage;
  }

  _hideError(inputEl) {
    const errorNode = this._elementForm.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(this._config.inputErrorClass);
    errorNode.classList.remove(this._config.errorClass);
    errorNode.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputs.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  _toggleButtonState() {
    const button = Array.from(
      this._elementForm.querySelectorAll(this._config.submitButtonSelector)
    );
    button.forEach((btnEl) => {
      if (this._hasInvalidInput(this._inputs)) {
        btnEl.classList.add(this._config.inactiveButtonClass);
        btnEl.setAttribute("disabled", "");
      } else {
        btnEl.classList.remove(this._config.inactiveButtonClass);
        btnEl.removeAttribute("disabled", "");
      }
    });
  }

  _cleanError() {
    this._inputs.forEach((inputEl) => {
      this._hideError(inputEl);
    });
  }

  resetValidation() {
    this._cleanError();
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}

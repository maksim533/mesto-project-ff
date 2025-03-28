const isValid = (
  formSelector,
  inputSelector,
  inputClassSelector,
  inputTextSelector
) => {
  if (inputSelector.validity.patternMismatch) {
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
    inputSelector.setCustomValidity("");
  }

  if (!inputSelector.validity.valid) {
    showErrorMessage(
      formSelector,
      inputSelector,
      inputSelector.validationMessage,
      inputClassSelector,
      inputTextSelector
    );
  } else {
    hideErrorMessage(
      formSelector,
      inputSelector,
      inputClassSelector,
      inputTextSelector
    );
  }
};

const showErrorMessage = (
  formSelector,
  inputSelector,
  errorMessage,
  inputClassSelector,
  inputTextSelector
) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  errorElement.classList.add(inputTextSelector);
  errorElement.textContent = errorMessage;
  inputSelector.classList.add(inputClassSelector);
};

const hideErrorMessage = (
  formSelector,
  inputSelector,
  inputClassSelector,
  inputTextSelector
) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  errorElement.classList.remove(inputTextSelector);
  errorElement.textContent = "";
  inputSelector.classList.remove(inputClassSelector);
};

const setEventListener = (
  formSelector,
  inputSelector,
  inputErrorSelector,
  inputErrorTextSelector,
  inactiveButtonClass,
  submitButtonSelector
) => {
  const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
  const buttonElement = formSelector.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(
        formSelector,
        inputElement,
        inputErrorSelector,
        inputErrorTextSelector
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, buttonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(buttonClass);
  } else {
    buttonElement.classList.remove(buttonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListener(
      formElement,
      config.inputSelector,
      config.inputErrorClass,
      config.errorClass,
      config.inactiveButtonClass,
      config.submitButtonSelector
    );
  });
};

const clearValidation = (formSelection, config) => {
  const inputList = Array.from(
    formSelection.querySelectorAll(config.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideErrorMessage(
      formSelection,
      inputElement,
      config.inputErrorClass,
      config.errorClass
    );
  });
};

export { enableValidation, clearValidation };

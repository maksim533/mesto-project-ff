import {
  popupInputTypeName,
  popupInputTypeDescription,
  profileTitle,
  profileDescription,
} from "./index.js";

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;
}

export { handleFormSubmit };

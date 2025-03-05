function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeInEsc);
  document.addEventListener("mousedown", closeInOverlay);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeInEsc);
  document.removeEventListener("mousedown", closeInOverlay);
}

function closeInEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function closeInOverlay(evt) {
  if (evt.target === evt.target.closest(".popup_is-opened")) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export { openModal, closeModal };

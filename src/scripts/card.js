import { cardList, newPlace } from "./index.js";
import { openModal } from "./modal";

function createCard(cardData) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardClone = cardTemplate.querySelector(".card").cloneNode(true);
  cardClone.querySelector(".card__image").src = cardData.link;
  cardClone.querySelector(".card__image").alt = cardData.name;
  cardClone.querySelector(".card__title").textContent = cardData.name;
  const buttonDeleteCard = cardClone.querySelector(".card__delete-button");
  buttonDeleteCard.addEventListener("click", deleteCard);
  cardList.addEventListener("click", cardLike);
  cardClone.addEventListener("click", clickToImg);
  return cardClone;
}

function addCard(evt) {
  evt.preventDefault();
  const create = [
    {
      link: document.querySelector(".popup__input_type_url").value,
      name: document.querySelector(".popup__input_type_card-name").value,
    },
  ];
  create.forEach(function (item) {
    const card = createCard(item, deleteCard, cardLike, clickToImg);
    cardList.prepend(card);
  });
  newPlace.reset();
}

function deleteCard(evt) {
  const cardDelete = evt.target.closest(".card");
  cardDelete.remove();
}

function cardLike(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

function clickToImg(evt) {
  if (evt.target.classList.contains("card__image")) {
    const popupImage = document.querySelector(".popup__image");
    const popupCaption = document.querySelector(".popup__caption");
    popupImage.src = evt.target.src;
    popupCaption.textContent = evt.target.alt;
    openModal(document.querySelector(".popup_type_image"));
  }
}

export { createCard, deleteCard, addCard, cardLike, clickToImg };

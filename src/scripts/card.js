const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");


function createCard(item, deleteCard, toggleLike, clickToImg) {
  const cardClone = cardTemplate.querySelector(".card").cloneNode(true);
  cardClone.querySelector(".card__image").src = item.link;
  cardClone.querySelector(".card__image").alt = item.name;
  cardClone.querySelector(".card__title").textContent = item.name;
  const buttonDeleteCard = cardClone.querySelector(".card__delete-button");
  buttonDeleteCard.addEventListener("click", deleteCard);
  cardList.addEventListener("click", toggleLike);
  cardClone.addEventListener("click", clickToImg);
  return cardClone;
}

function deleteCard(evt) {
  const cardDelete = evt.target.closest(".card");
  cardDelete.remove();
}

function toggleLike(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export { createCard, deleteCard, toggleLike, cardList, cardTemplate };

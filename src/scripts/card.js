import {putLikeCard, deleteLikeCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

function createCard(
  item,
  userId,
  popapShowDeleteCard,
  toggleLike,
  clickToImg
) {
  const cardClone = cardTemplate.querySelector(".card").cloneNode(true);
  cardClone.querySelector(".card__image").src = item.link;
  cardClone.querySelector(".card__image").alt = item.name;
  cardClone.querySelector(".card__title").textContent = item.name;
  cardClone.querySelector(".card__like-amount").textContent = item.likes.length;
  const buttonDeleteCard = cardClone.querySelector(".card__delete-button");
  const buttonLikeCard = cardClone.querySelector(".card__like-button");
  item.likes.forEach((like) => {
    if (like._id === userId) {
      buttonLikeCard.classList.add("card__like-button_is-active");
    }
  });

  if (item.owner._id === userId) {
    buttonDeleteCard.addEventListener("click", (evt) =>
      popapShowDeleteCard(evt, item._id)
    );
  } else {
    buttonDeleteCard.remove();
  }
  buttonLikeCard.addEventListener("click", (evt) => toggleLike(evt, item._id));
  cardClone.addEventListener("click", clickToImg);
  return cardClone;
}

function toggleLike(evt, userId) {
  const likeAmount = evt.target.parentNode.querySelector(".card__like-amount");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(userId)
      .then((res) => {
        evt.target.classList.remove("card__like-button_is-active");
        likeAmount.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    putLikeCard(userId)
      .then((res) => {
        evt.target.classList.add("card__like-button_is-active");
        likeAmount.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  }
}

export { createCard, toggleLike, cardList, cardTemplate };

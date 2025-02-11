// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list');

function createCard (cardData){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  cardClone.querySelector('.card__image').src = cardData.link;
  cardClone.querySelector('.card__image').alt = cardData.name;
  cardClone.querySelector('.card__title').textContent = cardData.name;
  const buttonDeleteCard = cardClone.querySelector('.card__delete-button');
  buttonDeleteCard.addEventListener('click', deleteCard);
  return cardClone;
}

function deleteCard (evt) {
  const cardDelete = evt.target.closest(".card");
  cardDelete.remove();
}

initialCards.forEach(function (item) {
  cardList.append(createCard(item));
})

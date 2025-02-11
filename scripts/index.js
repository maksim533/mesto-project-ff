// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list');

function card (arr){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  cardClone.querySelector('.card__image').src = arr.link;
  cardClone.querySelector('.card__image').alt = arr.name;
  cardClone.querySelector('.card__title').textContent = arr.name;
  const deleteCards = cardClone.querySelector('.card__delete-button');
  deleteCards.addEventListener('click', deleteCard);
  return cardClone;
}

function deleteCard () {
  const cardDelete = document.querySelector('.card');
  cardDelete.remove();
}

initialCards.map(card).forEach(function (item) {
  cardList.append(item);
})

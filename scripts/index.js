// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');


initialCards.forEach(function (item) {
    const cardTemplateClone = cardTemplate.querySelector('.card').cloneNode(true);
    cardTemplateClone.querySelector('.card__image').src = item.link;
    cardTemplateClone.querySelector('.card__title').textContent = item.name;
    cardList.append(cardTemplateClone);
  }
)

const buttonsDelete = document.querySelectorAll('.card__delete-button');
buttonsDelete.forEach(function (element){
  element.addEventListener('click', function () {
    const card = document.querySelector('.card');
    card.remove();
  })
})

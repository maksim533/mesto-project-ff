import "../pages/index.css";
import { initialCards } from "./cards";
import { openModal, closeModal } from "./modal";
import { handleFormSubmit } from "./formsInProfile";
import { createCard, cardLike, addCard, clickToImg, deleteCard } from "./card";

// @todo: Темплейт карточки

// @todo: DOM узлы

// Список карточек :

const cardList = document.querySelector(".places__list");

// попап редактирования профиля

const popupTypeEdit = document.querySelector(".popup_type_edit");

// попап создания новой карточки

const popupTypeNewCard = document.querySelector(".popup_type_new-card");

// кнопка редактирования профиля

const profileEditButton = document.querySelector(".profile__edit-button");

// колекция попапов

const popup = document.querySelectorAll(".popup");

// кнопка создания карточки

const profileAddButton = document.querySelector(".profile__add-button");

// кнопки закрытия попапа

const popupClose = document.querySelectorAll(".popup__close");

// форма редактирования профиля

const editProfile = document.forms["edit-profile"];

// инпут Имя

const popupInputTypeName = editProfile.querySelector(".popup__input_type_name");

// Инпут описания

const popupInputTypeDescription = editProfile.querySelector(
  ".popup__input_type_description"
);

// Имя на странице

const profileTitle = document.querySelector(".profile__title");

// Описание на странице

const profileDescription = document.querySelector(".profile__description");

// Кнопка 'сохранения'

const popupButtonProfile = editProfile.querySelector(".popup__button");

// Форма создания карточки

const newPlace = document.forms["new-place"];

// Кнопка 'сохранения'

const popupButtonCard = newPlace.querySelector(".popup__button");

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  cardList.append(createCard(item, deleteCard, cardLike, clickToImg));
});

profileEditButton.addEventListener("click", function () {
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});

popupClose.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    const popupOpen = evt.target.closest(".popup_is-opened");
    closeModal(popupOpen);
  });
});

editProfile.addEventListener("submit", handleFormSubmit);

popupButtonProfile.addEventListener("click", () => closeModal(popupTypeEdit));

newPlace.addEventListener("submit", addCard);

popupButtonCard.addEventListener("click", () => closeModal(popupTypeNewCard));

popup.forEach(function (item) {
  item.classList.add("popup_is-animated");
});

export {
  popupInputTypeName,
  popupInputTypeDescription,
  profileTitle,
  profileDescription,
  cardList,
  newPlace,
};

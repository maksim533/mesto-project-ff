import "../pages/index.css";
import { initialCards } from "./cards";
import { openModal, closeModal } from "./modal";
import { createCard, toggleLike, deleteCard, cardList, cardTemplate } from "./card";

// @todo: Темплейт карточки

// @todo: DOM узлы

// попап редактирования профиля

const popupTypeEdit = document.querySelector(".popup_type_edit");

// попап создания новой карточки

const popupTypeNewCard = document.querySelector(".popup_type_new-card");

// кнопка редактирования профиля

const profileEditButton = document.querySelector(".profile__edit-button");

// колекция попапов

const popups = document.querySelectorAll(".popup");

// кнопка создания карточки

const profileAddButton = document.querySelector(".profile__add-button");

// кнопки закрытия попапа

const buttonsClosePopup = document.querySelectorAll(".popup__close");

// форма редактирования профиля

const formEditProfile = document.forms["edit-profile"];

// инпут Имя

const popupInputTypeName = formEditProfile.querySelector(
  ".popup__input_type_name"
);

// фото попапа

const popupImage = document.querySelector(".popup__image");

// описание попапа

const popupCaption = document.querySelector(".popup__caption");

// Инпут описания

const popupInputTypeDescription = formEditProfile.querySelector(
  ".popup__input_type_description"
);

// Имя на странице

const profileTitle = document.querySelector(".profile__title");

// Описание на странице

const profileDescription = document.querySelector(".profile__description");

// Форма создания карточки

const formAddCard = document.forms["new-place"];

// @todo: Функция создания карточки

function addCard(evt) {
  evt.preventDefault();
  const create = [
    {
      link: document.querySelector(".popup__input_type_url").value,
      name: document.querySelector(".popup__input_type_card-name").value,
    },
  ];
  create.forEach(function (item) {
    const card = createCard(item, deleteCard, toggleLike, clickToImg);
    cardList.prepend(card);
  });
  formAddCard.reset();
  closeModal(popupTypeNewCard);
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  cardList.append(createCard(item, deleteCard, toggleLike, clickToImg));
});

profileEditButton.addEventListener("click", function () {
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});

buttonsClosePopup.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    const popupOpen = evt.target.closest(".popup_is-opened");
    closeModal(popupOpen);
  });
});

formEditProfile.addEventListener("submit", submitEditProfileForm);

formAddCard.addEventListener("submit", addCard);

popups.forEach(function (item) {
  item.classList.add("popup_is-animated");
});

function clickToImg(evt) {
  if (evt.target.classList.contains("card__image")) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(document.querySelector(".popup_type_image"));
  }
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;
  closeModal(popupTypeEdit);
}

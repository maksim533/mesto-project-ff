import "../pages/index.css";
import { initialCards } from "./cards";
import { openModal, closeModal } from "./modal";
import {
  createCard,
  toggleLike,
  cardList,
  cardTemplate,
} from "./card";
import { enableValidation, clearValidation } from "./validation";
import {
  getIdUsersInfo,
  getCards,
  patchUserInfo,
  postAddCard,
  patchEditUserAvatar,
  deleteCards
} from "./api";

// @todo: Темплейт карточки


// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// @todo: Функция создания карточки

// @todo: DOM узлы

// настройки валидации

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// аватарка

const profileImage = document.querySelector(".profile__image");

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


// форма изменения аватара

const formEditAvatar = document.forms["edit-avatar"];

// попап редактирования аватара

const popupEditAvatar = document.querySelector(".popup_edit-avatar");

// кнопка редактирования аватара

const profileEditAvatarButton = document.querySelector(
  ".profile__edit-avatar-button"
);

// попап удаления

const popupTypeDelete = document.querySelector('.popup_type_delete');

// кнопка подтверждения удаления попапа 

const popupButton = popupTypeDelete.querySelector('.popup__button');

let popupCardId;
 
let cardDelete;

let userId;

function popapShowDeleteCard (evt, cardId) {
  evt.preventDefault();
  popupCardId = cardId;
  cardDelete = evt.target.closest(".card");
  if(evt.target.classList.contains('card__delete-button')){
    openModal(popupTypeDelete);
  }
}

function popupCloseDeleteCard (evt, cardId, cardDelete) {
  evt.preventDefault();
  deleteCards(cardId)
  .catch((err) => console.log(err));
  cardDelete.remove();
  closeModal(popupTypeDelete);
}

popupButton.addEventListener('click', (evt) => popupCloseDeleteCard(evt, popupCardId, cardDelete))

profileEditAvatarButton.addEventListener("click", function () {
  clearValidation(formEditAvatar, validationConfig);
  openModal(popupEditAvatar);
});


const isLoading = (boolean, selector) => {
  if (boolean) {
    selector.textContent = "Сохранение...";
  } else {
    selector.textContent = "Сохранить";
  }
};

formEditAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const formEditAvatarLink = formEditAvatar.querySelector(
    ".popup__input_type_url"
  );
  isLoading(true, formEditAvatar.querySelector(".popup__button"));
  patchEditUserAvatar(formEditAvatarLink.value)
    .then((res) => {
      popupImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      isLoading(false, formEditAvatar.querySelector(".popup__button"));
    });
  formEditAvatar.reset();
  closeModal(popupEditAvatar);
});

function addCard(evt) {
  evt.preventDefault();
  const name = formAddCard.querySelector(".popup__input_type_card-name").value;
  const link = formAddCard.querySelector(".popup__input_type_url").value;
  isLoading(true, formAddCard.querySelector(".popup__button"));
  postAddCard(name, link)
    .then((result) => {
      const card = createCard(
        result,
        userId,
        popapShowDeleteCard,
        toggleLike,
        clickToImg
      );
      cardList.prepend(card);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      isLoading(false, formAddCard.querySelector(".popup__button"));
    });
  formAddCard.reset();
  closeModal(popupTypeNewCard);
}

profileEditButton.addEventListener("click", function () {
  clearValidation(formEditProfile, validationConfig);
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", function () {
  clearValidation(formAddCard, validationConfig);
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
  isLoading(true, formEditProfile.querySelector(".popup__button"));
  patchUserInfo(popupInputTypeName.value, popupInputTypeDescription.value)
    .then((userUpdate) => {
      profileTitle.textContent = userUpdate.name;
      profileDescription.textContent = userUpdate.about;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      isLoading(false, formEditProfile.querySelector(".popup__button"));
    });
  closeModal(popupTypeEdit);
}

Promise.all([getIdUsersInfo(), getCards()])
  .then(([user, cards]) => {
    userId = user._id;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
    cards.forEach((item) => {
      const newCard = createCard(
        item,
        userId,
        popapShowDeleteCard,
        toggleLike,
        clickToImg
      );
      cardList.append(newCard);
    });
  })
  .catch((err) => console.log(err));

enableValidation(validationConfig);

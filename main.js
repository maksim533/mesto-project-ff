(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),document.addEventListener("mousedown",r)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),document.removeEventListener("mousedown",r)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e){e.target===e.target.closest(".popup_is-opened")&&t(document.querySelector(".popup_is-opened"))}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-35",headers:{authorization:"2a45223c-9473-4ab1-b195-630132c1bf31","Content-Type":"application/json"}},c=function(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))},u=document.querySelector("#card-template").content,a=document.querySelector(".places__list");function i(e,t,n,r,o){var c=u.querySelector(".card").cloneNode(!0);c.querySelector(".card__image").src=e.link,c.querySelector(".card__image").alt=e.name,c.querySelector(".card__title").textContent=e.name,c.querySelector(".card__like-amount").textContent=e.likes.length;var a=c.querySelector(".card__delete-button"),i=c.querySelector(".card__like-button");return e.likes.forEach((function(e){e._id===t&&i.classList.add("card__like-button_is-active")})),e.owner._id===t?a.addEventListener("click",(function(t){return n(t,e._id)})):a.remove(),i.addEventListener("click",(function(t){return r(t,e._id)})),c.addEventListener("click",o),c}function l(e,t){var n,r=e.target.parentNode.querySelector(".card__like-amount");e.target.classList.contains("card__like-button_is-active")?(n=t,fetch("".concat(o.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:o.headers}).then((function(e){return c(e)}))).then((function(t){e.target.classList.remove("card__like-button_is-active"),r.textContent=t.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then((function(e){return c(e)}))}(t).then((function(t){e.target.classList.add("card__like-button_is-active"),r.textContent=t.likes.length})).catch((function(e){return console.log(e)}))}var s=function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));o.classList.remove(r),o.textContent="",t.classList.remove(n)},d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?f(t,n):p(t,n)},p=function(e,t){e.disabled=!0,e.classList.add(t)},f=function(e,t){e.disabled=!1,e.classList.remove(t)},_=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(r,t.inactiveButtonClass),n.forEach((function(n){s(e,n,t.inputErrorClass,t.errorClass)}))};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var y,v,h,S={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},b=document.querySelector(".profile__image"),q=document.querySelector(".popup_type_edit"),g=document.querySelector(".popup_type_new-card"),E=document.querySelector(".profile__edit-button"),L=document.querySelectorAll(".popup"),k=document.querySelector(".profile__add-button"),C=document.querySelectorAll(".popup__close"),A=document.forms["edit-profile"],x=A.querySelector(".popup__input_type_name"),w=document.querySelector(".popup__image"),U=document.querySelector(".popup__caption"),T=A.querySelector(".popup__input_type_description"),j=document.querySelector(".profile__title"),D=document.querySelector(".profile__description"),O=document.forms["new-place"],B=document.forms["edit-avatar"],P=document.querySelector(".popup_edit-avatar"),I=document.querySelector(".profile__edit-avatar-button"),N=document.querySelector(".popup_type_delete");function M(t,n){t.preventDefault(),y=n,v=t.target.closest(".card"),t.target.classList.contains("card__delete-button")&&e(N)}N.querySelector(".popup__button").addEventListener("click",(function(e){return function(e,n,r){e.preventDefault(),function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers}).then((function(e){return c(e)}))}(n).then((function(){r.remove(),t(N)})).catch((function(e){return console.log(e)}))}(e,y,v)})),I.addEventListener("click",(function(){_(B,S),B.reset(),e(P)}));var J=function(e,t){t.textContent=e?"Сохранение...":"Сохранить"};function G(t){t.target.classList.contains("card__image")&&(w.src=t.target.src,w.alt=t.target.alt,U.textContent=t.target.alt,e(document.querySelector(".popup_type_image")))}B.addEventListener("submit",(function(e){e.preventDefault();var n,r=B.querySelector(".popup__input_type_url");J(!0,B.querySelector(".popup__button")),(n=r.value,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:n})}).then((function(e){return c(e)}))).then((function(e){b.style.backgroundImage="url(".concat(e.avatar,")"),B.reset(),t(P)})).catch((function(e){return console.log(e)})).finally((function(){J(!1,B.querySelector(".popup__button"))}))})),E.addEventListener("click",(function(){_(A,S),x.value=j.textContent,T.value=D.textContent,e(q)})),k.addEventListener("click",(function(){_(O,S),O.reset(),e(g)})),C.forEach((function(e){e.addEventListener("click",(function(e){t(e.target.closest(".popup_is-opened"))}))})),A.addEventListener("submit",(function(e){var n,r;e.preventDefault(),J(!0,A.querySelector(".popup__button")),(n=x.value,r=T.value,fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return c(e)}))).then((function(e){j.textContent=e.name,D.textContent=e.about,t(q)})).catch((function(e){return console.log(e)})).finally((function(){J(!1,A.querySelector(".popup__button"))}))})),O.addEventListener("submit",(function(e){e.preventDefault();var n=O.querySelector(".popup__input_type_card-name").value,r=O.querySelector(".popup__input_type_url").value;J(!0,O.querySelector(".popup__button")),function(e,t){return fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return c(e)}))}(n,r).then((function(e){var n=i(e,h,M,l,G);a.prepend(n),O.reset(),t(g)})).catch((function(e){return console.log(e)})).finally((function(){J(!1,O.querySelector(".popup__button"))}))})),L.forEach((function(e){e.classList.add("popup_is-animated")})),Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{method:"GET",headers:o.headers}).then((function(e){return c(e)})),fetch("".concat(o.baseUrl,"/cards"),{method:"GET",headers:o.headers}).then((function(e){return c(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];h=o._id,j.textContent=o.name,D.textContent=o.about,b.style.backgroundImage="url(".concat(o.avatar,")"),c.forEach((function(e){var t=i(e,h,M,l,G);a.append(t)}))})).catch((function(e){return console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var n,r,o,c,u,a,i,l;n=t,r=e.inputSelector,o=e.inputErrorClass,c=e.errorClass,u=e.inactiveButtonClass,a=e.submitButtonSelector,i=Array.from(n.querySelectorAll(r)),l=n.querySelector(a),d(i,l,u),i.forEach((function(e){e.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));c.classList.add(o),c.textContent=n,t.classList.add(r)}(e,t,t.validationMessage,n,r)}(n,e,o,c),d(i,l,u)}))}))}))}(S)})();
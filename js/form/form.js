import { postPhoto } from '../api.js';
import effectsPhoto from '../photo-editor/effects-photo.js';
import scalePhoto from '../photo-editor/scale-photo.js';
import './validation.js';

const upLoad = document.querySelector('#upload-file');
const upLoadOverlay = document.querySelector('.img-upload__overlay');
const upLoadChannelButton = upLoadOverlay.querySelector('#upload-cancel');
const effectsList = document.querySelector('.img-upload__form');
const successRequestFragment = document.querySelector('#success').content;
const successRequest = successRequestFragment.cloneNode(true);
const successModal = successRequest.querySelector('.success');
const badRequestFragment = document.querySelector('#error').content;
const badRequest = badRequestFragment.cloneNode(true);
const badRequestModal = badRequest.querySelector('.error');
const effectValue = document.querySelector('.effect-level__value');
const buttonUploadSubmit = document.querySelector('.img-upload__submit');

const onKeydown = (evt) => {
  if(
    evt.key === 'Escape'
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
  ){
    document.body.classList.remove('modal-open');
    upLoadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onKeydown);
    effectsList.reset();
  }
};

const onKeydownBadModal = (evt) => {
  if(evt.key === 'Escape'){
    successModal.remove();
    badRequestModal.remove();
    document.body.removeEventListener('keyDown', onKeydownBadModal);
    // При нажатии на esc на модалке с ошибкой, надо снова навесить обработчик событий. Но он срабатывает сразу же и закрывает форму с ФОТО
    document.addEventListener('keydown', onKeydown);
  }
};

const onClickCross = () => {
  upLoadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onKeydown);
  document.body.classList.remove('modal-open');
  effectsList.reset();
};

const onClickModal = (evt) => {
  if(
    evt.target.className === 'success__inner'
  || evt.target.className === 'success__title'
  || evt.target.className === 'error__title'
  || evt.target.className === 'error__inner'
  ){
    return '';
  }
  successModal.remove();
  badRequestModal.remove();
  document.body.removeEventListener('keyDown',onKeydownBadModal);
};

const onClickModalBad = () => {
  document.addEventListener('keydown', onKeydown);
};

const onSuccess = () => {
  document.body.append(successModal);
  buttonUploadSubmit.disabled = false;

  document.body.addEventListener('keydown', onKeydownBadModal);
  successModal.addEventListener('click', onClickModal);
  onClickCross();
};

const onError = () => {
  document.body.append(badRequestModal);
  buttonUploadSubmit.disabled = false;

  // Удаляю глобальный обработчик escape
  document.removeEventListener('keydown', onKeydown);

  document.body.addEventListener('keydown', onKeydownBadModal);
  badRequestModal.addEventListener('click', onClickModal);
  badRequestModal.addEventListener('click', onClickModalBad);
};

const loadingPhoto = () => {
  document.body.classList.add('modal-open');
  upLoadOverlay.classList.remove('hidden');
  upLoadChannelButton.addEventListener('click', onClickCross);
  document.addEventListener('keydown', onKeydown);

  scalePhoto();
  effectsPhoto();
  postPhoto(onSuccess, onError);
  effectValue.value = '100';
};

upLoad.addEventListener('change', loadingPhoto);

export {loadingPhoto, onSuccess, onError};

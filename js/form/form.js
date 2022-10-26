import { postPhoto } from '../api.js';
import effectsPhoto from '../photo-editor/effects-photo.js';
import scalePhoto from '../photo-editor/scale-photo.js';
import './validation.js';


const MAX_LENGTH_TEXT = 140;

const upLoad = document.querySelector('#upload-file');
const upLoadOverlay = document.querySelector('.img-upload__overlay');
const upLoadChannelButton = upLoadOverlay.querySelector('#upload-cancel');
const textDescription = upLoadOverlay.querySelector('.text__description');
const effectsList = document.querySelector('.img-upload__form');
const successRequestFragment = document.querySelector('#success').content;
const successRequest = successRequestFragment.cloneNode(true);
const successModal = successRequest.querySelector('.success');
const badRequestFragment = document.querySelector('#error').content;
const badRequest = badRequestFragment.cloneNode(true);
const badRequestModal = badRequest.querySelector('.error');
const effectValue = document.querySelector('.effect-level__value');

const onKeydown = (evt) => {
  if(
    evt.key === 'Escape'
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
  ){
    document.body.classList.remove('modal-open');
    upLoadOverlay.classList.add('hidden');
    window.removeEventListener('keydown', onKeydown);
    effectsList.reset();
  }
};

const onClickCross = () => {
  upLoadOverlay.classList.add('hidden');
  window.removeEventListener('keydown', onKeydown);
  document.body.classList.remove('modal-open');
  effectsList.reset();
};

const onClickEscape = (evt) => {
  if(evt.key === 'Escape'){
    successModal.remove();
    // badRequestModal.remove();
    document.body.removeEventListener('keyDown',onClickEscape);
  }
};

const onClickModal = (evt) => {
  if(evt.target.className === 'success__inner' || evt.target.className === 'success__title'){
    return '';
  }
  successModal.remove();
  badRequestModal.remove();
  document.body.removeEventListener('keyDown',onClickEscape);
};

const onClickModalBad = () => {
  // if(evt.target.className === 'success__inner' || evt.target.className === 'success__title'){
  //   return '';
  // }
  badRequestModal.remove();
  // document.body.removeEventListener('keyDown',onClickEscape);
};

const onSuccess = () => {
  document.body.append(successModal);

  document.body.addEventListener('keydown', onClickEscape);
  successModal.addEventListener('click', onClickModal);
  onClickCross();
};

const buttonUploadSubmit = document.querySelector('.img-upload__submit');

const onError = () => {
  document.body.append(badRequestModal);
  window.removeEventListener('keydown', onKeydown);
  badRequestModal.addEventListener('click', onClickModal);
  buttonUploadSubmit.disabled = false;
};


const loadingPhoto = () => {
  document.body.classList.add('modal-open');
  upLoadOverlay.classList.remove('hidden');
  upLoadChannelButton.addEventListener('click', onClickCross);
  window.addEventListener('keydown', onKeydown);
  textDescription.setAttribute('maxlength', MAX_LENGTH_TEXT);
  scalePhoto();
  effectsPhoto();
  postPhoto(onSuccess, onError);
  effectValue.value = '100';

  effectsList.reset();


};

upLoad.addEventListener('change', loadingPhoto);

export {loadingPhoto, onSuccess, onError};

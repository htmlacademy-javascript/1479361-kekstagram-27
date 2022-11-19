import { sendRequest } from '../api.js';
import { image, effects } from '../photo-editor/effects-photo.js';
import {scalePhoto} from '../photo-editor/scale-photo.js';
import { checkEscape } from '../utils.js';
import './validation.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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
const buttonUploadSubmit = document.querySelector('#upload-submit');
const photoPreview = document.querySelector('img');
const adForm = document.querySelector('.img-upload__form');
let formData;

const resetValidation = () => {
  const pristineError = document.querySelector('.pristine-error');
  if(pristineError){
    pristineError.textContent = '';
  }
  buttonUploadSubmit.disabled = false;
};


const onKeydown = (evt) => {
  if(
    checkEscape(evt)
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
  ){
    document.body.classList.remove('modal-open');
    upLoadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onKeydown);
    resetValidation();
    effectsList.reset();
    image.style.filter = effects.none();
  }
};

const onKeydownBadModal = (evt) => {
  if(evt.target.querySelector('.popup_alert').className === 'error popup_alert') {
    document.addEventListener('keydown', onKeydown);
  }
  if(checkEscape(evt)){
    evt.target.querySelector('.popup_alert').remove();
    document.removeEventListener('keydown', onKeydownBadModal);
  }
};

const onClickCross = () => {
  upLoadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onKeydown);
  document.body.classList.remove('modal-open');
  resetValidation();
  effectsList.reset();
  image.style.filter = effects.none();
};

const onClickModal = (evt) => {
  if(evt.target.tagName === 'H2' || evt.target.tagName === 'DIV'){
    return null;
  }
  evt.currentTarget.remove();
  document.removeEventListener('keydown',onKeydownBadModal);
};

const onSuccess = () => {
  document.body.append(successModal);
  buttonUploadSubmit.disabled = false;
  document.addEventListener('keydown', onKeydownBadModal);
  successModal.addEventListener('click', onClickModal);
  onClickCross();
};

const onError = () => {
  document.body.append(badRequestModal);
  buttonUploadSubmit.disabled = false;
  document.removeEventListener('keydown', onKeydown);
  document.addEventListener('keydown', onKeydownBadModal);
  badRequestModal.addEventListener('click', onClickModal);
};

const onPostPhotoSubmit = (evt) => {
  evt.preventDefault();
  formData = new FormData(evt.target);
  sendRequest(onSuccess, onError, 'POST', formData);
};

const onLoadPhotoChange = (evt) => {
  evt.preventDefault();
  document.body.classList.add('modal-open');
  upLoadOverlay.classList.remove('hidden');
  upLoadChannelButton.addEventListener('click', onClickCross);
  document.addEventListener('keydown', onKeydown);

  const file = upLoad.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(matches){
    photoPreview.src = URL.createObjectURL(file);
  }

  scalePhoto();
};

adForm.addEventListener('submit', onPostPhotoSubmit);

export {onLoadPhotoChange, onSuccess, onError};

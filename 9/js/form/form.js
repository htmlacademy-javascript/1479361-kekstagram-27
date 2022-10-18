import effectsPhoto from '../photo-editor/effects-photo.js';
import scalePhoto from '../photo-editor/scale-photo.js';
import validation from './validation.js';

const form = () => {
  const MAX_LENGTH_TEXT = 140;

  const upLoad = document.querySelector('#upload-file');
  const upLoadOverlay = document.querySelector('.img-upload__overlay');
  const upLoadChannelButton = upLoadOverlay.querySelector('#upload-cancel');
  const hashTag = upLoadOverlay.querySelector('.text__hashtags');
  const textDescription = upLoadOverlay.querySelector('.text__description');
  const effectsList = document.querySelector('.img-upload__form');

  const onKeydown = (evt) => {
    if(
      evt.key === 'Escape'
      && !evt.target.classList.contains('text__hashtags')
      && !evt.target.classList.contains('text__description')
    ){
      document.body.classList.remove('modal-open');
      upLoadOverlay.classList.add('hidden');
      window.removeEventListener('keydown', onKeydown);
      upLoad.value = '';
      textDescription.value = '';
      hashTag.value = '';
    }
  };


  const onClickCross = () => {

    upLoadOverlay.classList.add('hidden');
    window.removeEventListener('keydown', onKeydown);
    document.body.classList.remove('modal-open');
    upLoad.value = '';
    textDescription.value = '';
    hashTag.value = '';
  };

  const loadingPhoto = () => {
    document.body.classList.add('modal-open');
    upLoadOverlay.classList.remove('hidden');
    upLoadChannelButton.addEventListener('click', onClickCross);
    window.addEventListener('keydown', onKeydown);
    hashTag.setAttribute('required', true);
    textDescription.setAttribute('maxlength', MAX_LENGTH_TEXT);
    scalePhoto();
    effectsPhoto();
    validation();
    effectsList.reset();
  };

  upLoad.addEventListener('change', loadingPhoto);

};

export default form;

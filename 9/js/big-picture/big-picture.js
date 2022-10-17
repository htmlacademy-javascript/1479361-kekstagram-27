import { createSocialComments } from './create-social-comments.js';

const bigPicturePhoto = (imageData) => {
  const bigPicture = document.querySelector('.big-picture');
  const imgPicture = bigPicture.querySelector('img');
  const likes = bigPicture.querySelector('.likes-count');
  const cancelPicture = bigPicture.querySelector('#picture-cancel');
  const socialCaption = bigPicture.querySelector('.social__caption');

  const onKeydown = (evt) => {
    if(evt.key === 'Escape'){
      document.body.classList.remove('modal-open');
      bigPicture.classList.add('hidden');
      window.removeEventListener('keydown', onKeydown);
    }
  };

  const onClickCross = () => {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    window.removeEventListener('keydown', onKeydown);
  };

  document.body.classList.add('modal-open');

  cancelPicture.addEventListener('click', onClickCross);
  window.addEventListener('keydown', onKeydown);

  bigPicture.classList.remove('hidden');

  imgPicture.src = imageData.url;
  likes.textContent = imageData.likes;
  socialCaption.textContent = imageData.description;

  createSocialComments(imageData.comments);
};

export default bigPicturePhoto;

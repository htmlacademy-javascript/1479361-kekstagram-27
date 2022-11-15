import {renderBigPhoto} from './big-picture/big-photo.js';

const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();
const photoFilters = document.querySelector('.img-filters');


const generatePhotos = (data) => {

  data.forEach((dataPhoto) => {
    const picture = pictureTemplate.cloneNode(true);
    const imgAttribute = picture.querySelector('.picture__img');
    const likes = picture.querySelector('.picture__likes');
    const comments = picture.querySelector('.picture__comments');

    likes.textContent = dataPhoto.likes;
    imgAttribute.src = dataPhoto.url;
    comments.textContent = dataPhoto.comments.length;

    imgAttribute.addEventListener(('click'), () => {
      renderBigPhoto(dataPhoto);
    });

    pictureListFragment.append(picture);
  });

  picturesContainer.append(pictureListFragment);
  photoFilters.className = 'img-filters container';
};

const removePhotos = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((item) => {
    item.remove();
  });
};

export {generatePhotos, removePhotos};

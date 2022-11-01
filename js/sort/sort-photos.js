import { dataPhotosArr } from '../api.js';
import generatePhotos from '../small-photos.js';

const photoFilters = document.querySelector('.img-filters');
const picturesContainer = document.querySelector('.pictures');
const filtersForm = photoFilters.querySelector('.img-filters__form');
const defaultFilterButton = filtersForm.querySelector('#filter-default');
const randomFilterButton = filtersForm.querySelector('#filter-random');
const discussedFilterButton = filtersForm.querySelector('#filter-discussed');

const sortPhotos = (evt) => {
  evt.preventDefault();
  const pictures = picturesContainer.querySelectorAll('.picture');
  if(evt.target.id === 'filter-default' & defaultFilterButton.classList.value !== 'img-filters__button img-filters__button--active'){

    defaultFilterButton.classList.add('img-filters__button--active');
    randomFilterButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.remove('img-filters__button--active');


    pictures.forEach((item) => {
      item.remove();
    });

    generatePhotos(dataPhotosArr);

  }

  if(evt.target.id === 'filter-random' & randomFilterButton.classList.value !== 'img-filters__button img-filters__button--active'){

    randomFilterButton.classList.add('img-filters__button--active');
    defaultFilterButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.remove('img-filters__button--active');

    pictures.forEach((item) => {
      item.remove();
    });
    const dataPhotosArrRandom = [];
    const dataPhotosArrCopy = [...dataPhotosArr];

    for(let i = 0; i < 10; i++){
      const random = Math.floor(Math.random() * dataPhotosArrCopy.length);
      dataPhotosArrRandom.push(dataPhotosArrCopy[random]);
      dataPhotosArrCopy.splice(dataPhotosArrCopy.indexOf(dataPhotosArrCopy[random]), 1);
    }
    generatePhotos(dataPhotosArrRandom);

  }

  if(evt.target.id === 'filter-discussed' & discussedFilterButton.classList.value !== 'img-filters__button img-filters__button--active'
  ){
    discussedFilterButton.classList.add('img-filters__button--active');
    randomFilterButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.remove('img-filters__button--active');

    pictures.forEach((item) => {
      item.remove();
    });

    const dataPhotosArrCopy = [...dataPhotosArr].sort((current, previos) => {
      if (current.comments.length < previos.comments.length) {
        return 1;
      }
      if (current.comments.length > previos.comments.length) {
        return -1;
      }
      return 0;
    });

    generatePhotos(dataPhotosArrCopy);
  }
};

export {sortPhotos};

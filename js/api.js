import generatePhotos from './small-photos.js';
import { sortPhotos } from './sort/sort-photos.js';
import { showAlert } from './utils.js';

const adForm = document.querySelector('.img-upload__form');
const photoFilters = document.querySelector('.img-filters');
let dataPhotosArr = [];

const filtersForm = photoFilters.querySelector('.img-filters__form');

filtersForm.addEventListener('click', sortPhotos);

fetch('https://27.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if(response.ok){
      return response;
    }

    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((response) => response.json())
  .then((dataPhotos) => {
    dataPhotosArr = dataPhotos;
    generatePhotos(dataPhotosArr);
  })
  .then(
    photoFilters.className = 'img-filters container'
  )
  .catch(() =>
    showAlert()
  );

const postPhoto = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch(
      'https://27.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      }).then((response) => {
      if(response.ok) {
        onSuccess();
      }else {
        throw new Error('Не удалось отправить форму');
      }
    }).catch(() => onError());
  });
};

export {postPhoto, dataPhotosArr};

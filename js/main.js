import { sendRequest } from './api.js';
import {loadPhoto} from './form/form.js';
import { generatePhotos } from './small-photos.js';
import { showAlert } from './utils.js';
import { sortPhotos } from './sort/sort-photos.js';
const filtersForm = document.querySelector('.img-filters__form');

let photos = [];
const onFiltersFormClick = (evt) => sortPhotos(evt, photos);

const onSuccess = (data) => {
  photos = data.slice();
  generatePhotos(photos);
  filtersForm.addEventListener('click', onFiltersFormClick);
};

const upLoad = document.querySelector('#upload-file');

upLoad.addEventListener('change', loadPhoto);

sendRequest(onSuccess, showAlert, 'GET');

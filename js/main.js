import { sendRequest } from './api.js';
import {onLoadPhotoChange} from './form/form.js';
import { generatePhotos } from './small-photos.js';
import { showAlert } from './utils.js';
import { sortPhotos } from './sort/sort-photos.js';

const filtersForm = document.querySelector('.img-filters__form');
const upLoad = document.querySelector('#upload-file');
let photos = [];

const onFiltersFormClick = (evt) => sortPhotos(evt, photos);

const onSuccess = (data) => {
  photos = data.slice();
  generatePhotos(photos);
  filtersForm.addEventListener('click', onFiltersFormClick);
};

upLoad.addEventListener('change', onLoadPhotoChange);

sendRequest(onSuccess, showAlert, 'GET');

import {generatePhotos, removePhotos} from '../small-photos.js';
import { debounce, shuffleArray, sortInDescendingOrder } from '../utils.js';

const ACTIVE_CLASS = 'img-filters__button--active';

const filtersForm = document.querySelector('.img-filters__form');

const filters = {
  'filter-default': (data) => data.slice(),
  'filter-random': (data) => shuffleArray(data),
  'filter-discussed': (data) => sortInDescendingOrder(data)
};

const sortPhotos = debounce((evt, photos) => {
  if (evt.target.tagName === 'BUTTON') {
    const activeButton = filtersForm.querySelector('.img-filters__button--active');

    if (activeButton) {
      activeButton.classList.remove(ACTIVE_CLASS);
    }

    evt.target.classList.add(ACTIVE_CLASS);

    removePhotos();
    generatePhotos(filters[evt.target.id](photos));
  }
});

export {sortPhotos};

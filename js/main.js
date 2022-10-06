import { lengthCheck } from './utils.js';
import { photosData } from './mocks.js';
import { generatePhotos } from './small-photos.js';

lengthCheck('1234', 8);
generatePhotos(photosData);

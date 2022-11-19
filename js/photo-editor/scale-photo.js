const MIN_SIZE = 25;
const MAX_SIZE = 100;
const SIZE_STEP = 25;

const uploadFormContainer = document.querySelector('.img-upload__preview-container');
const uploadPreview = document.querySelector('.img-upload__preview');
const controllSmallerButton = uploadFormContainer.querySelector('.scale__control--smaller');
const controllBiggerButton = uploadFormContainer.querySelector('.scale__control--bigger');
const image = uploadFormContainer.querySelector('img');
const controllValue = uploadFormContainer.querySelector('.scale__control--value');

const scalePhoto = () => {
  let sizePhoto = 100;
  controllValue.value = `${sizePhoto}%`;
  controllValue.value = `${sizePhoto}%`;
  uploadPreview.style.transform = `scale(${sizePhoto}%)`;

  const changeSize = (factor = 1) => {
    sizePhoto = sizePhoto + SIZE_STEP * factor;

    if(sizePhoto < MIN_SIZE){
      sizePhoto = MIN_SIZE;
    }

    if(sizePhoto > MAX_SIZE){
      sizePhoto = MAX_SIZE;
    }

    controllValue.value = `${sizePhoto}%`;

    image.style.transition = 'all 0.5s linear';
    image.style.transform = `scale(${sizePhoto}%)`;
  };

  const onSmallerButtonClick = () => changeSize(-1);

  const onBiggerButtonClick = () => changeSize();

  controllSmallerButton.addEventListener('click', onSmallerButtonClick);
  controllBiggerButton.addEventListener('click', onBiggerButtonClick);
};

export {scalePhoto};

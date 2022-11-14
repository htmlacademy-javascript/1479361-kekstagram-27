const MIN_SIZE = 25;
const MAX_SIZE = 100;
const SIZE_STEP = 25;

const uploadFormContainer = document.querySelector('.img-upload__preview-container');
const uploadPreview = document.querySelector('.img-upload__preview');
const controllSmallerButton = uploadFormContainer.querySelector('.scale__control--smaller');
const controllBiggerButton = uploadFormContainer.querySelector('.scale__control--bigger');
const controllValue = uploadFormContainer.querySelector('.scale__control--value');

const scalePhoto = () => {

  let sizePhoto = 100;

  controllValue.value = `${sizePhoto}%`;
  controllValue.value = `${sizePhoto}%`;
  uploadPreview.style.transform = `scale(${sizePhoto}%)`;

  controllBiggerButton.disabled = true;
  controllSmallerButton.disabled = false;

  controllSmallerButton.addEventListener('click', () => {
    controllBiggerButton.disabled = false;
    controllValue.value = `${sizePhoto -= SIZE_STEP}%`;
    uploadPreview.style.webkitTransition = 'all 0.5s linear';
    uploadPreview.style.transform = `scale(${sizePhoto}%)`;
    if(sizePhoto <= MIN_SIZE){
      controllSmallerButton.disabled = true;
    }else {
      controllSmallerButton.disabled = false;
    }
  });

  controllBiggerButton.addEventListener('click', () => {
    controllSmallerButton.disabled = false;
    controllValue.value = `${sizePhoto += SIZE_STEP}%`;
    uploadPreview.style.transform = `scale(${sizePhoto}%)`;
    if(sizePhoto >= MAX_SIZE){
      controllBiggerButton.disabled = true;
    }else {
      controllBiggerButton.disabled = false;
    }
  });
};

export {scalePhoto};

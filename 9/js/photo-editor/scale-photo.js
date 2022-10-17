const scalePhoto = () => {
  const uploadFormContainer = document.querySelector('.img-upload__preview-container');
  const uploadPreview = document.querySelector('.img-upload__preview');
  const controllSmallerButton = uploadFormContainer.querySelector('.scale__control--smaller');
  const controllBiggerButton = uploadFormContainer.querySelector('.scale__control--bigger');
  let sizePhoto = 100;
  const controllValue = uploadFormContainer.querySelector('.scale__control--value');
  controllValue.value = `${sizePhoto}%`;

  controllBiggerButton.disabled = true;

  controllSmallerButton.addEventListener('click', () => {
    controllBiggerButton.disabled = false;
    controllValue.value = `${sizePhoto -= 25 * 100 / 100}%`;
    uploadPreview.style.webkitTransition = 'all 0.5s linear';
    uploadPreview.style.transform = `scale(${sizePhoto / 100})`;
    if(sizePhoto <= 25){
      controllSmallerButton.disabled = true;
    }else {
      controllSmallerButton.disabled = false;
    }
  });

  controllBiggerButton.addEventListener('click', () => {
    controllSmallerButton.disabled = false;
    controllValue.value = `${sizePhoto += 25 * 100 / 100}%`;
    uploadPreview.style.transform = `scale(${sizePhoto / 100})`;
    if(sizePhoto >= 100){
      controllBiggerButton.disabled = true;
    }else {
      controllBiggerButton.disabled = false;
    }
  });
};

export default scalePhoto;

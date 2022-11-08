const sliderElement = document.querySelector('.effect-level__slider');
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
});

const effectsPhoto = () => {
  const effectsList = document.querySelector('.effects__list');
  const effectsItems = effectsList.querySelectorAll('.effects__item');
  const photoPreview = document.querySelector('.img-upload__preview');
  const effectValue = document.querySelector('.effect-level__value');
  const effectLevel = document.querySelector('.effect-level');

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
  });

  effectLevel.hidden = true;
  photoPreview.style.filter = '';

  const movementSlider = (min, max, start, step, name, calculsSystem) => {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: min,
        max: max,
      },
      start: start,
      step: step,
    });

    sliderElement.noUiSlider.on('update', () => {
      photoPreview.style.filter = `${name}(${sliderElement.noUiSlider.get()}${calculsSystem})`;
    });
  };

  effectsItems.forEach((it) => {
    const effectInput = it.querySelector('input');
    photoPreview.classList.remove(`effects__preview--${effectInput.value}`);
    effectInput.addEventListener('click', () => {
      photoPreview.removeAttribute('class');
      photoPreview.classList.add('img-upload__preview');
      photoPreview.classList.add(`effects__preview--${effectInput.value}`);

      // Как тут все сделать без свича и объектом?
      const effects = {
        chrome: {
          min: 0,
          max: 1,
          start: 1,
          step: 0.1,
          name: 'grayscale',
          calculsSystem: ''
        },
      };

      switch (effectInput.value){
        case 'chrome':
          effectLevel.hidden = false;
          movementSlider(
            effects.chrome.min,
            effects.chrome.max,
            effects.chrome.start,
            effects.chrome.step,
            effects.chrome.name,
            effects.chrome.calculsSystem
          );
          break;
        case 'sepia':
          effectLevel.hidden = false;
          movementSlider(0, 1, 1, 0.1, 'sepia', '');
          break;
        case 'marvin':
          effectLevel.hidden = false;
          movementSlider(0, 100, 100, 1, 'invert', '%');
          break;
        case 'phobos':
          effectLevel.hidden = false;
          movementSlider(0, 3, 3, 0.1, 'blur', 'px');
          break;
        case 'heat':
          effectLevel.hidden = false;
          movementSlider(1, 3, 3, 0.1, 'brightness', '');
          break;
        case 'none':
          photoPreview.style.filter = '';
          effectLevel.hidden = true;
          break;
      }
    });
  });

};

export default effectsPhoto;

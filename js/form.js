const form = () => {
  const upLoad = document.querySelector('#upload-file');
  const upLoadOverlay = document.querySelector('.img-upload__overlay');
  const upLoadChannelButton = upLoadOverlay.querySelector('#upload-cancel');
  const hashTag = upLoadOverlay.querySelector('.text__hashtags');
  const textDescription = upLoadOverlay.querySelector('.text__description');


  const MAX_LENGTH_TEXT = 140;

  const onKeydown = (evt) => {
    if(
      evt.key === 'Escape'
      && !evt.target.classList.contains('text__hashtags')
      && !evt.target.classList.contains('text__description')
    ){
      document.body.classList.remove('modal-open');
      upLoadOverlay.classList.add('hidden');
      window.removeEventListener('keydown', onKeydown);
      upLoad.value = '';
      textDescription.value = '';
      hashTag.value = '';
    }
  };

  const onClickCross = () => {
    upLoadOverlay.classList.add('hidden');
    window.removeEventListener('keydown', onKeydown);
    document.body.classList.remove('modal-open');
    upLoad.value = '';
    textDescription.value = '';
    hashTag.value = '';
  };

  const loadingPhoto = () => {
    document.body.classList.add('modal-open');
    upLoadOverlay.classList.remove('hidden');
    upLoadChannelButton.addEventListener('click', onClickCross);
    window.addEventListener('keydown', onKeydown);
    hashTag.setAttribute('required', true);
    textDescription.setAttribute('maxlength', MAX_LENGTH_TEXT);
  };

  // Валидация

  const MAX_SYMBOLS = 20;
  const MAX_HASHTAGS = 5;

  const formUpLoad = document.querySelector('.img-upload__form');

  const pristine = new Pristine (formUpLoad, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__item--invalid',
    successClass: 'img-upload__item--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error',
  });

  const inputHashtag = formUpLoad.querySelector('.text__hashtags');

  let errorMessage = '';

  const error = () => errorMessage;

  const hashtagsHandler = (value) => {
    errorMessage = '';

    const inputText = value.toLowerCase().trim();

    if(!inputText) {
      return true;
    }

    const inputArray = inputText.split(/\s+/);

    if(inputArray.length === 0) {
      return true;
    }

    const rules = [
      {
        check: inputArray.some((item) => item.indexOf('#', 1) >= 1) ,
        error: 'Хеш-теги разделяются пробелами',
      },
      {
        check: inputArray.some((item) => item[0] !== '#'),
        error: 'Хеш-тег  должен начинаться с символа #',
      },
      {
        check: inputArray.some((item, number, array) => array.includes(item, number + 1)),
        error: 'Хеш-теги не должны повторяться',
      },
      {
        check: inputArray.some((item) => item.length > MAX_SYMBOLS),
        error: `Максимальна длина одного Хеш-тега не может быть больше ${MAX_SYMBOLS}, включая решетку`,
      },
      {
        check: inputArray.length > MAX_HASHTAGS,
        error: `Нельзя указывать больше ${MAX_HASHTAGS} Хеш-тегов`,
      },
      {
        check: inputArray.some((item) => !/^#[a-zа-яё0-9{1,19}$]/i.test(item)),
        error: 'Хеш-тег содержит недопустимые символы',
      },
    ];

    return rules.every((rule) => {
      const isInvalid = rule.check;
      if(isInvalid){
        errorMessage = rule.error;
      }
      return !isInvalid;
    });
  };

  pristine.addValidator(inputHashtag, hashtagsHandler, error, 2, false);

  const buttonUploadSubmit = document.querySelector('.img-upload__submit');

  const onHashTagInput = () => {
    if(pristine.validate()){
      buttonUploadSubmit.disabled = false;
    }else {
      buttonUploadSubmit.disabled = true;
    }
  };

  inputHashtag.addEventListener('input', onHashTagInput);

  formUpLoad.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if(pristine.validate()){
      buttonUploadSubmit.disabled = false;
    }else {
      buttonUploadSubmit.disabled = true;
    }
  });

  // Конец валидации

  upLoad.addEventListener('change', loadingPhoto);

};

export default form;

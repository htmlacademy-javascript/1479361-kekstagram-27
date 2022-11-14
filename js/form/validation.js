const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const formUpLoad = document.querySelector('.img-upload__form');
const inputHashtag = formUpLoad.querySelector('.text__hashtags');
const buttonUploadSubmit = document.querySelector('.img-upload__submit');
let errorMessage = '';
const error = () => errorMessage;

const pristine = new Pristine (formUpLoad, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
});

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
      error: `Максимальная длина одного Хеш-тега не может быть больше ${MAX_SYMBOLS}, включая решетку`,
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

const onHashTagInput = () =>{
  buttonUploadSubmit.disabled = !pristine.validate();
};


inputHashtag.addEventListener('input', onHashTagInput);

formUpLoad.addEventListener('submit', (evt) => {
  evt.preventDefault();

  buttonUploadSubmit.disabled = true;
});

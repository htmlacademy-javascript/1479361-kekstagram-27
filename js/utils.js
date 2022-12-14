const ALERT_SHOW_TIME = 5000;
const MAX_SHUFFLED_COUNT = 10;

const changeDeclanation = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Данные с сервера не загрузились!';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция, ДЛЯ УСТРАНЕНИЯ ДРЕБЕЗГА, взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

const checkEscape = (evt) => evt.key === 'Escape';

const sortInDescendingOrder = (data) => [...data].sort((current, previos) => {
  if (current.comments.length < previos.comments.length) {
    return 1;
  }
  if (current.comments.length > previos.comments.length) {
    return -1;
  }
  return 0;
});

const shuffleArray = (array) => array
  .slice()
  .sort(() => Math.random() - 0.5)
  .slice(0, MAX_SHUFFLED_COUNT);


export {changeDeclanation, showAlert, debounce, checkEscape, sortInDescendingOrder, shuffleArray};

const getRandomArbitrary = (min, max) => {
  if(min >= max || !max){
    return ' минимальное число должно быть меньше максимального';
  } else if (min < 0) {
    return 'минимальное значение должно быть положительным';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const lengthCheck = (string, maxLength) => string.length <= maxLength;

const declOfNum = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];


export {getRandomArbitrary, lengthCheck, declOfNum};

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

export {getRandomArbitrary, lengthCheck};

export const getRandomArbitrary = (min, max) => {
  if(min >= max || !max){
    return ' минимальное число должно быть меньше максимального';
  } else if (min < 0) {
    return 'минимальное значение должно быть положительным';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const lengthCheck = (string, maxLength) => {
  if(typeof string !== 'string'){
    return 'В поле ввода строка, должна быть строка';
  } else if (typeof maxLength !== 'number' || maxLength < 1) {
    return 'В поле ввода числа, должно быть число и число должно быть больше нуля';
  }else if (string.length <= maxLength){
    return true
  }
  return false
  // return string.length <= maxLength ? true : false;
}

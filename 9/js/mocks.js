import {getRandomArbitrary} from './utils.js';

const photosData = [];

const textComments = 'Всё отлично! В целом всё неплохо. Но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  .split('.');

const names = ['Арсений','Артём','Лев','Сергей','Святослав','Фёдор','Иван','Михаил','Дмитрий','Елисей','Владимир','Максим','Константин','Кирилл','Матвей','Савелий','Андрей','Евгений','Александр','Глеб','Тимур','Марк','Ибрагим','Илья','Артемий','Мирон','Игорь','Пётр','Даниил','Денис','Руслан','Роман','Даниэль','Николай','Савва','Алексей','Тимофей','Богдан','Степан','Леонид','Платон','Егор','Никита','Юрий','Данил','Серафим','Лука','Олег','Давид','Захар',];

const generatePhotosData = () => {
  for(let i = 0; i < 25; i++) {
    const commentsCount = [];

    for(let j = 0; j < getRandomArbitrary(100, 101); j++){
      const comment = {
        id: j + i * 30,
        avatar: `/img/avatar-${getRandomArbitrary(1, 6)}.svg`,
        message: textComments[getRandomArbitrary(0, textComments.length - 1)],
        name: names[getRandomArbitrary(0, names.length - 1)]
      };
      commentsCount.push(comment);
    }

    const photoData = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: `тут будет описание ${i + 1}`,
      likes: getRandomArbitrary(15, 200),
      comments: commentsCount,
    };
    photosData.push(photoData);
  }
};

generatePhotosData();

export default photosData;

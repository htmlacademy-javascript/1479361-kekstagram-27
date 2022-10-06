export const generatePhotos = (data) => {
  const pictureTemplate = document.querySelector('#picture').content;
  const picturesContainer = document.querySelector('.pictures');
  const pictureListFragment = document.createDocumentFragment();

  data.forEach((dataPhoto) => {
    const picture = pictureTemplate.cloneNode(true);
    const imgAttribute = picture.querySelector('.picture__img');
    const likes = picture.querySelector('.picture__likes');
    const comments = picture.querySelector('.picture__comments');

    likes.textContent = dataPhoto.likes;
    imgAttribute.src = dataPhoto.url;
    comments.textContent = dataPhoto.comments.length;

    pictureListFragment.append(picture);
  });

  picturesContainer.append(pictureListFragment);
};

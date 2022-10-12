export const createSocialComments = (commentsData) => {
  const commentsContainer = document.querySelector('.social__comments');
  const comment = commentsContainer.querySelector('.social__comment');
  const socialPicture = comment.querySelector('img');
  const socialText = comment.querySelector('p');
  commentsContainer.innerHTML = '';

  commentsData.map((commentData) => {
    const commentContainer = comment.cloneNode(true);
    socialPicture.src = commentData.avatar;
    socialPicture.alt = commentData.name;
    socialText.textContent = commentData.message;
    commentsContainer.append(commentContainer);
  });
};

export const createSocialComments = (commentsData) => {
  const bigPicture = document.querySelector('.big-picture');
  const commentsContainer = document.querySelector('.social__comments');
  const comment = commentsContainer.querySelector('.social__comment');
  const socialPicture = comment.querySelector('img');
  const socialText = comment.querySelector('p');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const socialComments = socialCommentCount.querySelector('.comments-count');
  const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
  commentsContainer.innerHTML = '';

  console.log(socialCommentCount);

  const from = 0;
  const to = 5;

  commentsData.slice(from,to).map((commentData) => {
    const commentContainer = comment.cloneNode(true);
    socialPicture.src = commentData.avatar;
    socialPicture.alt = commentData.name;
    socialText.textContent = commentData.message;
    commentsContainer.append(commentContainer);
  });
};

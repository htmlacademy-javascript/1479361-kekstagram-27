import { checkEscape, changeDeclanation } from '../utils.js';

const INITIAL_NUMBER = 0;
const STEP_RENDER_COMMENTS = 5;
const CURRENT_COUNT_COMMENTS = 5;
const WORDS = ['комментария', 'комментариев', 'комментариев'];

const commentsContainer = document.querySelector('.social__comments');
const comment = commentsContainer.querySelector('.social__comment');
const socialPicture = comment.querySelector('img');
const socialText = comment.querySelector('p');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.social__comments-loader');
const bigPicture = document.querySelector('.big-picture');
const cancelPicture = bigPicture.querySelector('#picture-cancel');

let from = INITIAL_NUMBER;
let howMany = STEP_RENDER_COMMENTS;

const makesDefaultCounter = (fromNumber, toNumber) => {
  from = fromNumber;
  howMany = toNumber;
};

const increasingTheCommentsStep = (counter) => {
  from += counter;
  howMany += counter;
};

const getCounterContent = (currentNumberOfComments, totalComments) => `${currentNumberOfComments} из ${totalComments} ${changeDeclanation(totalComments, WORDS)}`;

const createSocialComments = (commentsData) => {

  commentsContainer.innerHTML = '';

  socialCommentCount.textContent = getCounterContent(CURRENT_COUNT_COMMENTS, commentsData.length);

  if(commentsData.length < CURRENT_COUNT_COMMENTS) {
    commentsLoaderButton.classList.add('hidden');
    socialCommentCount.textContent = getCounterContent(commentsData.length, commentsData.length);
  }

  const clickLoadComments = () => {

    increasingTheCommentsStep(STEP_RENDER_COMMENTS);

    commentsData.slice(from, howMany).map((commentData) => {
      const commentContainer = comment.cloneNode(true);
      const socialComm = socialCommentCount.cloneNode(true);

      socialPicture.src = commentData.avatar;
      socialPicture.alt = commentData.name;
      socialText.textContent = commentData.message;
      commentsContainer.append(commentContainer);

      if(howMany >= commentsData.length){
        commentsLoaderButton.classList.add('hidden');
        socialComm.classList.remove('social__comment-count');
        socialComm.textContent = getCounterContent(commentsData.length, commentsData.length);
      }else {
        socialComm.classList.remove('social__comment-count');
        socialComm.textContent = getCounterContent(howMany, commentsData.length);
      }

      socialCommentCount.innerHTML = '';
      socialCommentCount.append(socialComm);
    });
  };

  commentsLoaderButton.addEventListener('click', clickLoadComments);

  commentsData.slice(from, howMany).map((commentData) => {
    const commentContainer = comment.cloneNode(true);
    socialPicture.src = commentData.avatar;
    socialPicture.alt = commentData.name;
    socialText.textContent = commentData.message;
    commentsContainer.append(commentContainer);
  });

  const onKeydown = (evt) => {
    if(checkEscape(evt)){
      document.body.classList.remove('modal-open');
      commentsLoaderButton.classList.remove('hidden');
      document.removeEventListener('keydown', onKeydown);
      commentsLoaderButton.removeEventListener('click', clickLoadComments);
      makesDefaultCounter(INITIAL_NUMBER, STEP_RENDER_COMMENTS);
    }
  };

  const onClickCross = () => {
    document.body.classList.remove('modal-open');
    commentsLoaderButton.classList.remove('hidden');
    document.removeEventListener('keydown', onKeydown);
    commentsLoaderButton.removeEventListener('click', clickLoadComments);
    makesDefaultCounter(INITIAL_NUMBER, STEP_RENDER_COMMENTS);
  };

  document.addEventListener('keydown', onKeydown);
  cancelPicture.addEventListener('click', onClickCross);

};

export {createSocialComments};

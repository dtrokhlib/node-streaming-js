const likeButton = document.querySelector('#likeButton');
const dislikeButton = document.querySelector('#dislikeButton');
const commentsButton = document.querySelector('.comments-button');
const commentsPopup = document.querySelector('#popup-comments-container');

likeButton.addEventListener('click', (e) => {
  if (likeButton.children[0].src.includes('/media/like.png')) {
    sendLikeRequest(true);
  } else {
    sendLikeRequest(false);
  }
});

dislikeButton.addEventListener('click', (e) => {
  if (dislikeButton.children[0].src.includes('/media/dislike.png')) {
    sendDislikeRequest(true);
  } else {
    sendDislikeRequest(false);
  }
});

commentsButton.addEventListener('click', async (e) => {
  e.preventDefault();

  commentsPopup.style.display = 'block';

  const response = await fetch(`/comments/${document.URL.split('/')[4]}/view`);

  const commentsData = await response.json();



});

const sendLikeRequest = async (likeState) => {
  likeButton.children[0].src = likeState
    ? '/media/like-active.png'
    : '/media/like.png';

  dislikeButton.children[0].src = '/media/dislike.png';

  const response = await fetch(`/reaction/${document.URL.split('/')[4]}/like`, {
    method: 'POST',
  });

  const responseData = await response.json();

  console.log(responseData);
};

const sendDislikeRequest = async (dislikeState) => {
  dislikeButton.children[0].src = dislikeState
    ? '/media/dislike-active.png'
    : '/media/dislike.png';

  likeButton.children[0].src = '/media/like.png';

  const response = await fetch(
    `/reaction/${document.URL.split('/')[4]}/dislike`,
    {
      method: 'POST',
    }
  );

  const responseData = await response.json();

  console.log(responseData);
};

const renderComments = async (commentData) => {
  console.log(commentData)
}
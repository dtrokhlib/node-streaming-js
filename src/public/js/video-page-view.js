const likeButton = document.querySelector('#likeButton');
const dislikeButton = document.querySelector('#dislikeButton');

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

const sendLikeRequest = (likeState) => {
  likeButton.children[0].src = likeState
    ? '/media/like-active.png'
    : '/media/like.png';
};

const sendDislikeRequest = (dislikeState) => {
  dislikeButton.children[0].src = dislikeState
    ? '/media/dislike-active.png'
    : '/media/dislike.png';
};

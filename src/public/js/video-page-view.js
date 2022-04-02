const likeButton = document.querySelector('#likeButton');
const dislikeButton = document.querySelector('#dislikeButton');
const commentsButton = document.querySelector('.comments-button');
const commentsPopup = document.querySelector('#popup-comments-container');
const commentContainer = document.querySelector('.comment-section');
const commentCloseButton = document.querySelector('.comment-close-button');

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

  const response = await fetch(`/comments/${document.URL.split('/')[4]}/view`);

  const commentsData = await response.json();

  await renderComments(commentsData);

  commentsPopup.style.display = 'block';
});

commentCloseButton.addEventListener('click', (e) => {
  commentsPopup.style.display = 'none';
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
};

const renderComments = async (commentData) => {
  let commentsBlock = '';

  commentData.forEach((comment) => {
    let timeRender = timeRendering(comment.createdAt);

    commentsBlock += `<div class="single-comment media">
      <div class="media-body">
        <h4 class="media-heading title">${comment.userId.email}</h4>
        <p class="komen">
          <span>${timeRender}</span><br>
          ${comment.comment}
        </p>
      </div>
    </div>`;
  });

  commentContainer.innerHTML = commentsBlock;
};

const timeRendering = (incomeData) => {
  let newTime = incomeData.split('T');
  let data = newTime[0];
  let time = newTime[1].slice(0, 5);

  return `${time} ${data}`;
};

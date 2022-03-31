const addCommentButton = document.querySelector('.addCommentButton');
const comment = document.querySelector('#comment-value');
const commentSection = document.querySelector('.comment-section');

addCommentButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const data = {
    comment: comment.value,
  };

  console.log(data);

  const response = await fetch(`/comments/${document.URL.split('/')[4]}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  comment.value = '';
});

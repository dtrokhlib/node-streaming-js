const logoutButton = document.querySelector('.logout-button');

logoutButton.addEventListener('click', async (e) => {
  e.preventDefault();

  await fetch('/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  document.location = '/';
});

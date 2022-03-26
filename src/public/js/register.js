const registerButton = document.querySelector('#register-button');
const email = document.querySelector('#exampleInputEmail1');
const password = document.querySelector('#exampleInputPassword1');
const alertInfo = document.querySelector('.alert-danger');

registerButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const response = await fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });

  const responseInfo = await response.json();

  if (response.status !== 200) {
    alertInfo.style.display = 'block';
    alertInfo.innerHTML = responseInfo.message;
  } else {
    document.location = '/';
  }
});

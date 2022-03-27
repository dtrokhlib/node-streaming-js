const uploadButton = document.querySelector('#upload-button');
const uploadForm = document.querySelector('.upload-form');
const input = document.getElementsByClassName('form-control');

uploadButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const data = new FormData();

  if (!validateFields()) {
    return;
  }

  data.append('videoName', input[0].value);
  data.append('videoDescription', input[1].value);
  data.append('placeholderFile', input[2].files[0]);
  data.append('videoFile', input[3].files[0]);

  const response = await fetch('/upload/video', {
    method: 'POST',
    body: data,
  });

  const responseInfo = await response.json();

  if (response.status !== 200) {
    alertInfo.style.display = 'block';
    alertInfo.innerHTML = responseInfo.message;
  } else {
    document.location = '/library';
  }
});

const validateFields = () => {
  let validationPassed = true;

  if (!input[0].value) {
    input[0].classList.add('is-invalid');
    validationPassed = false;
  } else {
    input[0].classList.remove('is-invalid');
    input[0].classList.add('is-valid');
  }

  if (!input[1].value) {
    input[1].classList.add('is-invalid');
    validationPassed = false;
  } else {
    input[1].classList.remove('is-invalid');
    input[1].classList.add('is-valid');
  }

  if (!input[2].files[0]) {
    input[2].classList.add('is-invalid');
    validationPassed = false;
  } else {
    input[2].classList.remove('is-invalid');
    input[2].classList.add('is-valid');
  }

  if (!input[3].files[0]) {
    input[3].classList.add('is-invalid');
    validationPassed = false;
  } else {
    input[3].classList.remove('is-invalid');
    input[3].classList.add('is-valid');
  }

  return validationPassed;
};

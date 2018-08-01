/**
 * Created by obulaworld on 7/31/18.
 */
const registerButton = document.getElementById('register');
const successElement = document.getElementById('success');
const nameElement = document.getElementById('name');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');


const registerUser = (details) => {
  const url = 'https://my-diary-challenge.herokuapp.com/auth/signup';
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(details) })
    .then((response) => {
      return response.json();
    }).then((data) => {
      if (data.success){
        registerButton.innerHTML = 'Register';
        registerButton.removeAttribute('disabled');
        successElement.style.color = 'green';
        successElement.style.fontSize = '15px';
        successElement.innerHTML = 'Registration was successful....Redirecting to Dashboard';
        localStorage.setItem('token', data.token);
        setTimeout(() =>{
          window.location.href = window.location.protocol + '//' + window.location.hostname + '/dashboard.html';
        },2000);
      } else if (data.error) {
        registerButton.innerHTML = 'Register';
        successElement.style.color = 'red';
        successElement.style.fontSize = '15px';
        successElement.innerHTML = data.error;
      }
    }).catch( (err) => {
      console.log('Request failed', err);
    });
};

const checkInputs = () => {
  let errorCount = 0;
  const name = nameElement.value;
  const email = emailElement.value;
  const password = passwordElement.value;
  // Reference => https://stackoverflow.com/questions/20301237/javascript-form-validating-e-mail-address-and-checking-another-field-with-star
  const emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

  if (name === '' || !name.replace(/\s/g, '').length) {
    errorCount += 1;
    nameElement.style.border = '1px solid red';
  } else {
    nameElement.style.border = '1px solid green';
  }

  if (email === '' || !email.replace(/\s/g, '').length || !emailFilter.test(email)) {
    errorCount += 1;
    emailElement.style.border = '1px solid red';
  } else {
    emailElement.style.border = '1px solid green';
  }

  if (password === '' || !password.replace(/\s/g, '').length) {
    errorCount += 1;
    passwordElement.style.border = '1px solid red';
  } else {
    passwordElement.style.border = '1px solid green';
  }

  if (errorCount > 0) {
    successElement.style.color = 'red';
    successElement.style.fontSize = '15px';
    successElement.innerHTML = 'The inputs with red borders are either empty or invalid';
    return;
  } else {
    successElement.style.display = 'none';
  }

  registerButton.setAttribute('disabled', '');
  registerButton.innerHTML = 'Creating Account';
  const details = { name: name, password: password, email: email };

  registerUser(details);
};

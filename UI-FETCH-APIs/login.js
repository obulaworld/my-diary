/**
 * Created by obulaworld on 7/31/18.
 */
/**
 * Created by obulaworld on 7/31/18.
 */
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const loginButton = document.getElementById('login');
const successElement = document.getElementById('success');
let errorCount = 0;

const checkEmail = (email) => {
  // Reference => https://stackoverflow.com/questions/20301237/javascript-form-validating-e-mail-address-and-checking-another-field-with-star
  const emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
  if (email === '' || !email.replace(/\s/g, '').length || !emailFilter.test(email)) {
        errorCount += 1;
        emailElement.style.border = '1px solid red';
    } else {
       emailElement.style.border = '1px solid green';
   }
};

const checkPassword = (password) => {
    if (password === '' || !password.replace(/\s/g, '').length) {
        errorCount += 1;
        passwordElement.style.border = '1px solid red';
    } else {
        passwordElement.style.border = '1px solid green';
    }
};

const loginUser = (details) => {
const url = 'https://my-diary-challenge.herokuapp.com/auth/login';
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(details) })
    .then((response) => {
      return response.json();
    }).then((data) => {
      if (data.success) {
        loginButton.innerHTML = 'Login';
        loginButton.removeAttribute('disabled');
        successElement.style.color = 'green';
        successElement.innerHTML = 'Successful....Redirecting to Dashboard';
        localStorage.setItem('token', data.token);
        setTimeout(() => {
          window.location.href = window.location.protocol + '//' + window.location.hostname + '/dashboard.html';
        },2000);
      } else if (data.error) {
        loginButton.innerHTML = 'Login';
        loginButton.removeAttribute('disabled');
        successElement.style.color = 'red';
        successElement.style.fontSize = '15px';
        successElement.innerHTML = data.error;
      }
    }).catch((err) => {
      console.log('Request failed', err);
    });
};

const checkLogin = () => {
  errorCount = 0;
  const email1 = emailElement.value;
  const password1 = passwordElement.value;
  checkEmail(email1);
  checkPassword(password1);

  if (errorCount > 0) {
    successElement.style.color = 'red';
    successElement.style.fontSize = '15px';
    successElement.innerHTML = 'The Inputs with red border are either empty or invalid';
    return false;
  } else {
    successElement.innerHTML = '';
    loginButton.innerHTML = 'Please wait';
    loginButton.setAttribute('disabled', '');
    const details = { password: password1, email: email1 };
    loginUser(details);
  }
};

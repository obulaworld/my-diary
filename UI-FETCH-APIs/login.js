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

const checkPassword = (password) => {
    if (password === '' || !password.replace(/\s/g, '').length) {
        errorCount += 1;
        passwordElement.style.border = '1px solid red';
    } else {
        passwordElement.style.border = '1px solid green';
    }
};

const loginUser = (details) => {
const url = 'https://my-diary-challenge.herokuapp.com/api/v1/auth/login';
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(details) })
    .then((response) => {
      return response.json();
    }).then((data) => {
      if (data.success === true) {
        loginButton.innerHTML = 'Login';
        loginButton.removeAttribute('disabled');
        successElement.style.color = 'green';
        successElement.innerHTML = 'Successful....Redirecting to Dashboard';
          redirectDashboard(data);
      } else {
        loginButton.innerHTML = 'Login';
        loginButton.removeAttribute('disabled');
        successElement.style.color = 'red';
        successElement.style.fontSize = '15px';
        successElement.innerHTML = data.message;
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

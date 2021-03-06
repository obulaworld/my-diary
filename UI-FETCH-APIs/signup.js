/**
 * Created by obulaworld on 7/31/18.
 */
const registerButton = document.getElementById('register');
const successElement = document.getElementById('success');
const nameElement = document.getElementById('name');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
let errorCount = 0;


const checkOthers = (value, element) => {
        if (value === '' || !value.replace(/\s/g, '').length) {
            errorCount += 1;
            element.style.border = '1px solid red';
        } else {
            element.style.border = '1px solid green';
        }
};

const registerUser = (details) => {
  const url = 'https://my-diary-challenge.herokuapp.com/api/v1/auth/signup';
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(details) })
    .then((response) => { return response.json();
    }).then((data) => {
      if (data.success === true) {
        registerButton.innerHTML = 'Register';
        registerButton.removeAttribute('disabled');
        successElement.style.color = 'green';
        successElement.style.fontSize = '15px';
        successElement.innerHTML = 'Registration was successful....Redirecting to Dashboard';
        successElement.style.display = 'block';
          redirectDashboard(data);
      } else {
        registerButton.innerHTML = 'Register';
        registerButton.removeAttribute('disabled');
        successElement.innerHTML = data.message;
        successElement.style.color = 'red';
        successElement.style.fontSize = '15px';
        successElement.style.display = 'block';
      }
    }).catch( (err) => { console.log('Request failed', err); });
};

const checkInputs = () => {
  errorCount = 0;
  const name1 = nameElement.value;
  const email1 = emailElement.value;
  const password1 = passwordElement.value;
  checkOthers(name1, nameElement);
  checkEmail(email1);
  checkOthers(password1, passwordElement);

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
  const details = { name: name1, password: password1, email: email1 };

  registerUser(details);
};

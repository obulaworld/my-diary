const token = localStorage.getItem('token');
const emptyText = document.getElementById('box3');
const box = document.getElementById('box2');
emptyText.style.display = 'none';
const url = 'https://my-diary-challenge.herokuapp.com/entries';
box.style.display = 'none';

const getEntry = (id) => {
  localStorage.setItem('id', id);
  window.location.href = window.location.protocol + '//' + window.location.hostname + '/view.html';
};

const getEntries = () => {
  fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json; charset=utf-8', 'x-access-token': token } })
    .then((response) => {
      return response.json(); }).then((data) => {
      if (data.success) {
        if (data.entries.length < 1) {
          emptyText.style.width = '100%'; emptyText.style.height = '100%';
          emptyText.style.display = 'block';
        } else {
          let htmlValue = '';
          for (const entry of data.entries) {
            const content = entry.content.substring(1, 50);
            htmlValue += `<div class="box2"><h4>${entry.title}</h4><p> ${content}</p><div class="recent"><button class="button_1" onclick="getEntry(${entry.id})">View</button></div></div>`;
          }
          box.innerHTML = htmlValue; box.style.display = 'block';
        }
      } else if (data.error) {
        emptyText.style.width = '100%';
        emptyText.style.height = '100%';
        emptyText.style.display = 'block';
        emptyText.innerHTML = data.error;
      }
    }).catch((err) => {console.log('Request failed', err);});
};
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('entry');
  window.location.href = window.location.protocol + '//' + window.location.hostname + '/login.html';
};

const checkToken = (() => {
  if (!token) {
    window.location.href = window.location.protocol + '//' + window.location.hostname + '/login.html';
  } else {
    getEntries();
  }
})();

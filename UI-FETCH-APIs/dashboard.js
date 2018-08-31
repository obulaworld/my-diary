const emptyText = document.getElementById('box3');
const box = document.getElementById('box2');
const ripple = document.getElementById('lds-ripple');
emptyText.style.display = 'none';
const url = 'https://my-diary-challenge.herokuapp.com/api/v1/entries';
box.style.display = 'none';

const getEntry = (id) => {
  localStorage.setItem('id', id);
  window.location.href = window.location.protocol + '//' + window.location.hostname + '/view.html';
};

const getEntries = (() => {
  fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json; charset=utf-8', 'x-access-token': token } })
    .then((response) => {
      return response.json(); }).then((data) => {
      if (data.success) {
        if (data.entries.length < 1) {
          emptyText.style.width = '100%'; emptyText.style.height = '100%';
          ripple.style.display = 'none';
          emptyText.style.display = 'block';
        } else {
          let htmlValue = '';
          for (const entry of data.entries) {
            const content = entry.content.substring(1, 50);
            htmlValue += `<div class="box2"><h4>${entry.title}</h4><p> ${content}</p><div class="recent"><button class="button_1" onclick="getEntry(${entry.id})">View</button></div></div>`;
          }
          ripple.style.display = 'none';
          box.innerHTML = htmlValue;
          box.style.display = 'flex';
        }
      } else if (data) {
        ripple.style.display = 'none';
        emptyText.style.display = 'block';
      }
    }).catch((err) => {console.log('Request failed', err);});
})();

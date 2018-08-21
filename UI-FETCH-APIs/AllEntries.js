/**
 * Created by obulaworld on 8/1/18.
 */
const token = localStorage.getItem('token');
const box = document.getElementById('entries');
const boxes = document.getElementById('boxes');
const ripple = document.getElementById('lds-ripple');
boxes.style.display = 'none';
let count = 0;
let all = '';

const getEntry = (id) => {
  localStorage.setItem('id', id);
  window.location.href = window.location.protocol + '//' + window.location.hostname + '/view.html';
};

const editEntry = (id) => {
  for (const entry of all){
    if (parseInt(entry.id, 10) === parseInt(id, 10)) {
      localStorage.setItem('entry', JSON.stringify(entry));
    }
  }
  window.location.href = window.location.protocol + '//' + window.location.hostname + '/edit.html';
};

const getEntries = () => {
  const url = 'https://my-diary-challenge.herokuapp.com/api/v1/entries';
  fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json; charset=utf-8', 'x-access-token': token } })
    .then((response) => { return response.json();
    }).then((data) => {
      if (data.success) {
        if(data.entries.length < 1) {
          emptyText.style.width = '100%';
          emptyText.style.height = '100%';
          ripple.style.display = 'none'; boxes.style.display = 'block';
          emptyText.style.display = 'block';
        }else{
          all = data.entries; let htmlValue = '';
          for(const entry of data.entries){
            htmlValue += `<tr><td>${count + 1}</td><td>${new Date(entry.created_at).toDateString()}</td><td>${entry.title}</td>
                                <td><button onclick="getEntry(${entry.id})">View</button></td>
                                <td><button onclick="editEntry(${entry.id})">Edit</button></td>
                                <td><button onclick="deleteEntry(${entry.id})">Delete</button></td></tr>`;
             count = count + 1;
          }
          box.innerHTML = htmlValue; ripple.style.display = 'none'; boxes.style.display = 'block'; }
      } else if (data.error) {
        ripple.style.display = 'none'; boxes.style.display = 'block';
        box.innerHTML = '<tr><td rowspan="6">You currently have no entries......<a href="entry-add.html">Create Entry</a></td></tr>';
      }
    }).catch((err) => { console.log('Request failed', err); });
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

/**
 * Created by obulaworld on 8/1/18.
 */
/**
 * Created by obulaworld on 8/1/18.
 */
const token = localStorage.getItem('token');
const id = localStorage.getItem('id');
const box = document.getElementById('box');
box.style.display = 'none';

const getEntry = () => {
    const url = `https://my-diary-challenge.herokuapp.com/entries/${id}`;
    // const url = `http://localhost:3000/entries/${id}`;
    fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json; charset=utf-8', 'x-access-token': token } })
        .then((response) => {
            return response.json();
        }).then((data) => {
        if (data.success) {
            let htmlValue = '';
            for(const ent of data.entry) {
                htmlValue += `<div class="box2">
            <h4>Title: <span>${ent.title}</span></h4>
            <h5>Date: <span>${ent.created_at}</span></h5>
            <h5>Category: <span>${ent.category}</span></h5>
            <h5>Category: <span>${ent.sub_category}</span></h5>
            <h4>Content: </h4>
                <p>${ent.content}</p>
                <div class="recent">
                <a href="view-entry.html"><button >Back</button></a>
                </div>
            </div>`;
            }
            box.innerHTML = htmlValue;
            box.style.display = 'block';
        }else if(data.error) {
            // emptyText.style.width = '100%';
            // emptyText.style.height = '100%';
            // emptyText.style.display = 'block';
            // emptyText.innerHTML = data.error;
        }
    }).catch( (err) => {
      console.log('Request failed', err);
    });
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
    getEntry();
  }
})();

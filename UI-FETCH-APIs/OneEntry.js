/**
 * Created by obulaworld on 8/1/18.
 */
/**
 * Created by obulaworld on 8/1/18.
 */
const id = localStorage.getItem('id');
const box = document.getElementById('box');
const ripple = document.getElementById('lds-ripple');
box.style.display = 'none';

const getEntry = (() => {
    const url = `https://my-diary-challenge.herokuapp.com/api/v1/entries/${id}`;
    fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json; charset=utf-8', 'x-access-token': token } })
        .then((response) => { return response.json();
        }).then((data) => {
        if (data.success) { let htmlValue = '';
            for(const ent of data.entry) {
                htmlValue += `<div class="box2">
            <h4>Title: <span>${ent.title}</span></h4>
            <h5>Date: <span>${new Date(ent.created_at).toDateString()}</span></h5>
            <h5>Category: <span>${ent.category}</span></h5>
            <h5>Category: <span>${ent.sub_category}</span></h5>
            <h4>Content: </h4>
                <p>${ent.content}</p>
                <div class="recent">
                <a href="view-entry.html"><button >Back</button></a>
                </div>
            </div>`;
            }
            box.innerHTML = htmlValue; ripple.style.display = 'none';box.style.display = 'block';
        }else if(data.error) {
        }
    }).catch( (err) => {console.log('Request failed', err);});
})();

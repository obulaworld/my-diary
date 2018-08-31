/**
 * Created by obulaworld on 7/31/18.
 */

const entryTitle = document.getElementById('title');
const entryCategory = document.getElementById('category');
const subCat = document.getElementById('subCategory');
const contentText = document.getElementById('content');
const successT = document.getElementById('successT');
const successC = document.getElementById('successC');
const successS = document.getElementById('successS');
const successTe = document.getElementById('successTe');
const addButton = document.getElementById('add');
const box = document.getElementById('boxes');
const successElement = document.getElementById('success');
let errors = 0;



const SaveEntry = (details) => {
    const url = 'https://my-diary-challenge.herokuapp.com/api/v1/entries';
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8', 'x-access-token': token }, body: JSON.stringify(details) })
        .then((response) => {
            return response.json();
        }).then((data) => {
        if (data.success === true){
            addButton.innerHTML = 'Add Entry';
            successElement.style.color = '#155724';
            successElement.style.background = '#d4edda';
            successElement.style.border = '#c3e6cb';
            successElement.innerHTML = 'Entry creation was successful successful....<a href="view-entry.html" class="button_1">Go to All Entries</a>';
            successElement.scrollIntoView();
            // window.location.href = window.location.protocol + '//' + window.location.hostname + '/dashboard.html';
        } else {
            addButton.innerHTML = 'Add Entry';
            successElement.style.color = '#721c24';
            successElement.style.background = '#f8d7da';
            successElement.style.border = '#f5c6cb';
            successElement.style.fontSize = '15px';
            successElement.innerHTML = data.message;
            successElement.scrollIntoView();
        }
    }).catch( (err) =>{
        console.log('Request failed', err);
    });
};


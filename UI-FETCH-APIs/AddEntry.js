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

const checkOthers = (value,name, element1, element2) => {
    if (value === '' || !value.replace(/\s/g, '').length) {
        errors += 1;
        element1.style.color = 'red';
        element1.style.fontSize = '15px';
        element1.innerHTML = `${name} cannot be empty or spaces`;
        element2.style.border = '1px solid red';
    } else {
        element1.style.display = 'none';
        element2.style.border = '0';
    }
};

const AddEntry = (details) => {
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

const checkInputs = () => {
  errors = 0;
  const title = entryTitle.value;
  const category = entryCategory.value;
  const subCategory = subCat.value;
  const content = contentText.value;
  checkOthers(title, 'Title', successT, entryTitle);
  checkOthers(category, 'Category', successC, entryCategory);
  checkOthers(subCategory, 'subCategory', successS, subCat);
  checkOthers(content, 'Content', successTe, contentText);

  if (errors > 0) {
    box.scrollIntoView();
    return;
  }
  addButton.innerHTML = 'Saving....';
  const details = { title: title, category: category, subCategory: subCategory, content:content };
  AddEntry(details);
};

const table = document.getElementById('table');
const url = 'https://my-diary-challenge.herokuapp.com/api/v1/auth/user';
table.style.display = 'none';

const getUser = (() => {
  fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json; charset=utf-8', 'x-access-token': token } })
    .then((response) => {
      return response.json(); }).then((data) => {
      if (data.success === true) {
          table.innerHTML = `   <tr>
                                    <td><strong>Full Name</strong></td>
                                    <td>${data.user.name}</td>
                                </tr>
                                <tr>
                                    <td><strong>Email</strong></td>
                                    <td>${data.user.email}</td>
                                </tr>
                                <tr>
                                    <td><strong>Number of Entries</strong></td>
                                    <td>${data.entries.length}</td>
                                </tr>`;
          table.style.display = 'contents';
      } else {
          table.innerHTML = `   <tr>
                                    <td colspan="2"><strong>${data.message}</strong></td>`;
          table.style.display = 'block';
      }
    }).catch((err) => {console.log('Request failed', err);});
})();
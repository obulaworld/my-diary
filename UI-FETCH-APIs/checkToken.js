/**
 * Created by obulaworld on 8/31/18.
 */
const token = localStorage.getItem('token');
const checkToken = () => {
    if (!token) {
        window.location.href = window.location.protocol + '//' + window.location.hostname + '/login.html';
    }else{
        const url = 'https://my-diary-challenge.herokuapp.com/api/v1/verify-token';
        fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json; charset=utf-8', 'x-access-token': token } })
            .then((response) => {
                return response.json();
            }).then((data) => {
            if (data.success === false) {
                window.location.href = window.location.protocol + '//' + window.location.hostname + '/login.html';
            }else{
                return true;
            }
        }).catch( (err) => {
            console.log('Request failed', err);
        });
    }
};
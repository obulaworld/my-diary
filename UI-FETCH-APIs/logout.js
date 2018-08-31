/**
 * Created by obulaworld on 8/29/18.
 */
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('entry');
    window.location.href = window.location.protocol + '//' + window.location.hostname + '/login.html';
};
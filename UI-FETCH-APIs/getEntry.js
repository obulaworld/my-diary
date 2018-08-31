/**
 * Created by obulaworld on 8/31/18.
 */
const getEntry = (id) => {
    localStorage.setItem('id', id);
    window.location.href = window.location.protocol + '//' + window.location.hostname + '/view.html';
};
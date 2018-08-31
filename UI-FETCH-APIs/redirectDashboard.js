/**
 * Created by obulaworld on 8/31/18.
 */
const redirectDashboard = (data) => {
    localStorage.setItem('token', data.token);
    setTimeout(() =>{
        window.location.href = window.location.protocol+ '//' + window.location.hostname + '/dashboard.html';},2000);
}
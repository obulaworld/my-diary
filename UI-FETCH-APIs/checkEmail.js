/**
 * Created by obulaworld on 8/31/18.
 */
const checkEmail = (email) => {
    // Reference => https://stackoverflow.com/questions/20301237/javascript-form-validating-e-mail-address-and-checking-another-field-with-star
    const emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    if (email === '' || !email.replace(/\s/g, '').length || !emailFilter.test(email)) {
        errorCount += 1;
        emailElement.style.border = '1px solid red';
    } else {
        emailElement.style.border = '1px solid green';
    }
};
/**
 * Created by obulaworld on 8/31/18.
 */
const checkOthers = (value, name, element1, element2) => {
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
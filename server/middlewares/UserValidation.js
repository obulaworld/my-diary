/**
 * Created by obulaworld on 7/26/18.
 */
let pass = true;
export default (req, res, next) => {
    const emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;;
    const values = req.body;
    const required = ['email', 'password', 'name'];
    let errors = {};
    console.log(emailFilter.test(String(values.email).toLowerCase()));
    for (let i = 0; i < required.length; i += 1) {
        if (!values[required[i]]) { pass = false; errors[required[i]] = `${required[i]} not sent`; }
    }
    if(values.email && (!values.email.replace(/\s/g, '').length || !emailFilter.test(String(values.email).toLowerCase()))) {
        errors.email = 'Email can not be empty or invalid'; pass = false;
    }
    if(values.password && !values.password.replace(/\s/g, '').length) {
        errors.password = 'Password can not be empty or spaces'; pass = false;
    }
    if(values.name && !values.name.replace(/\s/g, '').length) {
        errors.name = 'Password can not be empty or spaces'; pass = false;
    }
    if (pass === false) { res.status(400).json({ error: errors }); } else { next(); }
};

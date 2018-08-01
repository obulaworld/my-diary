/**
 * Created by obulaworld on 7/26/18.
 */

export default (req, res, next) => {
    let pass = true;
    const emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    const values = req.body;
    const required = ['email', 'password'];
    let errors = {};
    for (let i = 0; i < required.length; i += 1) {
        if (!values[required[i]]) { pass = false; errors[required[i]] = `${required[i]} not sent`; }
    }
    if(values.email && (!values.email.replace(/\s/g, '').length || !emailFilter.test(values.email))) {
        errors.email = 'Email can not be empty or invalid'; pass = false;
    }
    if(values.password && !values.password.replace(/\s/g, '').length) {
        errors.password = 'Password can not be empty or spaces'; pass = false;
    }
    console.log(pass);
    if (pass === false) { res.status(400).json({ error: errors }); } else { next(); }
};

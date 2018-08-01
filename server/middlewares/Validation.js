
const check = {
  validate(req, res, next) {
      let pass = true;
      const values = req.body;
      const required = ['title', 'category', 'subCategory', 'content'];
      let errors = {};
      for (let i = 0; i < required.length; i += 1) {
          if (!values[required[i]]) { pass = false; errors[required[i]] = `${required[i]} is required`; }
      }
    if(values.title && !values.title.replace(/\s/g, '').length) {
        errors.title = 'Title can not be blank'; pass = false;
    }
   if(values.category && !values.category.replace(/\s/g, '').length) {
      errors.category = 'Category can not be blank'; pass = false;
   }
  if(values.subCategory && !values.subCategory.replace(/\s/g, '').length) {
      errors.subCategory = 'Subcategory can not be blank'; pass = false;
  }
  if(values.content && !values.content.replace(/\s/g, '').length) {
      errors.content = 'Content can not be blank'; pass = false;
  }
    if (pass === false) { res.status(400).json({ error: errors }); } else {
        req.body.title = req.body.title.replace(/\s+|\s+$|^\./g, ' '); req.body.category = req.body.category.replace(/\s+|\s+$|^\./g, ' ');
        req.body.subCategory = req.body.subCategory.replace(/\s+|\s+$|^\./g, ' '); req.body.content = req.body.content.replace(/\s+|\s+$|^\./g, ' ');
          next();} },
};

export default check;

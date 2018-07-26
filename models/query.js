/**
 * Created by obulaworld on 7/26/18.
 */
export default (db,params, callback) => {
  let text = 'Create table IF NOT EXISTS entries(id SERIAL PRIMARY KEY not null,';
  const keys = Object.keys(params);
  const length = keys.length;
  for (const param in params){
        if (params.hasOwnProperty(param)) {
            text += param + ' ' + params[param];
        }
        if(keys[length - 1] === param){
            text += '';
        } else { text += ','; }
    }
    text += ')';
    db.query(text, (error) => {
        if (error) throw error;
        if (callback) callback();
    });
    };


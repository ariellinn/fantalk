//Middleware functions handling verifying user (login)
//handle user account creation
const db = require('../models/fanTalkModel');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { name, password, event_code } = req.body;
  try {
    //get event_id from event_code
    let params = [`${event_code}`];
    let text = 'SELECT _id FROM eventtalk WHERE code = $1'
    const event_id = await db.query(text, params);
    if (event_id.rows.length === 0) {
      return res.status(400).json('Invalid event code. Unable to create account');
    } else {
      const hash = await bcrypt.hash(password, 10);
      params = [`${name}`, `${hash}`, `${event_id.rows[0]._id}`];
      text = 'INSERT INTO eventuser (name, password, event_id, ishost) VALUES ($1, $2, $3, false) RETURNING *';
      const data = await db.query(text, params);
      res.locals.user = data.rows[0];
      return next();
    }
  } catch (err) {
    const errObj = {
      log: 'cookieController.createUser could not read DB' + err,
      status: 500,
      message: { err: `An error occurred when creating user` }
    };
    return next(errObj);
  }
}


userController.verifyUser = async (req, res, next) => {
  const { name, password } = req.body;
  if (name === undefined || password === undefined) {
    return res.status(400).send('Error. Name or password was not provided');
  } else {
    //how to compare password and hash 
    let params = [`${name}`];
    let text = 'SELECT * FROM eventuser WHERE name = $1'
    const result = await db.query(text, params);
    for (let i = 0; i < result.rows; i++) {
      const { _id, dbname, dbpassword, event_id, ishost } = result[i];
      if (bcrypt.compare(password, dbpassword)) {
        res.locals.user = [_id, dbname, event_id, ishost];
      }
    }
    return res.status(400).json('Incorrect Username or Password');
  }
}

module.exports = userController;
//Middleware functions handling verifying user (login)
//handle user account creation
const db = require('../models/fanTalkModel');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { fname, fpassword, code } = req.body;
  try {
    //get event_id from event_code
    let params = [`${code}`];
    let text = 'SELECT _id FROM eventtalk WHERE code = $1'
    const event_id = await db.query(text, params);
    if (event_id.rows.length === 0) {
      return res.status(400).json('Invalid event code. Unable to create account');
    } else {
      const hash = await bcrypt.hash(fpassword, 10);
      params = [`${fname}`, `${hash}`, `${event_id.rows[0]._id}`];
      text = 'INSERT INTO eventuser (name, password, event_id, ishost) VALUES ($1, $2, $3, false) RETURNING _id, name, event_id, ishost';
      const data = await db.query(text, params);
      res.locals.user = data.rows[0];
      return next();
    }
  } catch (err) {
    const errObj = {
      log: 'userController.createUser could not read DB' + err,
      status: 500,
      message: { err: `An error occurred when creating user` }
    };
    return next(errObj);
  }
}


userController.verifyUser = async (req, res, next) => {
  const { fname, fpassword } = req.body;
  if (fname === undefined || fpassword === undefined) {
    return res.status(400).send('Error. Name or password was not provided');
  } else {
    //how to compare password and hash 
    try {
      let params = [`${fname}`];
      let text = 'SELECT * FROM eventuser WHERE name = $1'
      const result = await db.query(text, params);
      for (let i = 0; i < result.rows; i++) {
        const { _id, name, password, event_id, ishost } = result.rows[i];
        if (bcrypt.compare(fpassword, password)) {
          res.locals.user = { _id, name, event_id, ishost };
          return next();
        }
      }
      return res.status(400).json('Incorrect Username or Password');
    } catch (err) {
      const errObj = {
        log: 'userController.verifyUser could not read DB' + err,
        status: 500,
        message: { err: `An error occurred when logging user` }
      };
      return next(errObj);
    }
  }
}

module.exports = userController;
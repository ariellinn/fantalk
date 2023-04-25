//Middleware functions handling verifying user (login)
//handle user account creation
const db = require('../models/fanTalkModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { name, password, event_code } = req.body;
  try {
    //get event_id from event_code
    let params = [`${event_code}`];
    let text = 'SELECT event_id FROM eventcode WHERE code = $1'
    const event_id = await db.query(text, params);
    if (event_id.rows.length === 0) {
      return res.status(400).json('Invalid event code. Unable to create account');
    } else {
      const hash = bcrypt(password, 10);
      params = [`${name}`, `${hash}`, `${event_id.rows[0].event_id}`];
      text = 'INSERT INTO user (name, password, event_id) VALUES ($1, $2, $3) RETURNING *';
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


module.exports = userController;
//Middleware functions
//handling creating a session cookie if user is created or logged in and adding to the database
//handling if checking if there's a session cookie and if it's verified then log the user in, else delete that session cookie
const db = require('../models/fanTalkModel');

const sessionController = {};

sessionController.createSessionCookieAndStartSession = async (req, res, next) => {
  try {
    if (res.locals.user) {
      let text = 'INSERT INTO session (cookie) VALUES ' + res.locals.user._id;
      await db.query(text);
      res.cookie('ssid', res.locals.user._id, { httpOnly: true });
      return next();
    }
  } catch (err) {
    const errObj = {
      log: 'cookieController.createSessionCookieAndStartSession could not read DB' + err,
      status: 500,
      message: { err: `An error occurred when creating session` }
    };
    return next(errObj);
  }

}


sessionController.isLoggedIn = async (req, res, next) => {
  // write code here
  const params = [`${req.cookies.ssid}`];
  try {
    const text = 'SELECT '
    const data = await db.query(text, params);
    if (data.rows.length === 0) {
      //no ssid session was found. Delete that ssid cookie

    } else {
      //
    }
    return next();
  } catch (err) {
    const errObj = {
      log: 'cookieController.createSessionCookie could not read DB' + err,
      status: 500,
      message: { err: `An error occurred` }
    };
    return next(errObj);
  }
};

exports.module = sessionController;
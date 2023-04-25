//Middleware functions
//handling creating a session cookie if user is created or logged in and adding to the database
//handling if checking if there's a session cookie and if it's verified then log the user in, else delete that session cookie
const db = require('../models/fanTalkModel');

const sessionController = {};

sessionController.createSessionCookieAndStartSession = async (req, res, next) => {
  try {
    if (res.locals.user) {
      const ssid = res.locals.user._id;
      let params = [`${ssid}`]
      let text = 'INSERT INTO eventsession (cookie) VALUES ($1)';
      await db.query(text, params);
      res.cookie('ssid', ssid, { httpOnly: true });
      return next();
    }
    return next();
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
  if (Object.hasOwn(req.cookies, ssid)) {
    try {
      const params = [`${req.cookies.ssid}`];
      const text = 'SELECT * FROM eventuser WHERE _id = $1'
      const data = await db.query(text, params);
      if (data.rows.length === 0) {
        return res.status(200).json(false);
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
  }
  return res.status(200).json(false);
}


sessionController.isAllowed = async (req, res, next) => {
  // write code here
  const params = [`${req.cookies.ssid}`];
  try {
    const text = 'SELECT * FROM eventuser WHERE _id = $1'
    const data = await db.query(text, params);
    if (data.rows.length === 0) {
      return res.redirect(307, '/signup').send('Invalid Credentials');
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

module.exports = sessionController;
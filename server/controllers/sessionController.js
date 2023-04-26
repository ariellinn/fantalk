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
      log: 'sessionController.createSessionCookieAndStartSession could not read DB' + err,
      status: 500,
      message: { err: `An error occurred when creating session` }
    };
    return next(errObj);
  }

}

sessionController.isLoggedIn = async (req, res, next) => {
  if (Object.hasOwn(req.cookies, 'ssid')) {
    console.log("Object has ssid cookie", req.cookies.ssid);
    try {
      const params = [`${req.cookies.ssid}`];
      const text = 'SELECT eventuser._id, eventuser.name, eventuser.event_id, eventuser.ishost FROM eventuser INNER JOIN eventsession ON eventuser._id = eventsession.cookie WHERE eventsession.cookie = $1';
      const data = await db.query(text, params);
      console.log("The data returned in rows", data.rows);
      if (data.rows.length === 0) {
        return res.status(200).json({ isLoggedIn: false });
      }
      const { _id, name, event_id, ishost } = data.rows[0];
      res.locals.user = {
        _id,
        name,
        event_id,
        ishost,
        isLoggedIn: true
      }
      return next();
    } catch (err) {
      const errObj = {
        log: 'sessionController.isLoggedIn could not read DB' + err,
        status: 500,
        message: { err: `An error occurred` }
      };
      return next(errObj);
    }
  }
  return res.status(200).json({ isLoggedIn: false });
}

//to check when accessing a route they shouldn't
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
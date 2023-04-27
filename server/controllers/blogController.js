//Middleware functions
//gets all the messages for the blog
//gets all the messages for the chat too
const db = require('../models/fanTalkModel');

const blogController = {};

blogController.getMessages = async (req, res, next) => {
  try {
    const { event_id } = res.locals.user;
    let params = [`${event_id}`]
    let text = 'SELECT _id, message, datetime FROM eventblog WHERE event_id = $1 ORDER BY datetime ASC';
    const data = await db.query(text, params);
    res.locals.user.messages = data.rows;
    return next();
  } catch (err) {
    const errObj = {
      log: 'blogController.getMessages could not read DB' + err,
      status: 500,
      message: { err: `An error occurred when getting the blog messages` }
    };
    return next(errObj);
  }
}

blogController.addMessage = async (req, res, next) => {
  try {
    const { event_id, fmessage } = req.body;
    let params = [`${event_id}`, `${fmessage}`]
    let text = 'INSERT INTO eventblog (event_id, datetime, message) VALUES ($1, NOW(), $2)';
    await db.query(text, params);
    return next();
  } catch (err) {
    const errObj = {
      log: 'blogController.addMessage could not read DB' + err,
      status: 500,
      message: { err: `An error occurred when adding message to blog` }
    };
    return next(errObj);
  }
}

blogController.editMessage = async (req, res, next) => {
  try {
    const { message_id, fmessage } = req.body;
    let params = [`${fmessage}`, `${message_id}`]
    let text = 'UPDATE eventblog SET message = $1 WHERE _id = $2';
    await db.query(text, params);
    return next();
  } catch (err) {
    const errObj = {
      log: 'blogController.addMessage could not read DB' + err,
      status: 500,
      message: { err: `An error occurred when adding message to blog` }
    };
    return next(errObj);
  }
}

blogController.deleteMessage = async (req, res, next) => {
  try {
    const { _id } = req.body;
    let params = [`${_id}`]
    let text = 'DELETE FROM eventblog WHERE _id = $1';
    await db.query(text, params);
    return next();
  } catch (err) {
    const errObj = {
      log: 'blogController.deleteMessage could not read DB' + err,
      status: 500,
      message: { err: `An error occurred when deleting message from blog` }
    };
    return next(errObj);
  }
}


module.exports = blogController;
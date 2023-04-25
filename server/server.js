const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();
//routers
//const Router = require('./routes/..);


/*
* Parsing request body
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
* Requests for static files
*/
app.use(express.static(path.resolve(__dirname, '../client')));

//Route handling


/*
* Catch-all route handler for unknown routes
*/
app.use((req, res) => res.status(404).send('Invalid page'));

/*
* Global error handler for middleware functions.
* If no err argument is give, it sends a generic default error message
*/
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middlware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/*
* Starting server
*/
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const app = express();

//const Router = require('./routes/..);
const signupRouter = require('./routes/signupRouter');

const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');

/*
* Parsing request body
*/
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

/*
* Requests for static files
*/
app.use('/build', express.static(path.join(__dirname, '../build')));
// app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
})

//Route handling
app.use('/signup', signupRouter);

app.post('/login', loginRouter);

//Checks if the user is already logged in
app.get('/isAuthorized', sessionController.isLoggedIn, (req, res) => {
  return res.status(200).json(true);
})


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
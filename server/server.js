const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const app = express();

//const Router = require('./routes/..);
const signupRouter = require('./routes/signupRouter');
const loginRouter = require('./routes/loginRouter');
const blogRouter = require('./routes/blogRouter');

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

/*
* Serve main page
*/
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
})

//Route handling
app.use('/api/signup', signupRouter);

app.use('/api/login', loginRouter);

app.use('/api/', blogRouter);

//Checks if the user is already logged in. Returns boolean true if yes, false otherwise
app.get('/api/isLoggedIn', sessionController.isLoggedIn, (req, res) => {
  return res.status(200).json(res.locals.user);
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
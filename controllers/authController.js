const tokenService = require('../services/tokenService.js');
const userModel = require('../models/user.js');

// - `receiveToken` - middleware takes the token from the `Authorization` header if present and puts it on the request
function receiveToken(req, res, next) {
  if (req.headers.authorization) {
    req.authToken = req.headers.authorization.replace(/^Bearer\s/, '');
  }
  next();
};

// - `restict` - middleware that uses `tokenService.verify` to check the token. If the token is valid, the user is permitted to access subsequent middleware. Otherwise, the user gets a 401 response
function restrict(req, res, next) {
  tokenService.verify(req.authToken)
    .then(data => {
      res.locals.user = data;
      next();
    })
    .catch(err => res.status(401).json({
      status: 'Error',
      message: 'Invalid credentials'
    }))
}

// - `register` - route handler that will create a new user using the User model and then creates a JWT for that user and sends it in response.
function register(req, res) {
  userModel.register(req.body)
    .catch(err => res.status(401).json({
      message: 'Username taken'
    }))
    .then(data => tokenService.createToken({
        email: data.email,
        id: data.id
    }))
    .then(token => {
      res.json({
        token
      })
    });
}

function login(req, res, next) {
  userModel.login(req.body)
    .catch(err => res.status(401).json({
      status: 'Error',
      message: 'Invalid credentials'
    }))
    .then(data => tokenService.createToken({
      id: data.id,
      email: data.email
    }))
    .then(token => {
      res.json({
        token
      })
    })
}

module.exports = {
  receiveToken,
  register,
  restrict,
  login
}

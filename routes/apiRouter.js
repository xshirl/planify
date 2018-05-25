const apiRouter = require('express').Router();

const authRouter = require('./authRouter');

apiRouter.use('/auth', authRouter);

module.exports = apiRouter;

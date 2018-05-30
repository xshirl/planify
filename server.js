const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const authController = require('./controllers/authController');
const authRouter = require('./routes/authRouter');
const apiRouter = require('./routes/apiRouter');
const boardRouter = require('./routes/boardRouter');
const listRouter = require('./routes/listRouter');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(authController.receiveToken);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use('/api/lists', listRouter);
app.use('/api/boards', boardRouter);
app.use('/api', apiRouter);

app.listen(PORT, ()=> {
  console.log(`Listening on port ${PORT}`);
})

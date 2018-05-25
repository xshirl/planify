const boardDb = require('../models/boards');

function getBoards(req, res, next) {
  boardDb.getBoards()
  .then(data => {
    res.locals.boards = data;
    next();
  })
  .catch(next);
}

function getUserBoards(req, res, next) {
  boardDb.getUserBoards(req.params.user_id)
  .then(data=> {
    res.locals.userBoards = data;
    next();
  })
  .catch(next);
}

function getOneBoard(req, res, next) {
  boardDb.getOneBoard(req.params.id)
  .then(data=> {
    res.locals.board = data;
    next();
  })
  .catch(next);
}

function createBoard(req, res, next) {
  boardDb.createBoard({
    ...req.body,
    user_id:res.locals.user && res.locals.user.id})
  .then(data=> {
    res.locals.createBoard = data;
    next();
  })
  .catch(next);
}

function updateBoard(req, res, next) {
  req.body.id = req.params.id;
  boardDb.updateBoard(req.body)
  .then(data => {
    res.locals.updateBoard = data;
    next();
  })
  .catch(next);
}

function deleteBoard(req, res, next) {
  boardDb.deleteBoard(req.params.id)
  .then(()=> {
    next()
  })
  .catch(next);
}

module.exports = {
  getBoards,
  getUserBoards,
  getOneBoard,
  createBoard,
  updateBoard,
  deleteBoard
}

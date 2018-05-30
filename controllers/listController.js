const listDb = require('../models/lists');

function getLists(req, res, next) {
  listDb.getLists()
  .then(data => {
    res.locals.lists = data;
    next();
  })
  .catch(next);
}

function getBoardLists(req, res, next) {
  listDb.getBoardLists(req.params.board_id)
  .then(data=> {
    res.locals.boardLists = data;
    next();
  })
  .catch(next);
}

function getOneList(req, res, next) {
  listDb.getOneList(req.params.id)
  .then(data=> {
    res.locals.list = data;
    next();
  })
  .catch(next);
}

function createList(req, res, next) {
  listDb.createList(req.body)
  .then(data=> {
    res.locals.createList = data;
    next();
  })
  .catch(next);
}


function updateList(req, res, next) {
  req.body.id = req.params.id;
  listDb.updateList(req.body)
  .then(data => {
    res.locals.updateList = data;
    next();
  })
  .catch(next);
}

function deleteList(req, res, next) {
  listDb.deleteList(req.params.id)
  .then(()=> {
    next()
  })
  .catch(next);
}

module.exports = {
  getLists,
  getBoardLists,
  getOneList,
  createList,
  updateList,
  deleteList
}

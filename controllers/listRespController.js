function getListsResponse(req, res) {
  res.json({
    status:'ok',
    data:res.locals.lists
  })
}

function getBoardListsResponse(req, res) {
  res.json({
    status:'ok',
    data:res.locals.boardLists
  })
}

function getOneListResponse(req, res) {
  res.json({
    status:'ok',
    data:res.locals.list
  })
}

function createListResponse(req, res) {
  res.json({
    status:'ok',
    data:res.locals.createList
  })
}

function updateListResponse(req, res) {
  res.json({
    status:'ok',
    data:res.locals.updateList
  })
}

function deleteListResponse(req, res) {
  res.json({
    status:'ok'
  })
}

function sendErrorResponse(err, req, res, next) {
  res.json({
    status: 'Error',
    message: err.message
  })
}

module.exports = {
  getListsResponse,
  getBoardListsResponse,
  getOneListResponse,
  createListResponse,
  updateListResponse,
  deleteListResponse,
  sendErrorResponse
}

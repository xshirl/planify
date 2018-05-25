function getBoardsResponse(req, res) {
  res.json({
    status:'ok',
    data:res.locals.boards
  })
}

function getUserBoardsResponse(req, res) {
  res.json({
    status:'ok',
    data:res.locals.userBoards
  })
}

function getOneBoardResponse(req, res) {
  res.json({
    status:'ok',
    data:res.locals.board
  })
}

function createBoardResponse(req, res) {
  res.json({
    status:'ok',
    data:res.locals.createBoard
  })
}

function updateBoardResponse(req, res) {
  res.json({
    status:'ok',
    data:res.locals.updateBoard
  })
}

function deleteBoardResponse(req, res) {
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
  getBoardsResponse,
  getUserBoardsResponse,
  getOneBoardResponse,
  createBoardResponse,
  updateBoardResponse,
  deleteBoardResponse,
  sendErrorResponse
}

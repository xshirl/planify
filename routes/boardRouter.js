const router = require('express').Router();

const boardController = require('../controllers/boardController');
const boardRespController = require('../controllers/boardRespController');
const authController = require('../controllers/authController');

router.route('/')
.get(
  boardController.getBoards,
  boardRespController.getBoardsResponse,
  boardRespController.sendErrorResponse
  )
.post(
  authController.restrict,
  boardController.createBoard,
  boardRespController.createBoardResponse,
  boardRespController.sendErrorResponse
  )

router.route('/:user_id')
  .get(
    boardController.getUserBoards,
    boardRespController.getUserBoardsResponse,
    boardRespController.sendErrorResponse
    )

router.route('/0/:id')
.get(
  boardController.getOneBoard,
  boardRespController.getOneBoardResponse,
  boardRespController.sendErrorResponse
  )
.put(
  boardController.updateBoard,
  boardRespController.updateBoardResponse,
  boardRespController.sendErrorResponse
  )
.delete(
  boardController.deleteBoard,
  boardRespController.deleteBoardResponse,
  boardRespController.sendErrorResponse
  )

module.exports = router;

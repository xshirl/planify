const router = require('express').Router();

const listController = require('../controllers/listController');
const listRespController = require('../controllers/listRespController');
const authController = require('../controllers/authController');

router.route('/')
.get(
  listController.getLists,
  listRespController.getListsResponse,
  listRespController.sendErrorResponse
  )
.post(
  authController.restrict,
  listController.createList,
  listRespController.createListResponse,
  listRespController.sendErrorResponse
  )

router.route('/:board_id')
  .get(
    listController.getBoardLists,
    listRespController.getBoardListsResponse,
    listRespController.sendErrorResponse
    )

router.route('/0/:id')
.get(
  listController.getOneList,
  listRespController.getOneListResponse,
  listRespController.sendErrorResponse
  )
.put(
  listController.updateList,
  listRespController.updateListResponse,
  listRespController.sendErrorResponse
  )
.delete(
  listController.deleteList,
  listRespController.deleteListResponse,
  listRespController.sendErrorResponse
  )

module.exports = router;

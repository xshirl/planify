const db = require('../config/connection');

function getBoards() {
  const query = db.any(`
    SELECT * FROM boards`);
  return query;
}

function getUserBoards(user_id) {
  const query = db.any(`
    SELECT * FROM boards
    WHERE user_id = $1`, user_id);
  return query;
}

function getOneBoard(id) {
  const query = db.one(`
    SELECT * FROM boards
    WHERE id = $1`, id);
  return query;
}

function createBoard(board) {
  const query = db.one(`
    INSERT INTO boards (name, user_id)
    VALUES (name = $/name/, user_id = $/user_id/)
    RETURNING *`, board);
  return query;
}

function deleteBoard(id) {
  const query = db.none(`
    DELETE FROM boards
    WHERE id = $1`, id)
  return query;
}

function updateBoard(board) {
  const query = db.one(`
    UPDATE boards
    SET name = $/name/, user_id = $/user_id/
    WHERE id = $/id/
    RETURNING *`, board);
  return query;
}

module.exports = {
  getBoards,
  getUserBoards,
  getOneBoard,
  createBoard,
  deleteBoard,
  updateBoard
}

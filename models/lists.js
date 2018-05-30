const db = require('../config/connection');

function getLists() {
  const query = db.any(`
    SELECT * FROM lists`);
  return query;
}

function getBoardLists(board_id) {
  const query = db.any(`
    SELECT * FROM lists
    WHERE board_id = $1`, board_id);
  return query;
}

function getOneList(id) {
  const query = db.one(`
    SELECT * FROM lists
    WHERE id = $1`, id);
  return query;
}

function createList(list) {
  const query = db.one(`
    INSERT INTO lists (name, board_id)
    VALUES ($/name/, $/board_id/)
    RETURNING *`, list);
  return query;
}

function deleteList(id) {
  const query = db.none(`
    DELETE FROM lists
    WHERE id = $1`, id)
  return query;
}

function updateList(list) {
  const query = db.one(`
    UPDATE lists
    SET name = $/name/, board_id = $/board_id/
    WHERE id = $/id/
    RETURNING *`, list);
  return query;
}

module.exports = {
  getLists,
  getBoardLists,
  getOneList,
  createList,
  deleteList,
  updateList
}

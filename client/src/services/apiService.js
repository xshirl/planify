import jwtDecode from 'jwt-decode';

function checkStatus(resp) {
  if (!resp.ok) throw new Error(resp.statusMessage);
  return resp.json();
}

function saveToken(respBody) {
  localStorage.setItem('authToken', respBody.token)
  const user = jwtDecode(respBody.token);
  return user;
}


// board requests

function getBoards() {
  return fetch('/api/boards').then(checkStatus);
}

function getUserBoards(user_id) {
  return fetch(`/api/boards/${user_id}`).then(checkStatus);
}

function createBoard(board) {
  return fetch('/api/boards', {
    method: 'POST',
    body: JSON.stringify(board),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus);
}

function deleteBoard(id) {
  return fetch(`/api/boards/0/${id}`, {
    method: 'DELETE',
  }).then(checkStatus)
}

function updateBoard(board, id) {
  return fetch(`/api/boards/0/${id}`, {
    method: 'PUT',
    body: JSON.stringify(board),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus)
}

// Auth requests

function login(creds) {

  return fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(creds),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus).then(saveToken)
}

function register(creds) {
  return fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(creds),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus).then(saveToken)
}


export {
  getBoards,
  getUserBoards,
  createBoard,
  deleteBoard,
  updateBoard,
  login,
  register
}

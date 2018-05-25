const user = require('../models/user');
const boards = require('../models/boards');

const userSeeds = [
  {email: 'xshirl@gmail.com', pw_digest: 'test', username: 'xs' },
  {email: 'xsir@gmail.com', pw_digest:'test2', username:'xsir'}
]

const boardSeeds = [
  {name: 'Project 1', user_id: 1},
  {name: 'Project 2', user_id: 2}
]

Promise.all(userSeeds.map(user.register))
    .then(users => {
        return Promise.all(boardSeeds.map((boardSeed, indx) => board.createBoard({
            ...boardSeed,
            user_id: users[indx % 2].id
        })))
    })
    .then(boards => console.log(boards))

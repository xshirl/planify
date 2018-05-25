const db = require('../config/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Take an email and password; hash the password and try to create and try to create a new user
function register(credentials) {
    console.log('im here')
    //First hash the password using bcrypt
    //hashing is turning input into a set of number, and same input will always have the same output of numbers
    return bcrypt.hash(credentials.pw_digest, saltRounds)
    .then(hash => {
        const newUser = {
            email: credentials.email,
            pw_digest: hash,
            username: credentials.username
        };
        return db.one(`
        INSERT INTO users (email, pw_digest, username)
        VALUES ($/email/, $/pw_digest/, $/username/)
        RETURNING *
        `, newUser)
    });
}

function findByEmail(email) {
      return db.one(`
        SELECT * FROM users
        WHERE email = $1
      `, email);
    }

function login(credentials) {
    console.log('login workin?')
    return findByEmail(credentials.email)
    .then(user => (
        // bcrypt using magic compares provided password with password digest
        bcrypt.compare(credentials.pw_digest, user.pw_digest)
        .then(match => {
            if (!match) throw new Error('Something is sketchy!, creds dont match!');
            delete user.pw_digest;
            return user;
        })
    ));
}

module.exports = {
    register,
    login
}

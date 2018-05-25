const pgp = require('pg-promise')(); //imports pg promise
const config = require('./dbConfig'); //imports config

const db = pgp(process.env.DATABASE_URL || config);

module.exports = db;

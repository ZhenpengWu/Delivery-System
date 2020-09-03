const pgp = require('pg-promise')();
const path = require('path');
const QueryFile = require('pg-promise').QueryFile;

const db = pgp(process.env.DB_URI);
const fullPath = path.join(__dirname, 'createTables.sql'); // generating full path;
const create = new QueryFile(fullPath, {
  minify: true
});

db
  .any(create)
  .then(() => console.log('SUCCESS: create tables.'))
  .catch(err => console.log('ERROR: create tables.\n', err));

module.exports = db;

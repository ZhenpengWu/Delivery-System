const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const db = require('../db/db');

const router = express.Router();

router.get('/', (req, res, next) => {
  db
    .tx(t => {
      const description = t.any('SELECT * FROM description;');
      return t.batch([description]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error => res.json(400, { error: 'Fail to list all descriptions' }));
});

router.get('/:descid', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const id = req.params.descid;
      const description = t.any('SELECT * FROM description WHERE id = $1;', [
        id
      ]);
      return t.batch([description]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      if (data[0].length === 0) throw 'Empty Array';
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, {
        error: 'Fail to get description info of ' + req.params.descid
      })
    );
});

router.post('/', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const text = req.body.text;
      const id = crypto.createHmac('md5', text).digest('hex');
      const description = t.one(
        'INSERT INTO description VALUES ($1, $2) RETURNING id;',
        [id, text]
      );
      return t.batch([description]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error => res.json(400, { error: 'Fail to insert new description' }));
});

router.delete('/:descid', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const id = req.params.descid;
      const description = t.one(
        'DELETE FROM description WHERE id = $1 RETURNING id;',
        [id]
      );
      return t.batch([description]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, {
        error: 'Fail to delete description ' + req.params.descid
      })
    );
});

module.exports = router;

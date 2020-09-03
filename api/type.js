const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const db = require('../db/db');

const router = express.Router();

router.get('/', (req, res) => {
  db
    .tx(t => {
      const type = t.any('SELECT * FROM type;');
      return t.batch([type]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error => res.json(400, { error: 'Fail to list all types' }));
});

router.post('/', bodyParser.json(), (req, res) => {
  db
    .tx(t => {
      const servicetype = req.body.servicetype;
      const category = req.body.category;
      const id = crypto
        .createHmac('md5', category)
        .update(servicetype)
        .digest('hex');
      const type = t.one('INSERT INTO type VALUES ($1, $2, $3) RETURNING id;', [
        id,
        servicetype,
        category
      ]);
      return t.batch([type]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error => res.json(400, { error: 'Fail to insert new type' }));
});

router.get('/:typeid', bodyParser.json(), (req, res) => {
  db
    .tx(t => {
      const id = req.params.typeid;
      const type = t.any('SELECT * FROM type WHERE id = $1;', [id]);
      return t.batch([type]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, { error: 'Fail to get type info of ' + req.params.typeid })
    );
});

router.delete('/:typeid', bodyParser.json(), (req, res) => {
  db
    .tx(t => {
      const id = req.params.typeid;
      const type = t.one('DELETE FROM type WHERE id = $1 RETURNING id;', [id]);
      return t.batch([type]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, { error: 'Fail to delete type ' + req.params.typeid })
    );
});

module.exports = router;

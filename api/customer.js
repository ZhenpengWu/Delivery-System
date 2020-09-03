const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const db = require('../db/db');

const router = express.Router();

router.get('/', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const query = t.any('SELECT * FROM customer');
      return t.batch([query]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error => res.json(400, { error: 'Fail to list all customers' }));
});

router.get('/giver', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const query = t.any(
        'SELECT * FROM customer C WHERE NOT EXISTS ' +
          '(SELECT * FROM customer C2 WHERE C.customerid <> C2.customerid AND NOT EXISTS ' +
          '(SELECT * FROM package P WHERE P.senderid = C.customerid AND P.receiverid = C2.customerid));'
      );
      return t.batch([query]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error => res.json(400, { error: 'Fail to find giver' }));
});

router.post('/', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const name = req.body.name;
      const address = req.body.address;
      const phone = req.body.phone;
      const customerid = crypto
        .createHmac('md5', name)
        .update(phone)
        .update(address)
        .digest('hex');
      const customer = t.one(
        'INSERT INTO customer (customerid, name, address, phone) VALUES ($1, $2, $3, $4) RETURNING customerid;',
        [customerid, name, address, phone]
      );
      return t.batch([customer]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error => res.json(400, { error: 'Fail to insert new customer' }));
});

router.get('/:cid', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const cid = req.params.cid;
      const customer = t.any('SELECT * FROM customer WHERE customerid = $1;', [
        cid
      ]);
      return t.batch([customer]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      if (data[0].length === 0) throw 'Empty Array';
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, { error: 'Fail to get customer inf of ' + req.params.cid })
    );
});

router.delete('/:cid', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const cid = req.params.cid;
      const customer = t.one(
        'DELETE FROM customer WHERE customerid = $1 RETURNING customerid;',
        [cid]
      );
      return t.batch([customer]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, { error: 'Fail to delete customer ' + req.params.cid })
    );
});

router.put('/:cid', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const cid = req.params.cid;
      let query = 'UPDATE customer SET';
      let count = 0;
      if (req.body.name != null) {
        query += " name = '" + req.body.name + "'";
        count++;
      }
      if (req.body.address != null) {
        if (count > 0) query += ',';
        query += " address = '" + req.body.address + "'";
        count++;
      }
      if (req.body.phone != null) {
        if (count > 0) query += ',';
        query += " phone = '" + req.body.phone + "'";
      }
      query += ' WHERE customerid = $1 RETURNING customerid;';
      const customer = t.one(query, [cid]);
      return t.batch([customer]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, { error: 'Fail to update customer ' + req.params.cid })
    );
});

module.exports = router;

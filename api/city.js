const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const db = require('../db/db');

const router = express.Router();

router.get('/', (req, res) => {
  db
    .tx(t => {
      const city = t.any('SELECT * FROM city;');
      return t.batch([city]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error => res.json(400, { error: 'Fail to list all cities' }));
});

router.post('/', bodyParser.json(), (req, res) => {
  db
    .tx(t => {
      const country = req.body.country;
      const province = req.body.province;
      const cityname = req.body.cityname;
      const cityid = crypto
        .createHmac('md5', cityname)
        .update(country)
        .update(province)
        .digest('hex');
      const city = t.one(
        'INSERT INTO city VALUES ($1, $2, $3, $4) RETURNING cityid;',
        [cityid, country, province, cityname]
      );
      return t.batch([city]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error => res.status(400).json({ error: 'Fail to insert new city' }));
});

router.get('/:cityid', bodyParser.json(), (req, res) => {
  db
    .tx(t => {
      const cityid = req.params.cityid;
      const city = t.any('SELECT * FROM city WHERE cityid = $1;', [cityid]);
      return t.batch([city]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      if (data[0].length === 0) throw 'Empty Array';
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, { error: `Fail to get city info of ${req.params.cityid}` })
    );
});

router.delete('/:cityid', bodyParser.json(), (req, res) => {
  db
    .tx(t => {
      const cityid = req.params.cityid;
      const city = t.one(
        'DELETE FROM city WHERE cityid = $1 RETURNING cityid;',
        [cityid]
      );
      return t.batch([city]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, { error: `Fail to delete city ${req.params.cityid}` })
    );
});

module.exports = router;

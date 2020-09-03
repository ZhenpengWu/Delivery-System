const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/db');

const router = express.Router();

router.get('/:trackingnumber', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const trackingnumber = req.params.trackingnumber;
      const status = t.any(
        'SELECT trackingnumber, timestamp, cityname, province, country, text AS description ' +
          'FROM status S, description D, city C ' +
          'WHERE S.trackingnumber = $1 AND S.descriptionid = D.id AND S.cityid = C.cityid ' +
          'ORDER BY timestamp DESC',
        [trackingnumber]
      );
      return t.batch([status]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, {
        error: 'Fail to get status of ' + req.params.trackingnumber
      })
    );
});

router.post('/', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const trackingnumber = req.body.trackingnumber;
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      let dateTime =
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second;
      const timestamp = dateTime;
      const descriptionid = req.body.descriptionid;
      const cityid = req.body.cityid;
      const status = t.one(
        'INSERT INTO status VALUES ($1, $2, $3, $4) RETURNING trackingnumber;',
        [trackingnumber, timestamp, descriptionid, cityid]
      );
      return t.batch([status]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, {
        error: 'Fail to insert new status of ' + req.body.trackingnumber
      })
    );
});

router.delete('/', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const trackingnumber = req.body.trackingnumber;
      const timestamp = req.body.timestamp;
      const status = t.one(
        'DELETE FROM status WHERE trackingnumber = $1 AND timestamp = $2 RETURNING trackingnumber;',
        [trackingnumber, timestamp]
      );
      return t.batch([status]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, {
        error:
          'Fail to delete ' + req.body.trackingnumber + ' ' + req.body.timestamp
      })
    );
});

module.exports = router;

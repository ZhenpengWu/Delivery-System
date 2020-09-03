const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const db = require('../db/db');

const router = express.Router();

router.post('/filter', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      let query =
        'SELECT TrackingNumber, Weight, CONCAT(category, servicetype) AS Type, SignatureRequired, SenderID, ReceiverID ' +
        'FROM Package P, Type T ' +
        'WHERE P.TypeID = T.id';
      if (req.body.trackingnumber != null)
        query += " AND trackingnumber = '" + req.body.trackingnumber + "'";
      if (req.body.sidfilter != null)
        query += " AND SenderID = '" + req.body.sidfilter + "'";
      if (req.body.ridfilter != null)
        query += " AND ReceiverID = '" + req.body.ridfilter + "'";
      if (req.body.typefilter != null)
        query += " AND TypeID = '" + req.body.typefilter + "'";
      if (req.body.signaturefilter != null)
        query += " AND SignatureRequired = '" + req.body.signaturefilter + "'";
      req.body.sortby != null
        ? (query += ' ORDER BY ' + req.body.sortby)
        : (query += ' ORDER BY TrackingNumber');
      req.body.sortorder != null
        ? (query += ' ' + req.body.sortorder)
        : (query += ' DESC');
      query += ';';
      const pkg = t.any(query);
      return t.batch([pkg]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, { error: 'Fail to list package with this filter' })
    );
});

router.get('/statuses/:trackingnumber', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const trackingnumber = req.params.trackingnumber;
      const pkg = t.any(
        'SELECT P.TrackingNumber, Weight, CONCAT(category, servicetype) AS Type, SignatureRequired, ' +
          'SenderID, ReceiverID, TimeStamp, CONCAT(cityname, province, country), text AS Description ' +
          'FROM package P, type T, status S, city C, description D ' +
          'WHERE P.typeid = T.id ' +
          'AND P.trackingnumber = $1 ' +
          'AND P.trackingnumber = S.trackingnumber ' +
          'AND S.cityid = C.cityid AND S.descriptionid = D.id ' +
          'ORDER BY timestamp DESC;',
        [trackingnumber]
      );
      return t.batch([pkg]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, {
        error: 'Fail to list status of package ' + req.params.trackingnumber
      })
    );
});

// Aggregate on weight of all packages, count gets total number of packages
router.get(
  '/aggweights/:aggregationop',
  bodyParser.json(),
  (req, res, next) => {
    db
      .tx(t => {
        let query = 'SELECT ';
        const aggOp = req.params.aggregationop;
        query += aggOp;
        query += '(weight) FROM package';
        const pkg = t.any(query);
        return t.batch([pkg]);
      })
      .then(data => {
        data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
        res.json(data[0]);
      })
      .catch(error =>
        res.json(400, {
          error: 'Fail to Find aggregation for weights of all packages'
        })
      );
  }
);

router.post('/avgsweight', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const aggOp = req.body.aggOp;
      const groupBy = req.body.groupBy;
      let grouptext = null;
      let aggtext = null;
      groupBy == 'senderid' ? (grouptext = 'sent') : (grouptext = 'received');
      aggOp.toLowerCase == 'max'
        ? (aggtext = 'max_of_')
        : (aggtext = 'min_of_');
      const query =
        'SELECT ' +
        aggOp +
        '(avg) AS ' +
        aggtext +
        'average_weight_of_packages_' +
        grouptext +
        ' FROM (SELECT ' +
        groupBy +
        ', AVG(weight) FROM package GROUP BY ' +
        groupBy +
        ') X;';
      const pkg = t.any(query);
      return t.batch([pkg]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, {
        error:
          'Fail to get MAX/MIN average weight of packages Grouped by sender / receiver'
      })
    );
});

router.post('/', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const weight = req.body.weight;
      const typeid = req.body.typeid;
      const signaturerequired = req.body.signaturerequired;
      const sid = req.body.sid;
      const rid = req.body.rid;
      const trackingnumber = crypto
        .createHmac('md5', sid)
        .update(rid)
        .update(typeid)
        .digest('hex');
      const pkg = t.one(
        'INSERT INTO package VALUES ($1, $2, $3, $4, $5, $6) RETURNING trackingnumber;',
        [trackingnumber, weight, typeid, signaturerequired, sid, rid]
      );
      return t.batch([pkg]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error => res.json(400, { error: 'Fail to insert new package' }));
});

router.delete('/:trackingnumber', bodyParser.json(), (req, res, next) => {
  db
    .tx(t => {
      const trackingnumber = req.params.trackingnumber;
      const pkg = t.one(
        'DELETE FROM package WHERE trackingnumber = $1 RETURNING trackingnumber;',
        [trackingnumber]
      );
      return t.batch([pkg]);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g, '"')); // trim the obj
      res.json(data[0]);
    })
    .catch(error =>
      res.json(400, {
        error: 'Fail to delete package ' + req.params.trackingnumber
      })
    );
});

module.exports = router;

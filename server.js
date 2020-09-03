require('dotenv').config({
  silent: true
});

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const api = require('./api/index');

require('./db/db');

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use('/api', api);
app.use(morgan('dev'));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
});

app.listen(port, () => console.log(`api running on port ${port}`));

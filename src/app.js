const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.use('/', routes);

module.exports = app;
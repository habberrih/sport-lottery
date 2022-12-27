const express = require('express');
const path = require('path');
const app = express();

const defualtDirect = path.join(__dirname, '..', 'public');

app.use(express.json());

app.use('/lottery', express.static(defualtDirect));

module.exports = app;

var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');

var Database = require('./db/database');
var routes = require('./routes/controller');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

// Routes
app.use('/', routes);

app.listen(3000, function () {
    console.log("Starting at port 3000...");
});

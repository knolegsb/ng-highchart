require('rootpath')();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const jwt = require('helpers/jwt');
const errorHandler = require('helpers/error-handler');

//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(cors);
//app.use(jwt());
//app.use('/users', require('./users/users.controller'));

app.use(errorHandler);

const fs = require('fs');
let rawdata = fs.readFileSync('apple.json');
let appledata = JSON.parse(rawdata);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var XLSX = require('xlsx')
var workbook = XLSX.readFile('GOOG.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
// console.log(xlData);
// console.log(appledata);

app.get('/', function(req, res) {
    res.json(appledata);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
})
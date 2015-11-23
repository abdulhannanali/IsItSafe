var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var colors = require("colors");

var URL = require("url-parse");
var cors = require("cors");

var keys = require("./keys");

var PornSite = require("./pornSiteModel");


var app = express();

mongoose.connect(keys.MONGO_DB_CONNECTION_URI, function() {
  console.log("Connection with MONGODB established" .green);
})


app.use(morgan("dev", {}));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (req.body.url && req.body.url.trim() != "") {
    console.log(req.body.url);
    var url = new URL(req.body.url);
    var hostname = url.hostname.charAt(0).toUpperCase() + url.hostname.slice(1);
    PornSite.findOne({site: hostname}, function (err, pornSite) {
      if (err) {
        return next(err);
      }
      if (pornSite) {
        res.json(pornSite);
      }
      else {
        next();
      }
    })
  }
  else {
    next();
  }
})

app.use(function(req, res, next) {
  res.status(404);
  res.json({
    "Error": "404",
    "Message": "NOT FOUND!"
  });
})

app.use(function(req, res, next, err) {
  res.status(500);
  res.json({
    "Error": "500",
    "Message": "Error Occured!"
  })
})


app.listen(3000, function() {
  console.log("Server is listening at port 3000");
})

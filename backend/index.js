const express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var cors = require("cors");

const port = 9000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, function() {
  console.log("Server is running on " + port + " port");
});

app.post("/", function(req, res) {
  var page = req.body.page;
  requestGet(`https://reqres.in/api/users?page=${page}`, res);
});

app.post("/user", function(req, res) {
  var userId = req.body.userId;
  requestGet(`https://reqres.in/api/users/${userId}`, res);
});

function requestGet(url, res) {
  request({ url: url, json: true }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(body);
    } else {
      res.json({ error: "Falló la consulta" });
    }
  });
}

var express = require("express");
var connection = require("../models/index");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("main/landing", { title: "Coral-Webform" });
});

router.get("/success", function(req, res, next) {
  res.render("main/success", { title: "Coral-Webform" });
});

router.get("/data", function(req, res, next) {
  connection.query("SELECT * FROM userData", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ error: true });
    } else {
      // console.log(">>RowData", result);
      var inString = JSON.stringify(result);
      // console.log(">> string: ", inString);
      var inJson = JSON.parse(inString);
      // console.log(">> json: ", inJson);
      // console.log(">> user.name: ", inJson[0].userName);
      res.render("main/data", { results: inJson, title: "Coral-Webform" });
    }
  });
});

router.get("/delete", function(req, res, next) {
  connection.query("SELECT * FROM userData", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ error: true });
    } else {
      // console.log(">>RowData", result);
      var inString = JSON.stringify(result);
      // console.log(">> string: ", inString);
      var inJson = JSON.parse(inString);
      // console.log(">> json: ", inJson);
      // console.log(">> user.name: ", inJson[0].userName);
      res.render("main/delete", { results: inJson, title: "Coral-Webform" });
    }
  });
});

router.post("/data", function(req, res, next) {
  console.log(req.body);
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phoneNo;
  var password = req.body.password;
  console.log(name + " " + email + " " + phone + " " + password);
  connection.query(
    "Insert into userData (userName, emailId, phoneNo, password) VALUES ('" +
      name +
      "','" +
      email +
      "','" +
      phone +
      "','" +
      password +
      "')",
    function(err, result, fields) {
      if (err) {
        console.log(err); // some error occured
      } else {
        console.log("successfully inserted in database"); // successfully inserted into db
        res.redirect("/success");
      }
    }
  );
});

module.exports = router;

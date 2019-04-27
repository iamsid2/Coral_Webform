var express = require("express");
var router = express.Router();
var connection = require("../models/index");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/edit", function(req, res, next) {
  res.render("main/edit", { title: "Coral-Webform" });
});

router.get("/successEdit", function(req, res, next) {
  res.render("main/sucEdit", { title: "Coral-Webform" });
});

router.post("/edit", function(req, res, next) {
  console.log(req.body);
  var name = req.body.namee;
  var email = req.body.emaile;
  var phone = req.body.phoneNoe;
  var password = req.body.passworde;
  var reqemail = "";
  connection.query("SELECT * FROM userData", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ error: true });
    } else {
      // console.log(">>RowData", result);
      var inString = JSON.stringify(result);
      // console.log(">> string: ", inString);
      var udata = JSON.parse(inString);
      console.log(udata);
      var f = udata.find(el => el.emailId === email);
      reqemail = f["emailId"];
    }
  });
  var mysql =
    "UPDATE userData SET userName = '" +
    name +
    "', phoneNo = '" +
    phone +
    "', password = '" +
    password +
    "' WHERE emailId = '" +
    email +
    "' ";
  connection.query(mysql, function(err, result) {
    if (err) throw err;
    console.log(" record(s) updated");
    // res.send("Updated Successfully");
    res.redirect("/users/successEdit");
  });
});

module.exports = router;

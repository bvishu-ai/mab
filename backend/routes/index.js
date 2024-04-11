var express = require("express");
const pool = require("./pool");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// list of doctors
router.get("/doctors/getalldoctors", function (req, res, next) {
  pool.query(`SELECT * FROM doctors`, (error, results) => {
    if (error) {
      res.status(404).send(error.message);
    } else {
      res.status(200).json(results.rows);
    }
  });
});

// Create an appointment

router.post("/appointment/bookappointment", function (req, res, next) {
  var data = req.body;
  console.log(data);
  pool.query(
    `SELECT * FROM patients where user_name='${data.user_id}'`,
    (error, results) => {
      if (error) {
        res.status(404).send(error.message);
      } else {
        console.log(results.rows);
        data["age"] = results.rows[0].age;
        data["gender"] = results.rows[0].gender;
        console.log(data);
        res.status(200).json("Booked");
      }
    }
  );
});

// Send list of appointments for a patient

// Send list of appointments for a doctor

module.exports = router;

var express = require("express");
var router = express.Router();

var pool = require("./pool");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/doctors", function (req, res) {
  const { department, procedureType } = req.body;

  pool.query(
    `SELECT doctorname FROM availableslots WHERE department=$1 AND proceduretype=$2`,
    [department, procedureType],
    (error, result) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
      } else {
        if (result.rows.length === 0) {
          res.status(404).send("No doctors found for the selected criteria");
        } else {
          const doctorNames = result.rows.map(row => row.doctorname);
          res.send(doctorNames);
        }
      }
    }
  );
});

router.post("/time", function (req, res) {
  const { doctorName } = req.body;

  pool.query(
    `SELECT timeslot FROM availableslots WHERE doctorname=$1`,
    [doctorName],
    (error, result) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
      } else {
        if (result.rows.length === 0) {
          res.status(404).send("No available time slots for the selected doctor");
        } else {
          const timeSlots = result.rows.map(row => row.timeslot);
          res.send(timeSlots);
        }
      }
    }
  );
});

router.post("/depts", function (req, res) {

  pool.query(
    `SELECT (UNIQUE)departmentname FROM doctors`,
    (error, result) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
      } else {
        if (result.rows.length === 0) {
          res.status(404).send("No available time slots for the selected doctor");
        } else {
          const departs = result.rows.map(row => row.departmentname);
          res.send(deptarts);
        }
      }
    }
  );
});

module.exports = router;

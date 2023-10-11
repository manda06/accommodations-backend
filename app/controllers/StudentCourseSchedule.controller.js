const db = require("../models");
const StudentCourseSchedule = db.StudentCourseSchedule;
const Op = db.Sequelize.Op;
// Create and Save a new Student Course Schedule
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Student Course Schedule
  const StudentCourseSchedule = {
    id: req.body.id,
    courseid: req.body.courseid,
    studentid: req.body.studentid,
  };
  // Save Student Course Schedule in the database
  StudentCourseSchedule.create(StudentCourseSchedule)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student Course Schedule.",
      });
    });
};
// Retrieve all Student Course Schedule from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  StudentCourseSchedule.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Student Course Schedule.",
      });
    });
};

// Find a single Student Course Schedule with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentCourseSchedule.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student Course Schedule with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Student Course Schedule with id=" + id,
      });
    });
};
// Update a Student Course Schedule by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  StudentCourseSchedule.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student Course Schedule was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Student Course Schedule with id=${id}. Maybe Student Course Schedule was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Student Course Schedule with id=" + id,
      });
    });
};
// Delete a Student Course Schedule with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentCourseSchedule.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student Course Schedule was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Student Course Schedule with id=${id}. Maybe Student Course Schedule was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Student Course Schedule with id=" + id,
      });
    });
};
// Delete all Student Course Schedule from the database.
exports.deleteAll = (req, res) => {
  StudentCourseSchedule.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Student Course Schedule were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Student Course Schedule.",
      });
    });
};

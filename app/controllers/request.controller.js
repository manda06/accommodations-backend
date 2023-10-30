const db = require("../models");
const Request = db.request;
const Op = db.Sequelize.Op;
// Create and Save a new Requests
exports.create = (req, res) => {
  // Validate request
  if (!req.body.studentId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Request
  const request = {
    requestId: req.params.requestId,
    studentId: req.params.studentId,
    status: req.body.description,
    semester: req.body.semester,
    accommCat: req.body.accommCat,
    grievances: req.body.grievances
  };
  // Save Request in the database
  Request.create(request)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Request.",
      });
    });
};
// Retrieve all Requests from the database.
exports.findAll = (req, res) => {
  const requestId = req.query.requestId;
  var condition = requestId
    ? {
        RequestId: {
          [Op.like]: `%${requestId}%`,
        },
      }
    : null;

  Request.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving requests.",
      });
    });
};
// Retrieve all Requests for a Student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  Request.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving requests.",
      });
    });
};
// Find a single Request with an id
exports.findOne = (req, res) => {
  //const id = req.params.id;
  Request.findByPk(requestId)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Request with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Request with id=" + id,
      });
    });
};
// Update a Lesson by the id in the request
exports.update = (req, res) => {
  //const id = req.params.id;
  Requests.update(req.body, {
    where: { requestId: requestId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Request was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Lesson with id=${id}. Maybe Request was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Request with id=" + id,
      });
    });
};
// Delete a Request with the specified id in the request
exports.delete = (req, res) => {
  //const id = req.params.id;
  Request.destroy({
    where: { requestId: requestId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lesson was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Lesson with id=${id}. Maybe Lesson was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Request with id=" + id,
      });
    });
};
// Delete all Lessons from the database.
exports.deleteAll = (req, res) => {
  Request.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Request were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all requests.",
      });
    });
};

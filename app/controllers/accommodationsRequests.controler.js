const db = require("../models");
const AccommodationsRequests = db.accommodationRequests;
const Requests = db.request;
const Op = db.Sequelize.Op;
// Create and Save a new AccommodationsRequests
exports.create = (req, res) => {
  // Validate request
  if (!req.body.requestId) {
    res.status(400).send({
      message: "Content can not be empty! Request ID" + req.body.requestId,
    });
    return;
  }
  // Create a AccommodationsRequests
  const accommodationRequests = {
    requestId: req.body.requestId,
    accommodationId: req.body.accommodationId,
  };
  // Save AccommodationsRequests in the database
  AccommodationsRequests.create(accommodationRequests)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the AccommodationsRequests.",
      });
    });
};
// Retrieve all AccommodationsRequests from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  AccommodationsRequests.findAll({ where: condition }, {include: Requests})
  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving accommodationRequestss.",
      });
    });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  AccommodationsRequests.findByPk(id, {include: Requests})
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find AccommodationsRequests with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving AccommodationsRequests with id=" + id,
      });
    });
};
// Update a AccommodationsRequests by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  AccommodationsRequests.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "AccommodationsRequests was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update AccommodationsRequests with id=${id}. Maybe AccommodationsRequests was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating AccommodationsRequests with id=" + id,
      });
    });
};
// Delete a AccommodationsRequests with the specified id in the request
exports.delete = (req, res) => {
  const requestId = req.params.requestId;
  const accommodationId = req.params.accommodationId
  AccommodationsRequests.destroy({
    where: { requestId:requestId, accommodationId:accommodationId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "AccommodationsRequests was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete AccommodationsRequests with id=${id}. Maybe AccommodationsRequests was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete AccommodationsRequests with id=" + id,
      });
    });
};
// Delete all AccommodationsRequests from the database.
exports.deleteAll = (req, res) => {
    AccommodationsRequests.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} AccommodationsRequests were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all AccommodationsRequests.",
      });
    });
};

exports.findAllForRequest = (req, res) => {
    const requestId = req.params.requestId;
  
    AccommodationsRequests.findAll({ where: { requestId: requestId } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving AccommodationsRequests.",
        });
      });
  };
  
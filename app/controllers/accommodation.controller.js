const db = require("../models");
const Accommodation = db.accommodation;
const Op = db.Sequelize.Op;
// Create and Save a new Accommodation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Accommodation
  const accommodation = {
    request: req.body.request,
    studentID: req.body.studentID,
    approvedBy: req.body.approvedBy,
  };
  // Save Accommodation in the database
  Accommodation.create(accommodation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Accommodation.",
      });
    });
};
// Retrieve all Accommodation from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  Accommodation.findAll({ where: condition })
  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving accommodations.",
      });
    });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Accommodation.findByPk(id, {include: Request})
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Accommodation with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Accommodation with id=" + id,
      });
    });
};
// Update a Accommodation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Accommodation.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Accommodation was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Accommodation with id=${id}. Maybe Accommodation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Accommodation with id=" + id,
      });
    });
};
// Delete a Accommodation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Accommodation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Accommodation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Accommodation with id=${id}. Maybe Accommodation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Accommodation with id=" + id,
      });
    });
};
// Delete all Accommodation from the database.
exports.deleteAll = (req, res) => {
    Accommodation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Accommodation were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Accommodation.",
      });
    });
};
exports.findAllForCategory = (req, res) => {
  const category = req.params.category;

  Accommodation.findAll({ where: { category: category } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Accommodation.",
      });
    });
};
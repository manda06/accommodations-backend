const db = require("../models");
const Semester = db.semester;
const Op = db.Sequelize.Op;
// Create and Save a new Semester
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Lesson
  const semester = {
    id: req.params.id,
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    courseId: req.body.courseId,
  };
  // Save Lesson in the database
  Semester.create(semester)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Semester.",
      });
    });
};
// Retrieve all Lessons from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id
    ? {
        id: {
          [Op.like]: `%${id}%`,
        },
      }
    : null;

  Semester.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lessons.",
      });
    });
};
// Retrieve all semester for a course from the database.
exports.findAllForSemester = (req, res) => {
  const id = req.params.id;

 Semester.findAll({ where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving semseter.",
      });
    });
};
// Find a single semester with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
 Semester.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find semester with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving semester with id=" + id,
      });
    });
};
// Update a semster by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
 Semester.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Semester was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Lesson with id=${id}. Maybe Semester was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Lesson with id=" + id,
      });
    });
};
// Delete a Lesson with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Semester.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "semester was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Lesson with id=${id}. Maybe Lesson was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Semester with id=" + id,
      });
    });
};
// Delete all Lessons from the database.
exports.deleteAll = (req, res) => {
  Semester.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Semesters were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all semesters.",
      });
    });
};
// Find all published semesters
// exports.findAllPublished = (req, res) => {
//   const lessonId = req.query.semesterId;

//  Semester.findAll({ where: { published: true } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving lessons.",
//     });
//   });
//};

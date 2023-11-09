const db = require("../models");
const Request = db.request;
const Op = db.Sequelize.Op;
const nodemailer = require('nodemailer');
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
    studentId: req.body.studentId,
    status: req.body.status,
    semester: req.body.semester,
    category: req.body.category,
    grievances: req.body.grievances,
    comments: req.body.comments
    
  };
  // Save Request in the database
  Request.create(request)
    .then((data) => {
      sendRequestEmail(data);
      res.send(data); 
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Request.",
      });
    });
};
//send email
sendRequestEmail = () => {

    let messageOptions = {
    from:'nicole.bass@eagles.oc.edu',
    to: 'nicolebass2001@gmail.com',
    subject:'Accommodations Request Form',
    text: 'There is a new student Request.'
  }
  
  transporter.sendMail(messageOptions, function(err,info){
    if(err){
        throw err
    }else {
        console.log('Successfully sent.')
    }
  })
  
  };
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nicole.bass@eagles.oc.edu',
      pass: 'kdib jucp faqf ulab'
    }
  })

  exports.getstudentId = (req, res) => {
    Student.findAll({ where: {userId : req.params.studentId}})
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Student with id=${req.params.studentId}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving people.",
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
  const id = req.params.id;
  Request.findByPk(id)
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
        message: err.message || "Error retrieving Request with id=" + id,
      });
    });
};
// Update a Lesson by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  Request.update(req.body, {
    where: { id: id },
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

  const requestId = req.params.requestId;
  Request.destroy({
    where: { requestId: id },
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

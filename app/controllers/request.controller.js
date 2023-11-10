const db = require("../models");
const Request = db.request;
const Accommodation = db.accommodation;
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

  var textBody = "<p>Thank you for submitting your request for accommodations. We require supporting documentation to fulfill your request.<br> Documentation must be from an appropriate, qualified professional who has seen you within the past 18 months and must contain the following information: <br><br> You are a person with a disability. <br>The diagnosis (what is the disability?) <br>Information about the necessary classroom accommodations you will need to successfully complete the semester. <br>There must be a nexus between the disability and the accommodations requested.<br> Name and credentials (license #, etc.) of the diagnostic clinician. <br><br> Documentation may be emailed to me, but it must be on official letterhead. If your doctor’s office is unwilling to email me (this is the most likely scenario), they may mail the document to you. Then, scan and email it to me. <br><br> Once the information is submitted, we will schedule a time to meet to discuss the details (in person or via video conference). After our meeting, I will email your professors your specific ADA academic accommodations letter. Accommodations MUST BE RENEWED EACH SEMESTER. <br><br> Please let me know if you have any other questions or concerns. I look forward to hearing from you.</p>"

    let studentEmail = {
    from:'nicole.bass@eagles.oc.edu',
    to: 'nathan.curnutt@eagles.oc.edu',
    subject:'Accommodations Request Form',
    html: textBody
  }

  let adminEmail = {
    from:'nicole.bass@eagles.oc.edu',
    to: 'nicolebass2001@gmail.com',
    subject:'Accommodations Request Form',
    text: 'There is a new student Request.',
  }

  transporter.sendMail(adminEmail, function(err,info){
    if(err){
        throw err
    }else {
        console.log('Successfully sent.')
    }
  })
  
  transporter.sendMail(studentEmail, function(err,info){
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

  Request.findAll({ where: condition }, {include: Accommodation})
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
  Request.findByPk(id, {include: Accommodation})
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

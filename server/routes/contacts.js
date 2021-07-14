var express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');
var router = express.Router();


router.get('/', (req, res, next) => {
  Contact.find()
  .populate('group')
    .then(contacts => {
        console.log(contacts);
      res.status(200).json({
          message: 'Task fetched successfully!',
          contacts: contacts
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});


router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");

    const contact = new Contact({
      id: maxContactId,
      name: req.body.name,
      status: req.body.status
    });

    contact.save()
      .then(createdContact => {
        res.status(201).json({
          message: 'Task added successfully',
          contact: createdContact
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
});


router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        contact.name = req.body.name;

        Contact.updateOne({ id: req.params.id }, contact)
          .then(result => {
            res.status(204).json({
              message: 'Task updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Task not found.',
          error: { message: 'Contact not found'}
        });
      });
});

router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        Contact.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Task deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Task not found.',
          error: { message: 'Task not found'}
        });
      });
});

module.exports = router;

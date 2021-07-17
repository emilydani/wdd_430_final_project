var express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Todo = require('../models/todo');
var router = express.Router();


router.get('/', (req, res, next) => {
  Todo.find()
  .populate('group')
    .then(todos => {
        console.log(todos);
      res.status(200).json({
          message: 'Task fetched successfully!',
          todos: todos
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
    const maxTodoId = sequenceGenerator.nextId("todos");

    const todo = new Todo({
      id: maxTodoId,
      name: req.body.name,
      status: req.body.status,
      time: req.body.time,
      details: req.body.details,
      date: req.body.date
    });

    todo.save()
      .then(createdTodo => {
        res.status(201).json({
          message: 'Task added successfully',
          todo: createdTodo
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
    Todo.findOne({ id: req.params.id })
      .then(todo => {
        todo.name = req.body.name;

        Todo.updateOne({ id: req.params.id }, todo)
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
          error: { message: 'Todo not found'}
        });
      });
});

router.delete("/:id", (req, res, next) => {
    Todo.findOne({ id: req.params.id })
      .then(todo => {
        Todo.deleteOne({ id: req.params.id })
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

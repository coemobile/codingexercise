var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/', function(req, res) {
  models.Todo.findAll().then(function(todos) {
    res.json(todos);
  });
});

router.post('/', function(req, res) {
  models.Todo.create({
    title: req.body.title
  }).then(function(todo) {
    res.json(todo);
  });
});

router.get('/:id', function(req, res) {
  models.Todo.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    res.json(todo);
  });
});

router.put('/:id', function(req, res) {
  models.Todo.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    todo.update({
      checked: req.body.checked
    }).then(function(todo) {
      res.json(todo);
    });
  });
});

router.delete('/:id', function(req, res) {
  models.Todo.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    todo.destroy().then(function() {
      res.end();
    });
  });
});

module.exports = router;

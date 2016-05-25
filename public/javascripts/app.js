'use strict';

var app = angular.module('App', []);

app.controller('TodoController', function($scope, $http) {
  $scope.todos = [];

  $scope.submit = function() {
    var todo = {
      title: $scope.todo
    };

    $http.post('/api/todo', todo)
      .success(function(data) {
        $scope.todos.unshift(data);
        $scope.todo = '';
      });
  };

  $scope.update = function(index) {
    var todo = $scope.todos[index];

    $http.put('/api/todo/' + todo.id, todo)
      .success(function(data) {
        $scope.todos[index] = data;
      });
  };

  $scope.delete = function(index) {
    var todo =  $scope.todos[index];

    $http.delete('/api/todo/' + todo.id)
      .success(function() {
        $scope.todos.splice(index, 1);
      });
  };

  $http.get('/api/todo')
    .success(function(data) {
      $scope.todos = data;
    });
});

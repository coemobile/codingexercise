'use strict';

var app = angular.module('App', []);

app.controller('TodoController', function($scope, $http) {
  var qty = 4; // FIXME: Remove this

  $scope.todos = [
    {
      id: 1,
      title: 'One',
      checked: false
    },
    {
      id: 2,
      title: 'Two',
      checked: true
    },
    {
      id: 3,
      title: 'Tree',
      checked: false
    },
    {
      id: 4,
      title: 'Stuff',
      checked: true
    }
  ];

  $scope.submit = function() {
    $scope.todos.unshift({
      id: ++qty,
      title: $scope.todo,
      checked: false
    });
    $scope.todo = '';
  };

  $scope.delete = function(index) {
    $scope.todos.splice(index, 1);
  };
});

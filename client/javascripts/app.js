angular.module('nodeTodo', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.todoData = {};
  // Get all todos
  $http.get('/api/avgtemp/2018-07-30')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  // Create a new todo
  $scope.createTodo = () => {
    $http.post('/api/v1/todos', $scope.formData)
    .success((data) => {
      $scope.formData = {};
      $scope.todoData = data;
      console.log(data);
    })
    .error((error) => {
      console.log('Error: ' + error);
    });
  };
  // Maually Refresh Weather
  $scope.getWeather = () => {
    $http.get('/weather', $scope.formData)
    .success((data) => {
      $scope.formData = {};
      $scope.todoData = data;
      console.log(data);
    })
    .error((error) => {
      console.log('Error: ' + error);
    });
  };

    // Maually Refresh Weather
    $scope.getAvgTemp = () => {
      $http.get('/weather', $scope.formData)
      .success((data) => {
        $scope.formData = {};
        $scope.todoData = data;
        console.log(data);
      })
      .error((error) => {
        console.log('Error: ' + error);
      });
    };

  $scope.Fruits = [{
    Id: 1,
    Name: 'Apple'
}, {
    Id: 2,
    Name: 'Mango'
}, {
    Id: 3,
    Name: 'Orange'
}];

$scope.GetValue = function () {
    var fruitId = $scope.ddlFruits;
    var fruitName = $.grep($scope.Fruits, function (fruit) {
        return fruit.Id == fruitId;
    })[0].Name;
    $window.alert("Selected Value: " + fruitId + "\nSelected Text: " + fruitName);
}
  // Delete a todo
  $scope.deleteTodo = (todoID) => {
    $http.delete('/api/v1/todos/' + todoID)
    .success((data) => {
      $scope.todoData = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
});


angular.module('nodeTodo', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.todoData = {};
  // Get all temps
  $http.get('/api/avgtemp/2018-07-31')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  // Create a new todo
  $scope.createTodo = () => {
    $http.get('/api/updparam/', $scope.myText)
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

    $scope.getAvgCond = () => {
      $http.get('/api/avgtemp/2018-07-31', $scope.formData)
      .success((data) => {
      $scope.todoData = data;
        console.log(data);
      })
      .error((error) => {
        console.log('Error: ' + error);
      });
    };

    $scope.updDate = () => {
      $http.get('/api/date/' + $scope.date)
      .success((data) => {
      $scope.todoData = data;
        console.log(data);
      })
      .error((error) => {
        console.log('Error: ' + error);
      });
    };
    

    $scope.updParam = () => {
      $http.get('/api/updparam/' + $scope.name)
      .success((data) => {
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

$scope.$watch('myDate', function (value) {
  try {
   liveDate = new Date(value);
  } catch(e) {}

  if (!liveDate) {

    $scope.error = "This is not a valid date";
  } else {
    $scope.error = false;
  }
});
  // Delete a todo
  $scope.deleteTodo = (name) => {
    $http.delete('/api/updparam/' + name)
    .success((data) => {
      $scope.todoData = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
})

.controller('ctl', ($scope, $http) => {
  $http.get('/api/avgcondition/')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
})

.controller('health', ($scope, $http) => {
  $http.get('/api/health/')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
})

.controller('humidity', ($scope, $http) => {
  $http.get('/api/avghumidity/')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
})

.controller('news', ($scope, $http) => {
  $http.get('/api/topnews/')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
})

.controller('datacnt', ($scope, $http) => {
  $http.get('/api/topnews/')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
})


.controller('date', ($scope, $http) => {
  $http.get('/api/curdate')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
})

.controller('temp', ($scope, $http) => {
  $http.get('/api/avgtemp')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
})

.controller('events', ($scope, $http) => {
  $http.get('/api/events')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
})
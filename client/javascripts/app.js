angular.module('nodeTodo', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.todoData = {};
  // Get all temps
  $http.get('/util/date/')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  // Create a new todo
  $scope.createTodo = () => {
    $http.get('/util/updparam/', $scope.myText)
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

     // Maually Refresh Events
     $scope.getEvents = () => {
      $http.get('/events', $scope.formData)
      .success((data) => {
        $scope.formData = {};
        $scope.todoData = data;
        console.log(data);
      })
      .error((error) => {
        console.log('Error: ' + error);
      });
    };
  
    // Maually Refresh News
    $scope.getNews = () => {
      $http.get('/news', $scope.formData)
      .success((data) => {
        $scope.formData = {};
        $scope.todoData = data;
        console.log(data);
      })
      .error((error) => {
        console.log('Error: ' + error);
      });
    };
  
    // Maually Refresh Media
    $scope.getMedia = () => {
      $http.get('/media', $scope.formData)
      .success((data) => {
        $scope.formData = {};
        $scope.todoData = data;
        console.log(data);
      })
      .error((error) => {
        console.log('Error: ' + error);
      });
    };
  
   
  
    

    $scope.updParam = () => {
      $http.get('/util/updparam/' + $scope.name)
      .success((data) => {
      $scope.todoData = data;
        console.log(data);
      })
      .error((error) => {
        console.log('Error: ' + error);
      });
    };

})

.controller('ctl', ($scope, $http) => {
  setInterval(function() {   
  $http.get('/out/avgcondition/')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
}, 3000);
})

.controller('health', ($scope, $http) => {
  setInterval(function() {   
  $http.get('/out/health/')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
}, 3000);
})

.controller('humidity', ($scope, $http) => {
  setInterval(function() {   
  $http.get('/out/avghumidity/')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
}, 3000);
})

.controller('news', ($scope, $http) => {
  setInterval(function() {   
  $http.get('/out/topnews/')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
}, 3000);
})

.controller('date', ($scope, $http) => {
  setInterval(function() {   
  $http.get('/out/curdate')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
}, 3000);

$scope.updDate = () => {
  $http.get('/util/date/' + $scope.date)
  .success((data) => {
  $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
};
})

.controller('temp', ($scope, $http) => {
  setInterval(function() {   
  $http.get('/out/avgtemp')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
}, 3000);
})

.controller('events', ($scope, $http) => {
  $http.get('/out/events')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
})
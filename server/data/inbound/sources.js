var requestsmedia = [
    {
    url: 'http://localhost:32400/status/sessions',
  headers:  {
    'X-Plex-Token': 'gdzLRyxuy7yoALEgyUL6',
    'Accept': 'application/json'
  }
  }
  ];
  
  var requestsnews = [{
    url: 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=1654f224d44d4dc491f416ef7950a051',
  },
  ];

  var requestsHealth = [{
    url: 'http://localhost:3000/out/bobby',
  },
  ];
  
  var requestsevents = [{
    url: 'https://www.eventbriteapi.com/v3/events/search/?location.address=charlotte',
    headers: {
      
      'Authorization': 'Bearer  QX23RPXQDYMPORJCBCG6'
    }}
  ];
  
  var requestsweather = [{
    url: 'http://api.wunderground.com/api/c865737e39b62869/conditions/q/28270.json',
  }];

  module.exports = {
    requestsweather,
    requestsevents,
    requestsnews,
    requestsHealth,
    requestsmedia,
  };
var fs = require('fs');

const fileName = ('../../logs/Plex Media Server.log');
fs.readFile(fileName, 'utf8', function (err, data) {
    var content =[]
   if (err)
      return console.log(err);
  // console.log('result read: ' + data);
   content.push(data) ;
   const peopleArray = Object.values(content)
   console.log(peopleArray);
});


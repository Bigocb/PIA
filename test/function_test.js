function getNumbers(req, res, next) {
  var initVal = 0;
  db.one('select * from fact_pia_weather where source_key = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


a+b=c 

0+1=1

1+1=2

2+1=3

3+2=5 

5+3=8

8+5=13
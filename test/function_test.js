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


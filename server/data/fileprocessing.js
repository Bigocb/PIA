/** csv file
a,b,c
1,2,3
4,5,6
*/
const csvFilePath='./server/data/Health Data.csv';
const csv=require('csvtojson');

function myFile(req, res, next){
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
        res.status(200)
          .json({
            data: jsonObj
          });
}) .catch(function (err) {
  return next(err);
});
}

module.exports = {
    myFile: myFile
  };
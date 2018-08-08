/** csv file
a,b,c
1,2,3
4,5,6
*/
const csvFilePath='./server/data/Health Data.csv';
const csv=require('csvtojson');
var fileAnswer = csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
 return jsonObj;
});

exports = fileAnswer;

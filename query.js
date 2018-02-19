var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

//RELEASE 1

function selectRating(min,max){
  db.all(`SELECT name,party,grade_current
          FROM Politician
          WHERE grade_current BETWEEN ${min} and ${max}
          ORDER BY grade_current ASC`,
          function(err,data){
            console.log(data);
          })
}

// selectRating(9,11)


function

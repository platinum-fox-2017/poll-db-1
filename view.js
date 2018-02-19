const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pollDB');

db.serialize(function(){
  // 1. nama politisi, partai, gradeCurrent di partai R dan gradeCurrent 9 s/d 11
  // db.all("SELECT name,party,gradeCurrent FROM Politicians WHERE party = 'R' AND gradeCurrent BETWEEN 9 AND 11",function(err, rows){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(rows);
  //   }
  // });

  //2. jumlah vote untuk politisi Olympia Snowe
  // db.get("SELECT count(*) AS totalVote, (SELECT name FROM Politicians WHERE id = politicianId) AS name FROM Votes WHERE politicianId = 17", function(err,rows){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(rows);
  //   }
  // });

  // 3. jumlah vote untuk politisi yang namanya ada kata 'Adam' --- belom
  db.each("SELECT name, (SELECT count(*) FROM Votes WHERE name LIKE '%Adam%') AS totalVote FROM Politicians INNER JOIN Votes ON Votes.politicianId = Politicians.id WHERE name LIKE '%Adam%'", function(err,rows){
    if(err){
      console.log(err);
    } else {
      console.log(rows);
    }
  });

  // 4. 3 nama, partai dan lokasi politisi yang memiliki suara terbanyak
  // db

  // 5. siapa yang milih olympia snowe
  // db.all("", function(err, rows){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(rows);
  //   }
  // });
});

db.close();

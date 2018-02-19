const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pollDB');

db.serialize(function(){
  // 1. nama politisi, partai, gradeCurrent di partai R dan gradeCurrent 9 s/d 11
  // db.all(`SELECT name,party,gradeCurrent FROM Politicians
  //   WHERE party = 'R' AND gradeCurrent BETWEEN 9 AND 11`,function(err, rows){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(rows);
  //   }
  // });

  //2. jumlah vote untuk politisi Olympia Snowe
  // db.get(`SELECT count(*) AS totalVote, (SELECT name FROM Politicians
  // WHERE id = politicianId) AS name FROM Votes WHERE politicianId = 17`, function(err,rows){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(rows);
  //   }
  // });

  // 3. jumlah vote untuk politisi yang namanya ada kata 'Adam' --- belom
  // db.all(`SELECT name, count(*) AS totalVote FROM Votes LEFT JOIN Politicians
  // ON Votes.politicianId = Politicians.id WHERE name LIKE '%Adam%' GROUP BY name`, function(err,rows){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(rows);
  //   }
  // });

  // 4. 3 nama, partai dan lokasi politisi yang memiliki suara terbanyak
  // db.all(`SELECT count(*) AS totalVote, name, party, locatian, gradeCurrent FROM Votes
  // LEFT JOIN Politicians ON Votes.politicianId = Politicians.id GROUP BY name ORDER
  // BY totalVote DESC LIMIT 3`, function(err,rows){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(rows);
  //   }
  // });

  // 5. siapa yang milih olympia snowe
  db.all(`SELECT firstName, lastName, gender, age FROM Voters LEFT JOIN Votes ON Votes.voterId = Voters.id
    WHERE politicianId = 17`, function(err, rows){
    if(err){
      console.log(err);
    } else {
      console.log(rows);
    }
  });
});

db.close();

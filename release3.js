var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

db.serialize(function() {
  db.all(`SELECT name, party, grade_current
    FROM Politicians
    WHERE party = 'R' AND grade_current >= 9 AND grade_current <= 11`, function(err, rows) {
      if(err) {
        console.log(err)
      } else {
        console.log('=====SOAL 1=====');
        console.log(rows);
      }
  });

  db.all(`SELECT (SELECT COUNT(*) FROM Votes WHERE politicianId = Politicians.id) as totalVote, name
    FROM Politicians
    WHERE name = 'Olympia Snowe'`, function(err, rows) {
      if(err) {
        console.log(err)
      } else {
        console.log('=====SOAL 2=====');
        console.log(rows);
      }
  });
  // db.all("SELECT COUNT(*) AS totalVote, name FROM Votes LEFT JOIN Politicians ON Votes.politicianId = Politicians.id WHERE name = 'Olympia Snowe'", function(err, rows) {
  //     if(err) {
  //       console.log(err)
  //     } else {
  //       console.log(rows);
  //     }
  // });
  db.all(`SELECT name, (SELECT COUNT(*) FROM Votes WHERE Votes.politicianId = Politicians.id) AS totalVote
  FROM Politicians
  WHERE name LIKE 'Adam%'`, function(err, rows) {
      if(err) {
        console.log(err)
      } else {
        console.log('=====SOAL 3=====');
        console.log(rows);
      }
  });

  db.all(`SELECT (SELECT COUNT(*) FROM Votes WHERE Votes.politicianId = Politicians.id) AS totalVote, name, party, location
  FROM Politicians
  ORDER BY totalVote DESC LIMIT 3`, function(err, rows) {
      if(err) {
        console.log(err)
      } else {
        console.log('=====SOAL 4=====');
        console.log(rows);
      }
  });

  db.all(`SELECT first_name, last_name, gender, age FROM Voters LEFT JOIN Votes ON Voters.id = Votes.voterId LEFT JOIN Politicians ON Votes.politicianId = Politicians.id WHERE name = 'Olympia Snowe'`, function(err, rows) {
      if(err) {
        console.log(err)
      } else {
        console.log('=====SOAL 5=====');
        console.log(rows);
      }
  });



});

db.close();

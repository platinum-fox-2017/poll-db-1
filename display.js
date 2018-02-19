const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./poll.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });


let sql = `SELECT name, party, gradeCurrent 
        FROM Politicians WHERE party = 'R' AND gradeCurrent BETWEEN 9 AND 11`;
db.all(sql, [], function(err, rows) {
    if(err){
        console.log(err);
    }else{
        console.log(rows)
    }
});

let sql2 = `SELECT Count(*) as totalVote, name 
            FROM Votes LEFT JOIN Politicians ON Votes.idPoliticians = Politicians.id 
            WHERE name = 'Olympia Snowe'`;
db.get(sql2, [], function(err, row) {
    if(err){
        console.log(err);
    }else{
        console.log(row);
    }
});

let sql3 = `SELECT Count(*) as totalVote, name 
            FROM Votes 
            LEFT JOIN Politicians ON Votes.idPoliticians = Politicians.id 
            WHERE name LIKE '%Adam%' 
            GROUP BY name`;
db.all(sql3, [], function(err, rows) {
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});

let sql4 = `SELECT Count(*) as totalVote, name, party, location 
            FROM Votes 
            LEFT JOIN Politicians ON Votes.idPoliticians = Politicians.id 
            GROUP BY name 
            ORDER BY COUNT(*) DESC 
            LIMIT 3`;
db.all(sql4, [], function(err, rows) {
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});

let sql5 = `SELECT firstName, lastName, gender, age FROM Voters 
            LEFT JOIN Votes ON Voters.id = Votes.idVoters 
            LEFT JOIN Politicians ON Votes.idPoliticians = Politicians.id 
            WHERE Votes.idPoliticians = 17 GROUP BY firstName`;
db.all(sql5, [], function(err, rows) {
    if(err){
        console.log(err);
    }else{
        console.log(rows);
    }
});

db.close();

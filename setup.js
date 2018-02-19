var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
 
db.serialize(function() {
//   db.run(`create table if not exists Politicians(id integer primary key autoincrement,
    name varchar(30),
    party varchar(5),
    location varchar(10),
    grade_current integer)`);
  db.run(`create table if not exists Voters(id integer primary key autoincrement,
    first_name varchar(15),
    last_name varchar(15),
    gender varchar(15),
    age integer)`)
  db.run(`create table if not exists Votes(voterId integer,
    politicianId integer)`)

});
 
db.close();
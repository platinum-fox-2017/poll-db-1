//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('polldb.db');

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS Politicians(
    id integer primary key autoincrement,
    name varchar,
    party varchar,
    location varchar,
    grade_current float
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS Voters(
    id integer primary key autoincrement,
    first_name varchar,
    last_name varchar,
    gender varchar,
    age integer
  )`)
  db.run(`CREATE TABLE IF NOT EXISTS Votes(
    id integer primary key autoincrement,
    voterId integer,
    politicianId integer,
    foreign key(voterId) references Voters (id),
    foreign key(politicianId) references Politicians(id)
  )`)
});
 
db.close();
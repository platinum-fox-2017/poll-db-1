//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
 
db.serialize(function() {
//   db.run(`CREATE TABLE IF NOT EXISTS Politicians (id integer PRIMARY KEY AUTOINCREMENT,
//     name VARCHAR, party VARCHAR, grade_current VARCHAR)`);
// db.run(`CREATE TABLE IF NOT EXISTS Voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR,
//     last_name VARCHAR, gender VARCHAR, age INTEGER)`);
// db.run(`CREATE TABLE IF NOT EXISTS Votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER,
//     FOREIGN KEY (voterId) REFERENCES Voters(id),
//     FOREIGN KEY (politicianId) REFERENCES Politicians(id))`);
});
 
db.close();
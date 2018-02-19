var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
 
db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS Voters
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR (25),
        last_name VARCHAR (50),
        gender VARCHAR(6),
        age INTEGER)`);
    db.run(`CREATE TABLE IF NOT EXISTS Politicians
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR (50),
        party VARCHAR (50),
        location VARCHAR(50),
        grade_current REAL)`);
    db.run(`CREATE TABLE IF NOT EXISTS Votes
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER,
        politicianId INTEGER,
        FOREIGN KEY (voterId) REFERENCES Voters(id),
        FOREIGN KEY (politicianId) REFERENCES Politicians(id))`);
});
 
db.close();

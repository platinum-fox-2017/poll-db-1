var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS Politician (
    PoliticianID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    party VARCHAR(10),
    location VARCHAR(150),
    grade_current INTEGER
    )`);
  db.run(`CREATE TABLE IF NOT EXISTS Votes (
    VotesID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    votersID INTEGER,
    politicianID INTEGER
    )`);
  db.run(`CREATE TABLE IF NOT EXISTS Voters (
    VotersID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender VARCHAR(10),
    age INTEGER
    )`);
});

db.close();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db')


db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS Voters(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender VARCHAR(10),
    age INTEGER
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS Politicians(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    party VARCHAR(50),
    location VARCHAR(50),
    grade_current INTEGER
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS Votes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_politician INTEGER,
    id_voter INTEGER,
    FOREIGN KEY (id_politician) REFERENCES Politicians(id)
    FOREIGN KEY (id_voter) REFERENCES Voters(id)
  )`)
})

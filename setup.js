//your code here
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS Politician (
        id integer PRIMARY KEY AUTOINCREMENT,
        name varchar(50),
        party varchar(50),
        location varchar(50),
        grade_current integer
    );`)

    db.run(`CREATE TABLE IF NOT EXISTS Voter(
        id integer PRIMARY KEY AUTOINCREMENT,
        first_name varchar,
        last_name varchar,
        gender varchar,
        age integer
    );`)

    db.run(`CREATE TABLE IF NOT EXISTS Vote(
        id integer PRIMARY KEY AUTOINCREMENT,
        politicianId integer,
        votersId integer,
        FOREIGN KEY (politicianId) REFERENCES Politician(id), FOREIGN KEY (votersId) REFERENCES voters(id)
    );`)

})

db.close()

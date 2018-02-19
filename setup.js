const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')

var db = new sqlite3.Database('./poll.db');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS Voters (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, firstName VARCHAR(48) NOT NULL, lastName VARCHAR(48) NOT NULL, gender VARCHAR(48) NOT NULL, age INTEGER NOT NULL)");
    db.run("CREATE TABLE IF NOT EXISTS Politicians (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name VARCHAR(48) NOT NULL, party VARCHAR(2) NOT NULL, location VARCHAR(2) NOT NULL, gradeCurrent REAL NOT NULL)");
    db.run("CREATE TABLE IF NOT EXISTS Votes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, idVoters INTEGER NOT NULL, idPoliticians INTEGER NOT NULL, FOREIGN KEY (idVoters) REFERENCES Voters (idVoters), FOREIGN KEY (idPoliticians) REFERENCES Politicians (idPoliticians))");
});

db.close();
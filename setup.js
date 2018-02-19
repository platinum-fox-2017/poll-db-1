const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(function () {

    //Create Voters Table
    db.run(`CREATE TABLE IF NOT EXISTS voters (
        id integer PRIMARY KEY AUTOINCREMENT,
        first_name varchar(50),
        last_name varchar(50),
        gender varchar,
        age integer
    )`);

    //Create Votes Table
    db.run(`CREATE TABLE IF NOT EXISTS votes (
        id integer PRIMARY KEY AUTOINCREMENT,
        voterId integer,
        politicianId integer
    )`);

    // Create Politicians Table
    db.run(`CREATE TABLE IF NOT EXISTS politicians (
            id integer PRIMARY KEY AUTOINCREMENT, 
            name varchar(70),
            party varchar(50),
            location varchar(30),
            grade_current integer
    )`);

});

db.close();
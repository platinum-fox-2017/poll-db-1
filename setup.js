//your code here
/* CREATE TABLE
CREATE TABLE voters (
id INTEGER PRIMARY KEY AUTOINCREMENT,
first_name TEXT,
last_name TEXT,
gender TEXT,
age INTEGER);

CREATE TABLE politicians (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
party TEXT,
location TEXT,
grade_current NUMERIC);

CREATE TABLE voting (
id INTEGER PRIMARY KEY AUTOINCREMENT,
voterId INTEGER,
politicianId INTEGER,
FOREIGN KEY (voterId) REFERENCES voters(id),
FOREIGN KEY (politicianId) REFERENCES politicians(id));
*/

const sqlite3 = require('sqlite3').verbose();

function createTable(){
    let db = new sqlite3.Database('./poll.db');
    db.run('CREATE TABLE voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, gender TEXT, age INTEGER);');
    db.run('CREATE TABLE politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, party TEXT, location TEXT, grade_current NUMERIC);');
    db.run('CREATE TABLE voting ( id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER, FOREIGN KEY (voterId) REFERENCES voters(id), FOREIGN KEY (politicianId) REFERENCES politicians(id));');
 
    db.close();
}

createTable()


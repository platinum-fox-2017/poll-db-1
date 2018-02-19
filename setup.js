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
let db = new sqlite3.Database('./poll.db')

db.serialize(function(){
    let db = new sqlite3.Database('./poll.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the poll database.');
        db.run('CREATE TABLE IF NOT EXISTS Voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, gender TEXT, age INTEGER);');
        db.run('CREATE TABLE IF NOT EXISTS Politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, party TEXT, location TEXT, grade_current REAL);');
        db.run('CREATE TABLE IF NOT EXISTS Voting ( id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER, FOREIGN KEY (voterId) REFERENCES voters(id), FOREIGN KEY (politicianId) REFERENCES politicians(id));');

        db.run('DELETE FROM Voters')
        db.run('DELETE FROM Politicians')
        db.run('DELETE FROM Voting')
        //Clear AUTOINCREMENT
        db.run('DELETE FROM sqlite_sequence')

      });
   
})



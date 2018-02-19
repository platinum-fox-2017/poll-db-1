const sqlite3 = require('sqlite3').verbose();
const pathDB = './poll';

let scriptPoliticians = `CREATE TABLE Politicians(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, party TEXT NOT NULL, location TEXT NOT NULL, grade_current INTEGER NOT NULL)`;

let scriptVoters = `CREATE TABLE Voters(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, gender TEXT NOT NULL, age INTEGER NOT NULL)`;

let scriptVotes = `CREATE TABLE Votes(id INTEGER PRIMARY KEY AUTOINCREMENT, voterId INTEGER, politicianId INTEGER, FOREIGN KEY(voterId) REFERENCES Voters(id), FOREIGN KEY(politicianId) REFERENCES Politicians(id))`;

let db = new sqlite3.Database(pathDB);

db.serialize(function() {
	db.run(scriptPoliticians, function (err) {
		if (err) console.log(err);
		else console.log('Create table Politicians success');
	});

	db.run(scriptVoters, function (err) {
		if (err) console.log(err);
		else console.log('Create table Voters success');
	});

	db.run(scriptVotes, function (err) {
		if (err) console.log(err);
		else console.log('Create table Votes success');
	});
});

db.close();
const sqlite3 = require('sqlite3').verbose();
const Table = require('cli-table');
const colors = require('colors');
const pathDB = './poll';

function query(sqlScript, callback) {
	let db = new sqlite3.Database(pathDB);
	 
	db.all(sqlScript, [], (err, rows) => {
	  if (err) {
	    throw err;
	  }
	  callback(rows);
	});
	 
	db.close();
}

// Output 1
query(`	SELECT name, party, grade_current 
		FROM Politicians 
		WHERE party = 'R' 
			AND grade_current BETWEEN 9 AND 11`, function (rows) {
	let table = new Table({
	    head: ['Name'.green, 'Party'.green, 'Grade Current'.green],
	    colWidths: [30, 10, 30]
	});

	rows.forEach((row) => {
		table.push([row.name, row.party, row.grade_current]);
	});

	console.log('1');
	console.log(table.toString());
});

// Output 2
query(`	SELECT (SELECT COUNT(*) FROM Votes WHERE Votes.politicianId = Politicians.id) AS totalVote, name
		FROM Politicians 
		WHERE name = 'Olympia Snowe'`, function (rows) {
	let table = new Table({
	    head: ['Total Vote'.green, 'Name'.green],
	    colWidths: [20, 30]
	});

	rows.forEach((row) => {
		table.push([row.totalVote, row.name]);
	});

	console.log('2');
	console.log(table.toString());
});

// Output 3
query(`	SELECT Politicians.name, (SELECT COUNT(*) FROM Votes WHERE Votes.politicianId = Politicians.id) AS totalVote
		FROM Politicians
		WHERE Politicians.name LIKE 'Adam%' 
		GROUP BY Politicians.name`, function (rows) {
	let table = new Table({
	    head: ['Name'.green, 'Total Vote'.green],
	    colWidths: [30, 20]
	});

	rows.forEach((row) => {
		table.push([row.name, row.totalVote]);
	});

	console.log('3');
	console.log(table.toString());
});

// Output 4
query(`	SELECT (SELECT COUNT(*) FROM Votes WHERE Votes.politicianId = Politicians.id) AS totalVote, name, party, location
		FROM Politicians
		ORDER BY totalVote DESC
		LIMIT 0, 3`, function (rows) {
	let table = new Table({
	    head: ['Total Vote'.green, 'Name'.green, 'Party'.green, 'Location'.green],
	    colWidths: [20, 30, 10, 10]
	});

	rows.forEach((row) => {
		table.push([row.totalVote, row.name, row.party, row.location]);
	});

	console.log('4');
	console.log(table.toString());
});

// Output 5
query(`	SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age
		FROM Votes
		LEFT JOIN Voters
			ON Votes.voterId = Voters.id
		LEFT JOIN Politicians
			ON Votes.politicianId = Politicians.id
		WHERE Politicians.name = 'Olympia Snowe'`, function (rows) {
	let table = new Table({
	    head: ['First Name'.green, 'Last Name'.green, 'Gender'.green, 'Age'.green],
	    colWidths: [20, 20, 10, 10]
	});

	rows.forEach((row) => {
		table.push([row.first_name, row.last_name, row.gender, row.age]);
	});

	console.log('5');
	console.log(table.toString());
});
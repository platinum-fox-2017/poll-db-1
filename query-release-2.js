const sqlite3 = require('sqlite3').verbose();
const pathDB = './poll';

let db = new sqlite3.Database(pathDB);

function execute(script, callback) {
	db.run(script, [], function (err) {
			callback(err);
		});
	}
}

function insertIntoPoliticians() {
	let script = `	INSERT INTO Politicians(name, party, location, grade_current) 
					VALUES('value_name', 'value_party', 'value_location', 'value_grade_current')`;
	return script;
}

function insertIntoVoters() {
	let script = `	INSERT INTO Voters(first_name, last_name, gender, age) 
					VALUES('value_first_name', 'value_last_name', 'value_gender', 'value_age')`;
	return script;
}

function insertIntoVotes() {
	let script = `	INSERT INTO Votes(voterId, politicianId) 
					VALUES('value_voterId', 'value_politicianId')`;
	return script;
}

function updateDataPoliticians() {
	let script = `	UPDATE Politicians
					SET party = new_value_party
					WHERE id = value_id`;
	return script;
}

function deleteDataPoliticians() {
	let script = `	DELETE FROM Politicians
					WHERE id = value_id`;
	return script;
}

db.serialize(function() {
	execute(insertIntoPoliticians, function (err) {
		if (err) return console.log(err.message);
			console.log(`A row has been inserted into table 'Politicians'`);
	})

	execute(insertIntoVoters, function (err) {
		if (err) return console.log(err.message);
			console.log(`A row has been inserted into table 'Voters'`);
	})

	execute(insertIntoVotes, function (err) {
		if (err) return console.log(err.message);
			console.log(`A row has been inserted into table 'Votes'`);
	})

	execute(updateDataPoliticians, function (err) {
		if (err) return console.log(err.message);
			console.log(`A row has been updated in table 'Politicians'`);
	})

	execute(deleteDataPoliticians, function (err) {
		if (err) return console.log(err.message);
			console.log(`A row has been deleted in table 'Politicians'`);
	})
});

db.close();
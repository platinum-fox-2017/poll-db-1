const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const pathPoliticians = './politicians.csv';
const pathVoters = './voters.csv';
const pathVotes = './votes.csv';
const pathDB = './poll.db';

function readFile(path) {
	let data = fs.readFileSync(path, 'utf8').split('\r\n');
	return data.splice(0, data.length - 1);
}

function insertIntoDB(sqlScript, table) {
	let db = new sqlite3.Database(pathDB);

	db.run(sqlScript, [], function (err) {
		if (err) return console.log(err.message);
		console.log(`A row has been inserted into table '${table}' with rowid ${this.lastID}`);
	});

	db.close();
}

function generateSqlScript(data, table) {
	let sqlScript = '';
	let header = '('+data[0]+')';

	for (let i = 1; i < data.length; i++) {
		let values = [];
		for (let j = 0; j < data[i].split(',').length; j++) values.push('\'' + data[i].split(',')[j] + '\'');
		
		sqlScript = `INSERT INTO ${table + header} VALUES(${values.join(',')})`;
		insertIntoDB(sqlScript, table);
	}
}

generateSqlScript(readFile(pathPoliticians), 'Politicians')
generateSqlScript(readFile(pathVoters), 'Voters')
generateSqlScript(readFile(pathVotes), 'Votes')
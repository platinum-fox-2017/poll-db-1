const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const pathPoliticians = './politicians.csv';
const pathVoters = './voters.csv';
const pathVotes = './votes.csv';
const pathDB = './poll';

function readFile(path) {
	let data = fs.readFileSync(path, 'utf8').split('\r\n');
	return data.splice(0, data.length - 1);
}

function insert(path, table) {
	let db = new sqlite3.Database(pathDB);
	let data = readFile(path);

	let sqlScript = '';
	let header = '('+data[0]+')';

	db.serialize(function() {
		for (let i = 1; i < data.length; i++) {
			let values = [];
			for (let j = 0; j < data[i].split(',').length; j++) values.push('\"' + data[i].split(',')[j] + '\"');
			
			sqlScript = `INSERT INTO ${table + header} VALUES(${values.join(',')})`;

			db.run(sqlScript, [], function (err) {
				if (err) return console.log(err.message);
				console.log(`A row has been inserted into table '${table}' with rowid ${this.lastID}`);
			});
		}
	});
	db.close();
}

insert(pathPoliticians, 'Politicians');
insert(pathVoters, 'Voters');
insert(pathVotes, 'Votes');
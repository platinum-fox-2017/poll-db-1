const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./poll.db');

let politicians = fs.readFileSync('./politicians.csv', 'utf8').trim().split('\n');
let voters = fs.readFileSync('./voters.csv', 'utf8').trim().split('\n');
let votes = fs.readFileSync('./votes.csv', 'utf8').trim().split('\n');

db.serialize(function() {
  var stmt = db.prepare("INSERT INTO Voters(first_name, last_name, gender, age) VALUES (?, ?, ?, ?)");
  for (var i = 1; i < voters.length; i++) {
    let voter = voters[i].split(',')
    let first_name = voter[0]
    let last_name = voter[1]
    let gender = voter[2]
    let age = voter[3]
    stmt.run([first_name, last_name, gender, age]);
  }
  stmt.finalize();
  console.log('Berhasil memasukan data Voters');

  var stmt = db.prepare("INSERT INTO Politicians(name, party, location, grade_current) VALUES (?, ?, ?, ?)");
  for (var i = 1; i < politicians.length; i++) {
    let politician = politicians[i].split(',')
    let name = politician[0]
    let party = politician[1]
    let location = politician[2]
    let grade_current = politician[3]
    stmt.run([name, party, location, grade_current]);
  }
  stmt.finalize();
  console.log('Berhasil memasukan data Politicians');

  var stmt = db.prepare("INSERT INTO Votes(voterId, politicianId) VALUES (?,?)");
  for(var i = 1; i < votes.length; i++) {
    let vote = votes[i].split(',')
    let voterId = vote[0]
    let politicianId = vote[1]
    stmt.run([voterId,politicianId])
  }
  stmt.finalize();
  console.log('Berhasil memasukan data Votes');
});

db.close();

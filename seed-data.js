const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const fs = require('fs');

const readVoters = fs.readFileSync('./voters.csv', 'utf8').trim().split('\n');
const readPoliticians = fs.readFileSync('./politicians.csv', 'utf8').trim().split('\n');
const readVotes = fs.readFileSync('./votes.csv', 'utf8').trim().split('\n');

for (let i = 1; i < readVoters.length; i++) {
  let voters = readVoters[i].split(',');

  db.run(`INSERT INTO Voters(first_name, last_name, gender, age)
    VALUES($first_name, $last_name, $gender, $age)`,{
      $first_name: voters[0],
      $last_name: voters[1],
      $gender: voters[2],
      $age: voters[3]
    })
}

for (let i = 1; i < readPoliticians.length; i++) {
  let politicians = readPoliticians[i].split(',');

  db.run(`INSERT INTO Politicians(name, party, location, grade_current)
    VALUES($name, $party, $location, $grade_current)`,{
      $name: politicians[0],
      $party: politicians[1],
      $location: politicians[2],
      $grade_current: politicians[3]
    })
}

for (let i = 1; i < readVotes.length; i++) {
  let votes = readVotes[i].split(',');

  db.run(`INSERT INTO Votes(voterId, politicianId)
    VALUES($voterId, $politicianId)`,{
      $voterId: votes[0],
      $politicianId: votes[1]
    })
}

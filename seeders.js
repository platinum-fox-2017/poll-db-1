const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')

const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n')
const voters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n')

for (var i = 1; i < politicians.length-1; i++) {
  let politiciansArr = politicians[i].split(',')
  db.run(`INSERT INTO Politicians(name, party, location, grade_current)
          VALUES($name, $party, $location, $grade_current)`,
          {
            $name: politiciansArr[0],
            $party: politiciansArr[1],
            $location: politiciansArr[2],
            $grade_current: politiciansArr[3]
          })
}

for (var i = 1; i < voters.length-1; i++) {
  let votersArr = voters[i].split(',')
  db.run(`INSERT INTO Voters(first_name, last_name, gender, age)
          VALUES($first_name, $last_name, $gender, $age)`,
          {
            $first_name: votersArr[0],
            $last_name: votersArr[1],
            $gender: votersArr[2],
            $age: votersArr[3]
          })
}

for (var i = 1; i < votes.length-1; i++) {
  let votesArr = votes[i].split(',')
  db.run(`INSERT INTO Votes(id_voter, id_politician)
          VALUES($id_voter, $id_politician)`,
          {
            $id_voter: votesArr[0],
            $id_politician: votesArr[1]
          })
}

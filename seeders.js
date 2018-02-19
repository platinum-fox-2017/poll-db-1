const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')

const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n')
const voters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n')

function seedPoliticians() {
  var newArr = []
  for (var i = 1; i < politicians.length-1; i++) {
    newArr.push(politicians[i].split(','))
  }
  for (var i = 0; i < newArr.length; i++) {
      db.run(`INSERT INTO Politicians(name, party, location, grade_current)
      VALUES($name, $party, $location, $grade_current)`,
      {
        $name: newArr[i][0],
        $party: newArr[i][1],
        $location: newArr[i][2],
        $grade_current: newArr[i][3]
      })
  }

}

function seedVoters() {
  var newArr = []
  for (var i = 1; i < voters.length-1; i++) {
    newArr.push(voters[i].split(','))
  }
  for (var i = 0; i < newArr.length; i++) {
    db.run(`INSERT INTO Voters(first_name, last_name, gender, age)
    VALUES($first_name, $last_name, $gender, $age)`,
    {
      $first_name: newArr[i][0],
      $last_name: newArr[i][1],
      $gender: newArr[i][2],
      $age: newArr[i][3]
    })
  }
}
function seedVotes() {
  var newArr = []
  for (var i = 1; i < votes.length-1; i++) {
    newArr.push(votes[i].split(','))
  }
  for (var i = 0; i < newArr.length; i++) {
    db.run(`INSERT INTO Votes(id_voter, id_politician)
            VALUES($id_voter, $id_politician)`,
            {
              $id_voter: newArr[i][0],
              $id_politician: newArr[i][1]
            })

  }
}

seedPoliticians()
seedVoters()
seedVotes()

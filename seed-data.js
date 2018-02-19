var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
const fs = require ('fs')
const politician = fs.readFileSync('./politicians.csv','utf8').split('\n')
// console.log(politician);
const voters = fs.readFileSync('./voters.csv','utf8').split('\n')
// console.log(voters);
const votes = fs.readFileSync('./votes.csv','utf8').split('\n')
// console.log(votes);

function insertPejabat(){
  // console.log(politician)
  for(let i = 1;i<politician.length-1;i++){
    let temp = politician[i].split(',')
    db.run(`INSERT INTO Politician(name,party,location,grade_current)
            VALUES ($name,$party,$location,$grade_current)`,
            {
              $name:temp[0],
              $party:temp[1],
              $location:temp[2],
              $grade_current:temp[3]
            })
  }
}
function insertVotes(){
  for(let i = 1;i<votes.length-1;i++){
    let temp = votes[i].split(',')
    db.run(`INSERT INTO Votes(votersID,politicianID)
            VALUES ($votersID,$politicianID)`,
            {
              $votersID:temp[0],
              $politicianID:temp[1],
            })
  }
}

function insertVoter(){
  for(let i = 1;i<voters.length-1;i++){
    let temp = voters[i].split(',')
    db.run(`INSERT INTO Voters(first_name,last_name,gender,age)
            VALUES ($first_name,$last_name,$gender,$age)`,
            {
              $first_name:temp[0],
              $last_name:temp[1],
              $gender:temp[2],
              $age:temp[3]
            })
  }
}





//
// insertPejabat()
// insertVotes()
// insertVoter()

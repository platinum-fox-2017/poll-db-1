var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
const fs = require ('fs')


const politician = fs.readFileSync('./politicians.csv','utf8').split('\n')
function strPolitician(politician){
  let strPolitician = ''
  for (var i = 1; i < politician.length-1; i++) {
    let splitArr = politician[i].split(',')
    strPolitician += '('
    strPolitician += '"'+splitArr[0]+'",'
    strPolitician += '"'+splitArr[1]+'",'
    strPolitician += '"'+splitArr[2]+'",'
    strPolitician += splitArr[3]
    strPolitician += '),'
  }
  let temp = strPolitician.substr(0,strPolitician.length-1)
  return temp
}
let politicianString = strPolitician(politician)
// console.log(politicianString);


const voters = fs.readFileSync('./voters.csv','utf8').split('\n')
function strVoters(voters){
  let strVoter = ''
  for (var i = 1; i < voters.length-1; i++) {
    let splitArr = voters[i].split(',')
    strVoter += '('
    strVoter += '"'+splitArr[0]+'",'
    strVoter += '"'+splitArr[1]+'",'
    strVoter += '"'+splitArr[2]+'",'
    strVoter += splitArr[3]
    strVoter += '),'
  }
  let temp = strVoter.substr(0,strVoter.length-1)
  return temp
}
let voterString = strVoters(voters)
// console.log(voterString);

const votes = fs.readFileSync('./votes.csv','utf8').split('\n')


function strVotes(votes){
  let strVote = ''
  for (var i = 1; i < votes.length-1; i++) {
    strVote += '('
    strVote += votes[i]
    strVote += '),'
  }
  let temp = strVote.substr(0,strVote.length-1)
  return temp
}
let voteString = strVotes(votes)
// console.log(voteString);


function insertPejabat(){
    // console.log(politicianString);
    db.run(`INSERT INTO Politician(name,party,location,grade_current)
            VALUES ${politicianString}`)
}

function insertVotes(){
    db.run(`INSERT INTO Votes(votersID,politicianID)
            VALUES ${voteString}`)
}

function insertVoter(){
    db.run(`INSERT INTO Voters (first_name,last_name,gender,age)
            VALUES ${voterString}`)
}
//
insertPejabat()
insertVotes()
insertVoter()

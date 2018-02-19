const fs = require('fs')

let datavotes = fs.readFileSync('./votes.csv','utf-8').trimRight().split('\n')
let datavoters = fs.readFileSync('./voters.csv','utf-8').trimRight().split('\n')
let politikus = fs.readFileSync('./politicians.csv','utf-8').trimRight().split('\n')
const sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./pool1.db');


var votes=[]
for(let i=1;i<datavotes.length;i++){
  var pecah=datavotes[i].split(',')
  var obj={
    voterId:pecah[0],
    politicianId:pecah[1]
  }
  votes.push(obj)
}


var voters=[]
for(let i=1;i<datavoters.length;i++){
  var pecahvoters=datavoters[i].split(',')
  var obj={
    first_name : pecahvoters[0],
    last_name : pecahvoters[1],
    gender : pecahvoters[2],
    age : pecahvoters[3]
  }
  voters.push(obj)
}


var politik=[]
for(let i=1;i<politikus.length;i++){
  var polit=politikus[i].split(',')
  var obj={
    name : polit[0],
    party : polit[1],
    location : polit[2],
    grade_current : polit[3]
  }
  politik.push(obj)
}


// input data

for(let i=0;i<politik.length;i++){
  db.serialize(function() {
    db.run('INSERT INTO politik (name,party,location,grade_current) VALUES ($nama,$party,$location,$grade_current)',
    {$nama : politik[i].name,
    $party : politik[i].party,
    $location : politik[i].location,
    $grade_current : politik[i].grade_current}
      , function(err) {
      if (err) {
        return console.error(err.message);
      }
    });
  });

}


for(let i=0;i<voters.length;i++){
  db.serialize(function() {
    db.run('INSERT INTO voters (first_name,last_name,gender,age) VALUES ($firstname,$lastname,$gender,$age)',
    {$firstname : voters[i].first_name,
    $lastname : voters[i].last_name,
    $gender : voters[i].gender,
    $age : voters[i].age}
      , function(err) {
      if (err) {
        return console.error(err.message);
      }
    });
  });

}


for(let i=0;i<votes.length;i++){
  db.serialize(function() {
    db.run('INSERT INTO votes (voterid,politikid) VALUES ($voterid,$politikid)',
    {$voterid : votes[i].voterId,
    $politikid : votes[i].politicianId}
      , function(err) {
      if (err) {
        return console.error(err.message);
      }
    });
  });

}


// // UPDATE
// db.run("UPDATE votes SET voterid = $voterid, politikid = $politikid WHERE id_votes = $id_votes", {
//   $id_votes:1,
//   $voterid: 2,
//   $politikid: 5
// });
//
//
// // DELETE
// db.run("DELETE FROM votes WHERE id_votes = $id_votes",{
//   $id_votes:2,
// });

db.close();

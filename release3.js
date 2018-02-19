"use strict"
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./voting.db');


db.all("SELECT name,party,grade_current FROM politicians WHERE party='R' and grade_current between 9 AND 11",
   (error, rows) => {
     console.log('========================================================================');
     console.log(rows);
     console.log('========================================================================');
})

db.all("SELECT COUNT(*) as totalVote,name FROM votes JOIN politicians ON politicians.politiciansId=votes.politiciansId WHERE politicians.name='Olympia Snowe'",
    (error, rows) => {
      console.log('========================================================================');
      console.log(rows);
      console.log('========================================================================');
})

db.all("SELECT name,COUNT(*) as totalVote FROM votes JOIN politicians ON politicians.politiciansId=votes.politiciansId WHERE politicians.name like '%Adam%' GROUP BY name",
    (error, rows) => {
      console.log('========================================================================');
      console.log(rows);
      console.log('========================================================================');
})

db.all("SELECT COUNT(*) as totalVote,name,party,location FROM votes JOIN politicians ON politicians.politiciansId=votes.politiciansId  GROUP BY name ORDER BY totalVote DESC LIMIT 3",
    (error, rows) => {
      console.log('========================================================================');
      console.log(rows);
      console.log('========================================================================');
})

db.all("SELECT first_name,last_name,gender,age FROM votes JOIN voters ON voters.votersId=votes.voterId  JOIN politicians ON politicians.politiciansId=votes.politiciansId  WHERE politicians.name='Olympia Snowe'",
    (error, rows) => {
      console.log('========================================================================');
      console.log(rows);
      console.log('========================================================================');
})

db.close();

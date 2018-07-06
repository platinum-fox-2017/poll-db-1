'use strict'
const fs = require ('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.all(`SELECT name,party,grade_current FROM politicians
  WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`, (err, data) => {
    console.log(data)
  })

db.all(`SELECT COUNT(*) AS TotalVotes,name FROM Politicians INNER JOIN Votes
ON Politicians.id = Votes.politicianId WHERE Politicians.name = 'Olympia Snowe'`, (err,data) => {
  console.log(data)
});

db.all(`SELECT name,COUNT(*) AS TotalVotes FROM Politicians INNER JOIN Votes
ON Politicians.id = Votes.politicianId WHERE Politicians.name LIKE 'Adam%' GROUP BY name`, (err,data) => {
  console.log(data)
});

db.all(`SELECT COUNT(*) AS TotalVote,name,party,location FROM Politicians INNER JOIN Votes
ON Politicians.id = Votes.politicianId GROUP BY Politicians.name ORDER BY TotalVote DESC LIMIT 3`, (err,data) => {
  console.log(data)
})

db.all(`SELECT * FROM Voters LEFT JOIN Votes ON Voters.id = Votes.voterId
  WHERE Votes.politicianId = (SELECT id FROM Politicians WHERE name = 'Olympia Snowe')`, (err,data) => {
    console.log(data)
  })

db.close();

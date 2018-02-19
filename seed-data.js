var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
const fs = require ('fs')

let votersFile = fs.readFileSync('./voters.csv','utf8').split('\n')
let politiciansFile = fs.readFileSync('./politicians.csv','utf8').split('\n')
let votesFile = fs.readFileSync('./votes.csv','utf8').split('\n')

db.serialize(function() {
    for(let i = 1; i<votersFile.length; i++){
        let data = votersFile[i].split(',')
        db.run(`INSERT INTO Voters VALUES(
            null, "${data[0]}", "${data[1]}","${data[2]}", ${data[3]}
        )`)
    }
    for(let i = 1; i<politiciansFile.length; i++){
        let data = politiciansFile[i].split(',')
        db.run(`INSERT INTO Politicians VALUES(
            null, "${data[0]}", "${data[1]}","${data[2]}", ${data[3]}
        )`)
    }
    for(let i = 1; i<votesFile.length; i++){
        let data = votesFile[i].split(',')
        db.run(`INSERT INTO Votes VALUES(
            null, ${data[0]}, ${data[1]}
        )`)
    }
})
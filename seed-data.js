var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
const fs = require ('fs')

let votersFile = fs.readFileSync('./voters.csv','utf8').split('\n')
let politiciansFile = fs.readFileSync('./politicians.csv','utf8').split('\n')
let votesFile = fs.readFileSync('./votes.csv','utf8').split('\n')

db.serialize(function() {
    // insert Voters
    let votersArr = []
    for(let i = 1; i<votersFile.length; i++){
        votersArr.push(votersFile[i].split(','))
    }
    let votersStr = `INSERT INTO Voters VALUES`
    for(let i = 0; i<votersArr.length; i++){
        votersStr+=`(null,"${votersArr[i][0]}", "${votersArr[i][1]}","${votersArr[i][2]}", ${votersArr[i][3]}),`
    }
    let dataVoters = votersStr.substring(0,votersStr.length-1)
    db.run(dataVoters)

    // insert Politicians
    let politiciansArr = []
    for(let i = 1; i<politiciansFile.length; i++){
        politiciansArr.push(politiciansFile[i].split(','))
    }
    let politiciansStr = `INSERT INTO Politicians VALUES`
    for(let i = 0; i<politiciansArr.length; i++){
        politiciansStr+=`(null,"${politiciansArr[i][0]}", "${politiciansArr[i][1]}","${politiciansArr[i][2]}", ${politiciansArr[i][3]}),`
    }
    let dataPoliticians = politiciansStr.substring(0,politiciansStr.length-1)
    db.run(dataPoliticians)

    // insert Votes
    let votesArr = []
    for(let i = 1; i<votesFile.length; i++){
        votesArr.push(votesFile[i].split(','))
    }
    let votesStr = `INSERT INTO Votes VALUES`
    for(let i = 0; i<votesArr.length; i++){
        votesStr+=`(null,${votesArr[i][0]}, ${votesArr[i][1]}),`
    }
    let dataVotes = votesStr.substring(0,votesStr.length-1)
    db.run(dataVotes)

})
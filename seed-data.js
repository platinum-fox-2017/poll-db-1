const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')
const fs = require('fs')

db.serialize(function () {
    const politicians = fs.readFileSync('./politicians.csv', 'utf-8').split('\n')
    for (let index = 1; index < politicians.length; index++) {
        let tempPolitician = politicians[index].split(',')
        db.run(`INSERT INTO Politician VALUES(
            NULL,
            "${tempPolitician[0]}",
            "${tempPolitician[1]}",
            "${tempPolitician[2]}",
            ${tempPolitician[3]}
        );`)
    }

    const voters = fs.readFileSync('./voters.csv', 'utf-8').split('\n')
    for (let index = 1; index < voters.length; index++) {
        let tempVoters = voters[index].split(',')
        db.run(`INSERT INTO Voter VALUES(
            NULL,
            "${tempVoters[0]}",
            "${tempVoters[1]}",
            "${tempVoters[2]}",
            ${tempVoters[3]}
        );`)
    }

    const votes = fs.readFileSync('./votes.csv', 'utf-8').split('\n')
    for (let index = 1; index < votes.length; index++) {
        let tempVotes = votes[index].split(',')
        db.run(`INSERT INTO Vote VALUES(
            NULL,
            ${tempVotes[0]},
            ${tempVotes[1]}
        );`)
    }


})

db.close()
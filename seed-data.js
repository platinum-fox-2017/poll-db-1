const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')
const fs = require('fs')

db.serialize(function () {
    const politicians = fs.readFileSync('./politicians.csv', 'utf-8').split('\n')
    let tempPolitician = []
    let queryPolitician = 'INSERT INTO Politician VALUES'
    for (let index = 1; index < politicians.length; index++) {
        tempPolitician.push(politicians[index].split(','))
    }
    for (let index = 0; index < tempPolitician.length; index++) {
        queryPolitician += `(NULL,
            "${tempPolitician[index][0]}",
            "${tempPolitician[index][1]}",
            "${tempPolitician[index][2]}",
            "${tempPolitician[index][3]}"
        )`
        if (index < tempPolitician.length - 1) {
            queryPolitician += ','
        }
    }
    db.run(queryPolitician)

    const voter = fs.readFileSync('./voters.csv', 'utf-8').split('\n')
    let tempVoter = []
    let queryVoter = 'INSERT INTO Voter VALUES'
    for (let index = 1; index < voter.length; index++) {
        tempVoter.push(voter[index].split(','))
    }
    for (let index = 0; index < tempVoter.length; index++) {
        queryVoter += `(NULL,
            "${tempVoter[index][0]}",
            "${tempVoter[index][1]}",
            "${tempVoter[index][2]}",
            "${tempVoter[index][3]}"
        )`

        if (index < tempVoter.length - 1) {
            queryVoter += ','
        }
    }
    db.run(queryVoter)

    const votes = fs.readFileSync('./votes.csv', 'utf-8').split('\n')
    let tempVote = []
    let queryVote = 'INSERT INTO Vote VALUES'
    for (let index = 0; index < votes.length; index++) {
        tempVote.push(votes[index].split(','))
    }
    for (let index = 0; index < tempVote.length; index++) {
        queryVote += `(NULL,
            "${tempVote[index][0]}",
            "${tempVote[index][1]}"
        )`

        if (index < tempVote.length - 1) {
            queryVote += ','
        }
    }
    db.run(queryVote)
})

db.close()
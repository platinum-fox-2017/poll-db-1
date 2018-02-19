const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

function insertVoters(first_name, last_name, gender, age){
    db.serialize(function(){
        var stmt = db.prepare('INSERT INTO Voters(first_name, last_name, gender, age) VALUES (?,?,?,?)')
        stmt.run([first_name, last_name, gender, age])
        stmt.finalize()

        console.log('Insert Data Voters Success')
    })
    db.close()
}

function insertPoliticians(name, party, location, grade){
    db.serialize(function(){
        var stmt = db.prepare('INSERT INTO Politicians(name, party, location, grade_current) VALUES (?,?,?,?)')
        stmt.run([name, party, location, grade])
        stmt.finalize()

        console.log('Insert Data Politicians Success')
    })
    db.close()
}

function insertVotes(voterId, politicianId){
    db.serialize(function(){
        var stmt = db.prepare('INSERT INTO Voting(voterId, politicianId) VALUES (?,?)')
        stmt.run([voterId, politicianId])
        stmt.finalize()

        console.log('Insert Data Votes Success')
    })
    db.close()
}

// insertVoters('Agung', 'Prabowo', 'M', 25)
// insertPoliticians('Agung Prabowo','R','BDG',11.27237023)
// insertVotes(151,21)

module.exports = {
    insertVoters: insertVoters,
    insertPoliticians: insertPoliticians,
    insertVotes: insertVotes
}


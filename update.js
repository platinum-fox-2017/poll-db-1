const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

function updateVoters(id, first_name, last_name, gender, age){
    db.serialize(function(){
        var stmt = db.prepare('UPDATE Voters SET first_name = ?, last_name = ?, gender = ?, age = ? WHERE id = ?')
        stmt.run([first_name, last_name, gender, age, id])
        stmt.finalize()

        console.log('Update Data Voters Success')
    })
    db.close()
}

function updatePoliticians(id, name, party, location, grade_current){
    db.serialize(function(){
        var stmt = db.prepare('UPDATE Politicians SET name = ?, party = ?, location = ?, grade_current = ? WHERE id = ?')
        stmt.run([name, party, location, grade_current, id])
        stmt.finalize()

        console.log('update Data Politicians Success')
    })
    db.close()
}

function updateVotes(id, voterId, politicianId){
    db.serialize(function(){
        var stmt = db.prepare('UPDATE Voting SET voterId = ?, politicianId = ? WHERE id = ?')
        stmt.run([voterId, politicianId, id])
        stmt.finalize()

        console.log('update Data Votes Success')
    })
    db.close()
}

// updateVoters(151, 'Agung', 'Caproex', 'male', 25)
// updatePoliticians(21, 'Agung Caproex', 'R', 'JKT', 12.0123456)
updateVotes(164,152,21)

module.exports = {
    updateVoters: updateVoters,
    updatePoliticians: updatePoliticians,
    updateVotes: updateVotes
}


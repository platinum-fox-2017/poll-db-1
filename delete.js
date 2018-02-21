const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

function deleteVoters(id){
    db.serialize(function() {
      const stmt = db.prepare('DELETE FROM Voters WHERE id = ?');
      stmt.run(id);
      stmt.finalize();
      console.log('Delete Data Voters Success');
    });
    db.close();
}

function deletePoliticians(id){
    db.serialize(function() {
      const stmt = db.prepare('DELETE FROM Politicians WHERE id = ?');
      stmt.run(id);
      stmt.finalize();
      console.log('Delete Data Politicians Success');
    });
    db.close();
}

function deleteVotes(id){
    db.serialize(function() {
      const stmt = db.prepare('DELETE FROM Voting WHERE id = ?');
      stmt.run(id);
      stmt.finalize();
      console.log('Delete Data Votes Success');
    });
    db.close();
}

// deleteVoters(152)

module.exports = {
    deleteVoters: deleteVoters,
    deletePoliticians: deletePoliticians,
    deleteVotes: deleteVotes
}
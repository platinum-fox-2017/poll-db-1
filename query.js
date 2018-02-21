const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

db.serialize(function(){
    db.all("SELECT name, party, grade_current FROM Politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11",
    (err, rows) => {
        if(err){
            console.log(err.message)
        }
        console.log(rows)
    })

    db.all("SELECT COUNT(*) AS totalVote, Politicians.name FROM Voting LEFT JOIN Politicians ON Politicians.id = Voting.politicianId WHERE Politicians.name = 'Olympia Snowe'",
    (err, rows) => {
        if(err){
            console.log(err.message)
        }
        console.log(rows)
    })

    db.all("SELECT Politicians.name, COUNT(*) AS totalVote FROM Voting LEFT JOIN Politicians ON Politicians.id = Voting.politicianId WHERE Politicians.name LIKE 'Adam%' GROUP BY Politicians.name",
    (err, rows) => {
        if(err){
            console.log(err.message)
     }
        console.log(rows)
    })

    db.all("SELECT COUNT(*) AS totalVote, Politicians.name, Politicians.party, Politicians.location FROM Voting LEFT JOIN Politicians ON Politicians.id = Voting.politicianId GROUP BY Politicians.name ORDER BY totalVote DESC LIMIT 3",
    (err, rows) => {
        if(err){
            console.log(err.message)
     }
        console.log(rows)
    })

    db.all("SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age FROM Voting LEFT JOIN Politicians ON Politicians.id = Voting.politicianId LEFT JOIN Voters ON Voters.id = Voting.voterId WHERE Politicians.name = 'Olympia Snowe'",
    (err, rows) => {
        if(err){
            console.log(err.message)
     }
        console.log(rows)
    })

    db.close()

})





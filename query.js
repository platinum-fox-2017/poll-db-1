const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('poll.db', (err) => {
    if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
})

// 1.
db.all(`SELECT politician_name, party, grade_current FROM Politicians 
        WHERE party = ? AND grade_current BETWEEN ? AND ?`, ['R', 9, 11], (err, rows) => {
        if (err) throw err
        else {
            console.log(rows)
        }
})
// 2.
db.all(`SELECT COUNT(*) AS totalVote, politician_name AS name FROM Votes 
        LEFT JOIN Politicians ON Politicians.politician_id = Votes.politician_id 
        WHERE politician_name = 'Olympia Snowe'`, [], (err, rows) => {
        if (err) throw err
        else {
            console.log(rows)
        }
})
// 3.
db.all(`SELECT politician_name AS name, COUNT(*) AS totalVote FROM Votes 
        LEFT JOIN Politicians ON Politicians.politician_id = Votes.politician_id 
        WHERE politician_name LIKE 'Adam%' GROUP BY 1`, [], (err, rows) => {
        if (err) throw err
        else {
            console.log(rows)
        }
})
// 4.
db.all(`SELECT COUNT(*) AS totalVote, politician_name AS name, party, location FROM Votes
        LEFT JOIN Politicians ON Politicians.politician_id = Votes.politician_id
        GROUP BY name
        ORDER BY totalVote DESC
        LIMIT 3`, [], (err, rows) => {
        if (err) throw err
        else {
            console.log(rows)
        }
})
// 5.
db.all(`SELECT first_name, last_name, gender, age FROM Votes
        LEFT JOIN Voters ON Voters.voter_id = Votes.voter_id
        LEFT JOIN Politicians ON Politicians.politician_id = Votes.politician_id
        WHERE politician_name = 'Olympia Snowe'`, [], (err, rows) => {
        if (err) throw err
        else {
            console.log(rows)
        }
})

// close the database connection
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
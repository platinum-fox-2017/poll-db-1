var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
 
db.serialize(function() {
    // no 1
    let query1 = `SELECT name, party, grade_current FROM Politicians
                WHERE party = "R" and grade_current BETWEEN 9 AND 11`
    db.all(query1,(err,rows)=>{
        if (err) throw err;
        console.log(rows)
    })

    // no 2
    let query2 = `SELECT Count(Votes.politicianId) as totalVote, name FROM Politicians 
                Inner Join Votes On Politicians.id = Votes.politicianId 
                WHERE name = "Olympia Snowe"`
    db.all(query2,(err,rows)=>{
        if (err) throw err;
        console.log(rows)
    })

    // no 3
    let query3 = `SELECT name, Count(Votes.politicianId) as totalVote FROM Politicians 
                Inner Join Votes On Politicians.id = Votes.politicianId 
                GROUP BY name
                HAVING name LIKE "Adam%"`
    db.all(query3,(err,rows)=>{
        if (err) throw err;
        console.log(rows)
    })

    // no 4
    let query4 = `SELECT Count(Votes.politicianId) as totalVote, name, party, location FROM Politicians 
                Inner Join Votes On Politicians.id = Votes.politicianId 
                GROUP BY name 
                ORDER BY totalVote DESC
                LIMIT 3`
    db.all(query4,(err,rows)=>{
        if (err) throw err;
        console.log(rows)
    })

    //no 5
    let query5 = `SELECT first_name, last_name, gender, age  FROM Voters
                INNER JOIN Votes ON Voters.id = Votes.voterId
                INNER JOIN Politicians ON Politicians.id = Votes.politicianId
                WHERE Politicians.name = "Olympia Snowe"`
    db.all(query5,(err,rows)=>{
        if (err) throw err;
        console.log(rows)
    })
});
 
db.close();

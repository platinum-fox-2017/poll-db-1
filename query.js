const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')

db.all(`SELECT name, party, grade_current FROM Politicians
        WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`,
        function (err, data) {
                console.log(data);
        })

db.all(`SELECT COUNT (name) as TotalVote, name FROM Politicians
        LEFT JOIN Votes ON Politicians.id = Votes.id_politician
        WHERE Politicians.name = 'Olympia Snowe'`,
        function (err, data) {
                console.log(data);
        })

db.all(`SELECT name , COUNT (name) as TotalVote FROM Politicians
        LEFT JOIN Votes ON Politicians.id = Votes.id_politician
        WHERE politicians.name LIKE 'Adam%'
        GROUP BY name`,
        function (err, data) {
                console.log(data);
        })

db.all(`SELECT COUNT (name) as TotalVote, name, party, location FROM Politicians
        LEFT JOIN Votes ON Politicians.id = Votes.id_politician
        GROUP BY name ORDER BY TotalVote desc LIMIT 3`,
        function (err, data) {
                console.log(data);
        })

db.all(`SELECT first_name, last_name, gender, age FROM Voters
        LEFT JOIN Votes ON Voters.id = Votes.id_voter
        WHERE Votes.id_politician = (SELECT id FROM Politicians WHERE name = 'Olympia Snowe')`,
        function (err, data) {
                console.log(data);
        })

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

function release_3_1() {
    db.serialize(function() {
        db.all("SELECT name,party,grade_current FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11", (err, rows) => {
            console.log("\nPoliticians yang berada di partai R dan grade_current antara 9-11:");
            console.log(rows);
        });
    });
}

function release_3_2() {
    db.serialize(function() {
        db.all("SELECT (SELECT COUNT(*) FROM votes WHERE politicians_id = politicians.politicians_id) AS totalValue, name FROM politicians WHERE name = 'Olympia Snowe'",
            (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("\nJumlah vote untuk Olympia Snowe: ");
                    console.log(rows);
                }
            });
    });
}

function release_3_3() {
    db.serialize(function() {
        db.all("SELECT name,(SELECT COUNT(*) FROM votes WHERE politicians_id = politicians.politicians_id) AS totalVote FROM politicians WHERE name LIKE '%Adam%'",
            (err, rows) => {
                console.log("\nPoliticians bernama Adam:");
                console.log(rows);
            });
    });
}

function release_3_4() {
    db.serialize(function() {
        db.all("SELECT (SELECT COUNT(*) FROM votes WHERE politicians_id = politicians.politicians_id) AS totalValue,name,party,location FROM politicians ORDER BY totalValue DESC LIMIT 3", (err, rows) => {
            console.log(rows);
        });
    });
}

function release_3_5(){
    db.serialize(function(){
        db.all(`SELECT first_name,last_name,gender,age FROM voters LEFT JOIN votes ON votes.voters_id = voters.voters_id LEFt JOIN politicians ON politicians.politicians_id = votes.politicians_id WHERE politicians.name = "Olympia Snowe"`, (err,rows)=>{
            console.log(rows);
        })
    })
}

// release_3_1();
// release_3_2();
// release_3_3();
// release_3_4();
release_3_5();

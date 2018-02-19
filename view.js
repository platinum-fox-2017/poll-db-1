var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll.db');

db.serialize(function() {

    // 1. Tampil nama politisi, partai dan grade yang memiliki grade curr 9 < 11
    db.all("SELECT * FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11", [], function(err, row){
        if(err){ console.log(err) }
        else {
            console.log(row)
        }
    });

    // 2. Hitung Jumlah Vote Olympia Sonwe
    db.all("SELECT (SELECT COUNT(*) FROM votes WHERE politiciansId= politicians.id) AS totalVote, name FROM politicians WHERE name = 'Olympia Snowe'", [], function(err, row){
        if(err){
            console.log(err)
        }
        else {
            console.log(row)
        }
    });

    // 3. Hitung jumlah politician yang mengandung nama Adam
    db.all("SELECT name,(SELECT COUNT(*) FROM votes WHERE politiciansId = politicians.id) AS totalVote FROM politicians WHERE name LIKE 'Adam%'", [], function(err, row){
        if(err){
            console.log(err)
        } else {
            console.log(row)
        }
    });

    // 4. Tampilkan 3 politician beserta nama partai dan lokasi Politician
    // tersebut yang memiliki suara terbanyak
    db.all("SELECT (SELECT COUNT(*) FROM votes WHERE politiciansId = politicians.id) AS totalValue, name, party, location FROM politicians ORDER BY totalValue DESC LIMIT 3", [], function(err, row){
        if(err){
            console.log(err)
        } else {
            console.log(row)
        }
    });
    

    // 5. tampilkan siapa saja yang melakukan voting ke politician yang bernama Olympia Snowe
    db.all("SELECT firstName, lastName, gender, age FROM politicians LEFT JOIN votes ON politicians.id = votes.politiciansId LEFT JOIN voters ON votes.votersId = voters.id WHERE name='Olympia Snowe'", [], function(err, row){
        if(err){
            console.log(err)
        } else {
            console.log(row)
        }
    });

});
 
db.close();

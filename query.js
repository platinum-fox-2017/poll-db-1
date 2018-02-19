const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.all(`select Politicians.name,Politicians.party,Politicians.grade_current from Politicians
where party = "R" and grade_current between 9 and 11`,function(err,data){
    if(err) throw err
    console.log(data)
})

db.all(`select count(*) as totalvote,politicians.name from votes inner join 
    politicians on politicians.id = votes.politicianId where
    politicians.name = "Olympia Snowe"`,function(err,data){
        if(err) throw err
        console.log(data)
    })

db.all(`select politicians.name,count(*) as totalvote from votes inner join
    politicians on politicians.id = votes.politicianId where politicians.name 
    like "adam%" group by politicians.name`,function(err,data){
        if(err) throw err
        console.log(data)
    })

db.all(`select count(*) as totalvote,politicians.name,politicians.party,politicians.location
    from votes inner join politicians where politicians.id = votes.politicianId 
    group by politicians.name order by totalvote desc limit 3 `,function (err,data){
    if(err) throw err
    console.log(data)
})

db.all(`select voters.first_name,voters.last_name,voters.gender,voters.age from voters 
    inner join votes on voters.id = votes.voterId 
    where votes.politicianId = (select id from politicians where politicians.name = 'Olympia Snowe')`,function(err,data){
    if(err) throw err
    console.log(data)
})